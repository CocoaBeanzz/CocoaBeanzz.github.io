# ...existing code...
module RelatedPosts
  def self.tags_for(obj)
    raw = nil
    if obj.respond_to?(:data) && obj.data.is_a?(Hash)
      raw = obj.data['tags'] || obj.data['tag'] || obj.data['categories']
    elsif obj.respond_to?(:tags)
      raw = obj.tags
    end

    tags = if raw.is_a?(String)
             raw.split(/\s*,\s*/)
           else
             Array(raw)
           end

    tags.compact.map { |t| t.to_s.strip.downcase }
  end

  def self.tag_freq(posts)
    freq = Hash.new(0)
    posts.each { |p| tags_for(p).each { |t| freq[t] += 1 } }
    freq
  end

  def self.sort_related_posts(scores)
    scores.sort do |a, b|
      sc = b[1] <=> a[1]
      sc.zero? ? (b[0].date <=> a[0].date) : sc
    end.map(&:first)
  end

  # new: accepts options hash for tuning
  def self.related_for(post, posts, opts = {})
    return [] unless posts && posts.size > 1

    min_shared = opts.fetch(:min_shared, 1)
    max_results = opts.fetch(:max_results, 6)
    common_cutoff = opts.fetch(:common_cutoff, (posts.size * 0.25).floor) # tags appearing in >25% considered common

    freqs = tag_freq(posts)
    highest = freqs.values.max || 0
    scores = {}

    my_tags = tags_for(post)

    posts.each do |p|
      next if p == post
      their_tags = tags_for(p)

      # drop very-common tags from consideration
      shared = (my_tags & their_tags).reject { |t| freqs[t].to_i >= common_cutoff }
      next if shared.size < min_shared

      # weight rarer shared tags higher
      freq_score = shared.map { |t| 1 + highest - (freqs[t] || 0) }.sum
      score = shared.size * 100 + freq_score
      scores[p] = { score: score, shared: shared }
    end

    # log for debugging
    Jekyll.logger.warn "related_posts:debug", "#{post.data['title'] || post.url}: used_tags=#{my_tags.inspect} common_cutoff=#{common_cutoff} matches=#{scores.size}"

    sorted = scores.sort_by { |_, v| -v[:score] }.map { |pair| pair[0] }
    sorted.first(max_results)
  end
end

module Jekyll
  class RelatedPostsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      cfg = site.config['related_posts'] || {}
      min_shared = cfg.fetch('min_shared', 1)
      max_results = cfg.fetch('max_results', 6)
      common_ratio = cfg.fetch('common_tag_ratio', 0.25)

      posts = if site.posts.respond_to?(:docs) then site.posts.docs
              elsif site.respond_to?(:posts) then site.posts
              else site.collections['posts'] && site.collections['posts'].docs || []
              end

      common_cutoff = (posts.size * common_ratio).floor

      Jekyll.logger.warn "related_posts:", "generate() called; found #{posts.size} posts; common_cutoff=#{common_cutoff}"

      posts.each do |post|
        related = ::RelatedPosts.related_for(post, posts,
                    min_shared: min_shared,
                    max_results: max_results,
                    common_cutoff: common_cutoff)
        post.data['related_posts'] = related
        Jekyll.logger.warn "related_posts:", "#{post.data['title'] || post.url}: #{related.size} related: #{related.map { |r| (r.data && r.data['title']) || (r.respond_to?(:title) && r.title) }.join(' | ')}"
      end
    end
  end
end
# ...existing code...