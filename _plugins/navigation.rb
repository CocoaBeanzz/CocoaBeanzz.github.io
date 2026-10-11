# Works out each department's navbar tabs once per build.
#
# The navbar include (_includes/navbar.html) runs on every page of the site.
# It used to find its tabs by filtering and sorting the full page list each
# time, which made it the slowest part of the build. The tabs only depend on
# the department, so this generator computes them up front and the include
# just prints them.
#
# Rules, unchanged from before:
#   - A tab is any page in pages/<department>/ that produces HTML.
#   - Paths listed under `nav_exclude` in _config.yml are left out. An entry
#     containing ** matches any path containing the rest of the entry.
#   - Tabs are ordered by the page's `weight`, lowest first.
#   - A page with `external_url` links there instead of to itself.
#
# Result, read by the include as site.data.navigation[<department id>]:
#   [{ "title" => "Blog", "url" => "/dev/blog/", "external" => false }, ...]
module Jekyll
  class NavigationGenerator < Generator
    safe true

    def generate(site)
      exclusions = site.config["nav_exclude"] || []
      tabs_by_section = Hash.new { |hash, section| hash[section] = [] }

      site.pages.each do |page|
        section = page.data["section"]
        next unless section && page.html?
        next if excluded?(page.path, exclusions)

        external_url = page.data["external_url"]
        tabs_by_section[section] << {
          "title"    => page.data["title"],
          "url"      => external_url || page.url,
          "external" => !external_url.nil?,
          # Pages without a weight sort first, as Liquid's sort did.
          "weight"   => page.data["weight"] || 0,
        }
      end

      # sort_by is not stable in Ruby, so the title breaks ties between equal
      # weights and the order never shuffles from one build to the next.
      tabs_by_section.each_value do |tabs|
        tabs.sort_by! { |tab| [tab["weight"], tab["title"].to_s] }
      end

      site.data["navigation"] = tabs_by_section
    end

    private

    def excluded?(path, exclusions)
      exclusions.any? do |entry|
        entry == path || (entry.include?("**") && path.include?(entry.delete("*")))
      end
    end
  end
end
