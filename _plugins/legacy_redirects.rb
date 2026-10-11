# Keeps pre-department addresses alive.
#
# Before the site was split into departments, projects lived at
# /projects/<name> and posts at /blog/<title>. They now live at
# /<department>/projects/<name> and /<department>/blog/<title>. Dozens of
# posts and project pages link to the old addresses, as do external sites,
# so this generator writes a small redirect page at every old address
# instead of anyone having to edit those links.
#
# Other moved pages (/shows/, /about/, ...) are listed by hand under
# `legacy_redirects` in _config.yml as `old address: new address`.
module Jekyll
  class LegacyRedirectPage < PageWithoutAFile
    # legacy_url: site-root-relative address the stub is served at.
    # target_url: site-root-relative address it forwards to.
    def initialize(site, legacy_url, target_url)
      # A trailing slash means "directory index" (/shows/ -> /shows/index.html).
      # Anything else becomes <name>.html, which GitHub Pages also serves
      # without the extension, matching how the old pages were published.
      file_path = legacy_url.end_with?("/") ? "#{legacy_url}index.html" : "#{legacy_url}.html"
      super(site, site.source, File.dirname(file_path), File.basename(file_path))

      self.data = { "layout" => nil, "permalink" => legacy_url }
      # Meta refresh because GitHub Pages cannot send real 301s. The canonical
      # link tells search engines which address to keep.
      self.content = <<~HTML
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <link rel="canonical" href="#{target_url}">
          <meta http-equiv="refresh" content="0; url=#{target_url}">
          <meta name="robots" content="noindex">
          <title>#{target_url}</title>
        </head>
        <body>
          <a href="#{target_url}">#{target_url}</a>
        </body>
        </html>
      HTML
    end
  end

  class LegacyRedirectGenerator < Generator
    safe true

    def generate(site)
      # Projects and posts: the old address is the new one minus its
      # leading /<department>.
      (site.collections["projects"].docs + site.posts.docs).each do |doc|
        section = doc.data["section"]
        next unless section

        legacy_url = doc.url.sub(%r{\A/#{Regexp.escape(section)}(?=/)}, "")
        next if legacy_url == doc.url

        site.pages << LegacyRedirectPage.new(site, legacy_url, doc.url)
      end

      (site.config["legacy_redirects"] || {}).each do |legacy_url, target_url|
        site.pages << LegacyRedirectPage.new(site, legacy_url, target_url)
      end
    end
  end
end
