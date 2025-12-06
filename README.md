# Daniel Kereama's Blog

A technical blog hosted on GitHub Pages, covering topics about AI agents, architecture, and software development.

## Repository Structure

- `_posts/` - Blog posts in Markdown format
- `_config.yml` - Jekyll configuration
- `index.md` - Home page

## Local Development

To run this blog locally with Jekyll:

```bash
# Install Jekyll and Bundler
gem install jekyll bundler

# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve
```

Visit `http://localhost:4000` to view the blog.

## Writing Posts

Create new posts in the `_posts/` directory with the naming format:
```
YYYY-MM-DD-post-title.md
```

Each post should start with front matter:
```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +0000
categories: [category1, category2]
---
```

## License

All content is © Daniel Kereama unless otherwise noted.

