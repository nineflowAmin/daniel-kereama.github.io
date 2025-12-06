---
layout: default
title: "About"
---

<div class="about-page">
  <div class="about-hero">
    <div class="about-image">
      <img src="{{ '/assets/images/profile.jpg' | relative_url }}" alt="{{ site.author.name }}" class="profile-image-large">
    </div>
    <div class="about-content">
      <h1 class="text-gradient-nineflow">About Daniel Kereama</h1>
      <p class="lead">
        Welcome to my technical blog! I'm passionate about building intelligent systems, 
        exploring AI agent architectures, and sharing insights from my journey in software development.
      </p>
    </div>
  </div>
  
  <div class="about-details">
    <section>
      <h2>What I Write About</h2>
      <ul>
        <li><strong>AI Agent Architecture</strong> - Designing and building intelligent agent systems</li>
        <li><strong>Multi-Agent Systems</strong> - Exploring collective intelligence and agent collaboration</li>
        <li><strong>Software Development</strong> - Best practices, patterns, and real-world implementations</li>
        <li><strong>Technical Deep Dives</strong> - Complex topics explained in detail</li>
      </ul>
    </section>
    
    <section>
      <h2>Nineflow.AI</h2>
      <p>
        This blog is powered by <strong class="text-gradient-nineflow">Nineflow.AI</strong>, 
        a platform focused on collective intelligence and multi-agent systems. The toroid logo 
        represents the interconnected nature of intelligent agents working together.
      </p>
      <div class="toroid-display">
        <img src="{{ '/assets/images/toroid-logo.svg' | relative_url }}" alt="Nineflow.AI Toroid Logo" class="toroid-large">
      </div>
    </section>
  </div>
</div>

<style>
.about-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.about-hero {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.about-image {
  flex-shrink: 0;
}

.profile-image-large {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.about-content {
  flex: 1;
}

.lead {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--foreground-secondary);
}

.about-details {
  display: grid;
  gap: 3rem;
}

.about-details section {
  background: var(--background-secondary);
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
}

.about-details h2 {
  margin-bottom: 1rem;
  color: var(--foreground);
}

.about-details ul {
  list-style: none;
  padding: 0;
}

.about-details li {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border);
}

.about-details li:last-child {
  border-bottom: none;
}

.toroid-display {
  text-align: center;
  margin-top: 2rem;
}

.toroid-large {
  width: 96px;
  height: 96px;
  filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.3));
}

@media (max-width: 768px) {
  .about-hero {
    flex-direction: column;
    text-align: center;
  }
}
</style>

