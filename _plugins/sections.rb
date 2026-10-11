# Lets a project or post appear in more than one department.
#
# A file's home department is the folder it sits in (_projects/games/,
# _posts/dev/, ...). That decides its address and which navbar its own page
# shows. To also list it in other departments, add to its front matter:
#
#     also_in: [dev]
#     also_in: [dev, tools]
#
# This generator gives every project and post a `sections` list: its home
# department first, then anything in `also_in`. Every listing on the site
# (project grid, blog, landing features, highlights, shows, tag pages) asks
# "does this item's `sections` contain the department being viewed?", so one
# list drives them all. The item still has a single page, at its home address.
#
# It also gives every project an `order` value for sorting. Jekyll keeps
# projects in order of file path, which starts with the department folder. So
# once a listing mixes folders, each folder's projects come out as a separate
# run instead of interleaving by date. `order` is built from the "(YYMM)" at
# the start of the file name alone, ignoring the folder, and listings sort on
# it. Posts do not need this: Jekyll already orders them by date across
# folders.
module Jekyll
  class SectionsGenerator < Generator
    safe true
    priority :highest # other generators and all templates read `sections`

    def generate(site)
      # Ids from _data/sections.yml, to catch typos in `also_in`.
      known_ids = (site.data["sections"] || []).map { |section| section["id"] }

      (site.collections["projects"].docs + site.posts.docs).each do |doc|
        home = doc.data["section"]
        # `also_in: dev` (a bare word instead of a list) is accepted too.
        extra = Array(doc.data["also_in"]).map(&:to_s)

        unknown = extra - known_ids
        unless unknown.empty?
          Jekyll.logger.warn "Sections:", "#{doc.relative_path} has also_in #{unknown.inspect}, " \
                                          "which is not a department in _data/sections.yml"
        end

        doc.data["sections"] = ([home] + extra).compact.uniq
      end

      site.collections["projects"].docs.each do |doc|
        doc.data["order"] = order_key(doc)
      end
    end

    private

    # Sortable text for a project file named "(YYMM) Name.md": the number,
    # padded to four digits, then the file name so two projects from the same
    # month always come out in the same order. A two-digit prefix is a year
    # on its own ("(17)" sorts as 1700, the start of 2017). A file with no
    # prefix sorts first, which listings show last since they go newest first.
    def order_key(doc)
      file_name = File.basename(doc.path)
      digits = file_name[/\A\((\d+)\)/, 1].to_s
      digits += "00" if digits.length == 2
      format("%04d %s", digits.to_i, file_name)
    end
  end
end
