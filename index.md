---
layout: home
title: "Welcome"
---

# Welcome to My Blog

This is my technical blog where I share insights about AI agents, software architecture, and development practices.

## Recent Posts

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}

