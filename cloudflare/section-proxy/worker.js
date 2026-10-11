/**
 * Puts each kaud.io department on its own subdomain.
 *
 * The Jekyll site is a single build on GitHub Pages where every department
 * lives under a path: kaud.io/dev/, kaud.io/music/, kaud.io/kpresto/,
 * kaud.io/cocoabeanz/, kaud.io/tools/, kaud.io/games/. GitHub Pages only answers for one hostname, so this Worker
 * sits in front and serves kaud.io/dev/<path> at dev.kaud.io/<path>.
 *
 * The site itself knows nothing about subdomains. It always links to
 * /dev/..., /music/... and so on, which is why `jekyll serve` works locally
 * with no special mode. The Worker translates in both directions:
 *
 *   request   dev.kaud.io/blog/x        ->  fetch kaud.io/dev/blog/x
 *   response  <a href="/dev/blog/x">    ->  <a href="/blog/x">
 *             <a href="/music/shows/">  ->  <a href="https://music.kaud.io/shows/">
 *             <a href="/">  (the hub)   ->  <a href="https://kaud.io/">
 *
 * Routes (wrangler.toml): <section>.kaud.io/* and kaud.io/<section>/*.
 */

// Department ids. Must match _data/sections.yml and the "Departments" block
// in _config.yml.
const SECTIONS = ["dev", "music", "kpresto", "cocoabeanz", "tools", "games"];

// The hub's hostname. Departments are served at <section>.<ROOT_HOST>.
const ROOT_HOST = "kaud.io";

// Paths that exist once for the whole site instead of once per department.
// They are fetched from the origin as-is, without a department prefix.
const SHARED_PATH_PREFIXES = ["/assets/", "/docs/"];

// When true, kaud.io/dev/... permanently redirects to dev.kaud.io/... so each
// page has exactly one public address. Set to false to leave both live.
const REDIRECT_PATHS_TO_SUBDOMAINS = true;

// Marks the Worker's own fetches to the origin so they are never redirected
// back to a subdomain, whatever route they arrive on.
const PROXY_MARKER_HEADER = "x-section-proxy";

/**
 * Splits a site path into its department and the rest.
 * "/dev/blog/x" -> { section: "dev", rest: "/blog/x" }
 * "/dev"        -> { section: "dev", rest: "/" }
 * "/docs/a.png" -> null (not inside a department)
 */
function splitSectionPath(pathname) {
  for (const section of SECTIONS) {
    if (pathname === `/${section}`) return { section, rest: "/" };
    if (pathname.startsWith(`/${section}/`)) {
      return { section, rest: pathname.slice(section.length + 1) };
    }
  }
  return null;
}

/**
 * Converts a root-relative site link into the address a visitor on
 * `currentSection`'s subdomain should see. `link` may carry a query string
 * or fragment. Links that are not root-relative (external, mailto:, #anchor,
 * protocol-relative) come back unchanged.
 */
function toPublicLink(link, currentSection) {
  if (!link.startsWith("/") || link.startsWith("//")) return link;

  // Separate the path from any ?query or #fragment so only the path is mapped.
  const suffixStart = link.search(/[?#]/);
  const pathname = suffixStart === -1 ? link : link.slice(0, suffixStart);
  const suffix = suffixStart === -1 ? "" : link.slice(suffixStart);

  if (pathname === "/") return `https://${ROOT_HOST}/${suffix}`;

  const split = splitSectionPath(pathname);
  if (!split) return link;
  if (split.section === currentSection) return split.rest + suffix;
  return `https://${split.section}.${ROOT_HOST}${split.rest}${suffix}`;
}

/** Rewrites every <a href> in an HTML response with toPublicLink. */
function rewriteLinks(response, currentSection) {
  return new HTMLRewriter()
    .on("a[href]", {
      element(anchor) {
        anchor.setAttribute("href", toPublicLink(anchor.getAttribute("href"), currentSection));
      },
    })
    .transform(response);
}

/** Serves one request that arrived on <section>.kaud.io. */
async function serveSection(request, url, section, originBase) {
  // A department-prefixed path on a subdomain (dev.kaud.io/dev/x, or
  // dev.kaud.io/music/x) is an untranslated site link. Send it to its
  // proper address instead of fetching /dev/dev/x.
  if (splitSectionPath(url.pathname)) {
    const target = new URL(toPublicLink(url.pathname + url.search, section), url);
    return Response.redirect(target.toString(), 301);
  }

  const isShared = SHARED_PATH_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));
  const originPath = isShared ? url.pathname : `/${section}${url.pathname}`;
  const originUrl = new URL(originPath + url.search, originBase);

  const originRequest = new Request(originUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    // Redirects from the origin point at /<section>/... paths and have to be
    // translated before the visitor follows them.
    redirect: "manual",
  });
  originRequest.headers.set(PROXY_MARKER_HEADER, "1");

  const originResponse = await fetch(originRequest);

  // Not in this department. It may be a site-wide page (/404.html) or
  // a pre-department address (/blog/<title>), all of which live on the hub.
  if (originResponse.status === 404 && !isShared) {
    return Response.redirect(`https://${ROOT_HOST}${url.pathname}${url.search}`, 302);
  }

  // Origin redirect, e.g. GitHub Pages adding a trailing slash.
  const location = originResponse.headers.get("location");
  if (location) {
    const target = new URL(location, originUrl);
    const headers = new Headers(originResponse.headers);
    if (target.host === originUrl.host) {
      headers.set("location", toPublicLink(target.pathname + target.search + target.hash, section));
    }
    return new Response(null, { status: originResponse.status, headers });
  }

  const contentType = originResponse.headers.get("content-type") || "";
  return contentType.includes("text/html") ? rewriteLinks(originResponse, section) : originResponse;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // ORIGIN is overridable so `wrangler dev` can point at a local
    // `jekyll serve` (see wrangler.toml).
    const originBase = env.ORIGIN || `https://${ROOT_HOST}`;

    const subdomain = url.hostname.endsWith(`.${ROOT_HOST}`)
      ? url.hostname.slice(0, -(ROOT_HOST.length + 1))
      : null;

    if (SECTIONS.includes(subdomain)) {
      return serveSection(request, url, subdomain, originBase);
    }

    // Request on the hub host for a department path: kaud.io/dev/...
    const split = splitSectionPath(url.pathname);
    const isOwnOriginFetch = request.headers.has(PROXY_MARKER_HEADER);
    if (REDIRECT_PATHS_TO_SUBDOMAINS && split && !isOwnOriginFetch) {
      return Response.redirect(`https://${split.section}.${ROOT_HOST}${split.rest}${url.search}`, 301);
    }

    return fetch(request);
  },
};
