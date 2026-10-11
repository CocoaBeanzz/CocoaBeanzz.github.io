# Support for showing one page's body inside another:
#   {% include elements/project.html name="..." %}   a project inside a post
#   {% include elements/release.html name="..." %}   a release inside a post
#
# Two pieces are needed, because Jekyll has neither built in.
#
# 1. `raw_body` on every project. Jekyll renders pages one at a time and
#    replaces each one's `content` with finished HTML as it goes, so whether
#    another page sees markdown or HTML there depends on which rendered
#    first. This generator runs before any rendering and keeps a copy of the
#    body exactly as written in the file, so an embed always starts from the
#    same thing.
#
# 2. The `liquify` filter. A project body is markdown with Liquid in it
#    ({% include elements/video.html ... %}, gallery captures). `markdownify`
#    only handles the markdown half. `liquify` runs the Liquid half first:
#
#        {{ project.raw_body | liquify | markdownify }}
module Jekyll
  class RawBodyGenerator < Generator
    safe true

    def generate(site)
      site.collections["projects"].docs.each do |doc|
        doc.data["raw_body"] = doc.content
      end
    end
  end

  module EmbedFilters
    # Renders Liquid tags in `input` as if they were written in the page
    # doing the embedding (same variables, same includes available).
    def liquify(input)
      Liquid::Template.parse(input.to_s).render!(@context)
    end
  end
end

Liquid::Template.register_filter(Jekyll::EmbedFilters)
