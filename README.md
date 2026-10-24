https://kaud.io/

# How the site is organized

One Jekyll build, five departments: `dev`, `tools`, `games`, `kpresto`,
`cocoabeanz`. A department is a folder name. Whatever folder a file is in
decides which department site it shows up on.

`music` is not a department with content. It is a branching page, like
kaud.io itself, that leads to `kpresto` and `cocoabeanz`. That relationship
is the `parent: music` line on those two in `_data/sections.yml`.

| To add a...        | Put a file in...             | It appears at...                       |
|--------------------|------------------------------|----------------------------------------|
| project / product  | `_projects/<department>/`    | `/<department>/projects/<file-name>`   |
| blog post          | `_posts/<department>/`       | `/<department>/blog/<title>`           |
| show               | `_posts/kpresto/`, tag `Shows` | K Presto Shows tab                   |
| navbar tab         | `pages/<department>/`        | set `title`, `weight` and `permalink`  |

Front matter is the same as it always was. To move something to another
department, move the file.

To show a project or post in more than one department, keep it in its home
folder and add the others to its front matter:

```yaml
also_in: [dev]
```

It then appears in those departments' listings, landing features, highlights
and tag pages too. It still has one page, at its home department's address.

- Department names, hub hero images and accent colors: `_data/sections.yml`
- A department landing features its projects tagged `Highlight` as large
  rows (all of its projects if none are tagged) and its four newest posts
  tagged `Highlight`
- The folder-to-department wiring: "Departments" block in `_config.yml`
- Search the repo for `PLACEHOLDER` to find copy and images still to be filled in

# Building blocks for project pages and posts

| To add...                        | Write                                                                 |
|----------------------------------|-----------------------------------------------------------------------|
| a YouTube video                  | `{% include elements/video.html id="VIDEO_ID" %}`                     |
| two videos side by side          | wrap the includes in `<div class="media-grid">`                       |
| an image gallery                 | `{% capture carousel_images %}` one path per line, then `{% include elements/carousel.html %}` |
| the "on this page" bar           | `{% capture list_items %}` one heading per line, then `{% include elements/list.html type="toc" %}` |
| a row of link buttons            | `<div class="link-buttons" markdown="1">` with one `[Label](url)` per line |
| posts about a project            | `{% include blog/tagged-posts.html name="Project Name" %}`            |
| a release                        | copy a file that has `layout: release` (`_projects/kpresto/` or `_projects/cocoabeanz/releases/`). Front matter holds the links and the `youtube:` or `soundcloud:` player, the body is the lyrics |
| a whole project inside a post    | `{% include elements/project.html name="Project Name" %}`             |
| a release inside a post          | `{% include elements/release.html name="Release Name" %}`             |
| a Steam store widget             | `{% include elements/steam-widget.html id="APP_ID" %}`                |

A project page opens with `<div class="project-header" markdown="1">` (title,
genre line, store link) and usually a `<div class="project-intro">` (title
image beside the description). Copy an existing project to start a new one.

# About pages

`pages/dev/about.md` is the reference. It is three blocks (intro with
portrait, skills, timeline), each explained in a comment at the top of the
file. Copy it into another department's folder, change the permalink, and
keep the blocks that apply.

# Running locally

`run_local.bat`, then http://localhost:4000. Departments are at `/dev/`,
`/tools/`, `/games/`, `/kpresto/`, `/cocoabeanz/`, and the Music branching
page is at `/music/`.

Restart it after changing `_config.yml` or anything in `_plugins/`. A running
server does not pick those up.

# When builds get slow

Run `profile.bat`. It builds the site once and prints how long every
template, include and page took, slowest first. It builds to a temp folder,
so it can run while the local server is up.

# Subdomains

`cloudflare/section-proxy/` is a Cloudflare Worker that serves
`kaud.io/dev/...` at `dev.kaud.io/...` (and likewise for the others). The site
works without it. Setup and deploy notes are at the top of its `wrangler.toml`.
It also holds the hub's short links (`SHORT_LINKS` in `worker.js`):
`kaud.io/kouncil` answers with a 301 to the Kouncil product page, and
`legacy_redirects` in `_config.yml` is the stub for when the Worker isn't
deployed.

# The Kouncil product page

`_projects/tools/(2610) Kouncil.html` with `layout: product`, styled by
`_sass/_product.scss` (flat, in the app's own typefaces from
`docs/kouncil/manual/fonts/` and `docs/assets/fonts/Coming_Soon/`) and
`assets/js/product.js`. How the page works is in the comment at the top of
the page file: a fixed layer behind it (the stage) plays each section's
background cuts (`data-bg`, dimmed to `data-dim`), the reader picks which
character speaks from the cast or the switch that floats at the bottom of the
window, and `data-scroll` elements move with the scroll. Its front matter
holds the prices and `beta_url`; while that is set every buy and download
button says "Join the closed beta" and goes to `pages/tools/kouncil-beta.html`,
the application form (`form_action`: the contact form's Formspree address).
The Lite / Kouncil feature table is `_data/kouncil_features.yml`.

The pictures are in `docs/assets/images/projects/kouncil/product/`. The
background cuts (`bg_<section>_<n>_w` / `_t`, `.mp4` and poster `.jpg`) and
`_data/kouncil_backdrops.yml` (how many each section has) are made by
`web_loops.py` in `Documents/Kouncil_Marketing/tools/`. The `fb_*` screenshots
are the FROGBONES album judged by the Industrial Metal profile, filmed with the
app's `tools/film_tab.py` (`Kouncil_Marketing/tools/film_frogbones.sh` has the track list).
