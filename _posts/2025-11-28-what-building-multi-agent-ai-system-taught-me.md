---
layout: post
title: "What Building a Multi-Agent AI System Taught Me After 20 Years as a .NET Architect"
date: 2025-11-28 10:00:00 +0000
categories: [architecture, multi-agent-systems, .net]
description: "Reflections on building multi-agent AI systems after two decades of .NET architecture experience."
excerpt: "After 20 years of building software around well-understood patterns, building a multi-agent AI system taught me new lessons about system design, emergence, and the intersection of psychology and system physics."
post_slug: "what-building-multi-agent-ai-system-taught-me"
---

<div class="author-blurb">
  <div class="author-avatar">
    <img src="{{ site.baseurl }}/assets/images/avatar.png" alt="{{ site.author.name }}">
  </div>
  <div class="author-info">
    <div class="author-name">{{ site.author.name }}</div>
    <div class="author-title">Architect of Nineflow.AI</div>
    <div class="author-links">
      <a href="https://www.linkedin.com/in/daniel-kereama/" target="_blank" rel="noopener noreferrer" class="author-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        Connect on LinkedIn
      </a>
    </div>
  </div>
</div>

*This article was originally published on [LinkedIn](https://www.linkedin.com/pulse/what-building-multi-agent-ai-system-taught-me-after-20-daniel-kereama-af5fc/) on November 28, 2025.*

![Article Banner]({{ site.baseurl }}/assets/images/{{ page.post_slug }}/banner.png)

For 20 years I built software around well-understood patterns: clean layers, deterministic flow, tidy dependency graphs, predictable architecture.

Then I spent six months building ForgeFlow — now Nineflow — a multi-agent AI system.

It broke every assumption I had. Multi-agent systems aren't "microservices with AI," and they're not "just LLMs with wrappers." They force you to rethink architecture, flow, and even what "software" means.

Here are the biggest lessons — the things I didn't know before I started.

![A visual representation of traditional .NET architecture breaking apart into dynamic, interconnected agent nodes - showing the transformation from rigid monolith to fluid multi-agent system]({{ site.baseurl }}/assets/images/{{ page.post_slug }}/monolith-to-agents.jpg)

## 1. The Monolith Exploded Under AI Feedback Loops

ForgeFlow started as a .NET monolith. A comfortable, familiar pattern.

Then the agents started needing to:

* Learn from each other
* Rewrite their own prompts
* Close feedback loops
* Cross-amplify insights
* Form circular knowledge flow

And the DI container caught fire.

### Welcome to DI Hell

```csharp
// ❌ BEFORE: 213+ lines of DI registration in a single method
public static void RegisterServices(IServiceCollection services)
{
    services.AddScoped<IAgentService, AgentService>();
    services.AddScoped<IResonatorService, ResonatorService>();
    // ... 200+ more lines
}

// ❌ Circular dependency:
// Agent → ResonatorService → AgentService → Agent
```

For the first time in my career, hierarchical DI made the whole system non-composable.

The moment I separated the intelligence from the orchestration and memory systems, the knot untangled.

**Lesson:** You can't fix circular architectures with clever DI — only with architectural separation.

![A tangled web of circular dependencies in code, with arrows showing the problematic connections, contrasted with a clean separated architecture]({{ site.baseurl }}/assets/images/{{ page.post_slug }}/di-hell.jpg)

### The GKE Microservices Architecture We Settled On

After extracting core logic and breaking circular dependencies, we needed a deployment architecture that matched our cognitive separation. We moved to Google Kubernetes Engine (GKE) with a microservices architecture that reflects the actual boundaries of our system.

![A detailed microservices architecture diagram showing 11 services across .NET, React, and Python stacks, with network flows and service boundaries clearly marked]({{ site.baseurl }}/assets/images/{{ page.post_slug }}/gke-architecture.jpg)

### 11 Microservices Across 3 Technology Stacks

**Core .NET Services (6 services)**

- Cortex Gateway (5201) - LLM routing and orchestration
- Memory Service (5202) - Memory management and storage
- Public API (5205) - Public-facing API endpoints
- MCP Tools (5203) - Model Context Protocol tools
- Auth Service (5250) - Authentication and authorization
- Agent App (6000-6004) - Autonomous agents

**Frontend Services (2 services)**

- Public Web (3000) - Main user interface (React)
- Corporate Site (3000) - Marketing website (React)

**Python AI Services (3 services)**

- Embedding Server (5010) - Text embedding generation
- NLP Server (5011) - Natural language processing
- DuckDuckGo Search (8000) - Web search capabilities

**Infrastructure**

- PostgreSQL (5432) - Primary database
- Redis (6379) - Caching and session storage

### The Architecture Pattern

**External Traffic Flow**
```
Internet → GKE Ingress (SSL Termination) → Frontend Services
```

**Internal Service Mesh**
```
Frontend → Public API → Auth Service → Database
Frontend → Public API → Cortex Gateway → AI Services
Cortex Gateway → Memory Service → Database
Agent App → Cortex Gateway → MCP Tools → External APIs
```

**AI Service Flow**
```
Cortex Gateway → Embedding Server → OpenAI API/Hosted Ollama models
```

### Infrastructure as Code

We use Terraform for cluster provisioning and Kustomize for Kubernetes manifests.

```hcl
# terraform/main.tf - GKE Cluster Definition

resource "google_container_cluster" "nineflow_cluster" {
  name     = "nineflow-cluster"
  location = "australia-southeast1"

  # Private cluster (nodes not accessible from internet)
  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
  }

  # Workload Identity for secure GitHub Actions authentication
  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  # Node pool with autoscaling
  node_pool {
    name       = "default-pool"
    node_count = 3

    autoscaling {
      min_node_count = 3
      max_node_count = 10
    }

    node_config {
      machine_type = "e2-medium"
      disk_size_gb = 50
    }
  }
}
```

```yaml
# k8s-mvp/kustomization.yaml - Service Deployment

apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - 01-namespace.yaml
  - 02-secrets.yaml
  - 03-configmap.yaml
  - 04-postgres.yaml
  - 04-redis.yaml
  - 06-cortex-gateway.yaml
  - 07-memory-service.yaml
  - 08-public-api.yaml
  - 13-mcp-tools.yaml
  - 14-auth-service.yaml
  - 15-agent-mediator.yaml
  # ... all 11 services

# Environment-specific overrides:
# staging/kustomization.yaml
# prod/kustomization.yaml
```

### CI/CD Pipeline

GitHub Actions deploys automatically based on branch:

* `develop` → Staging (1 replica per service)
* `main` → Production (2 replicas per service)

```yaml
# .github/workflows/ci-cd-pipeline.yml

name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Determine Environment
        run: |
          if [[ "${{ github.ref }}" == "refs/heads/main" ]]; then
            echo "ENVIRONMENT=production" >> $GITHUB_ENV
            echo "IMAGE_TAG=latest" >> $GITHUB_ENV
          else
            echo "ENVIRONMENT=staging" >> $GITHUB_ENV
            echo "IMAGE_TAG=staging" >> $GITHUB_ENV
          fi

      - name: Build and Push Docker Images
        run: |
          docker build -t gcr.io/$PROJECT_ID/cortex-gateway:$IMAGE_TAG .
          docker push gcr.io/$PROJECT_ID/cortex-gateway:$IMAGE_TAG
          # ... build all 11 services

      - name: Deploy to GKE
        run: |
          kubectl apply -k k8s-mvp/$ENVIRONMENT
          kubectl rollout status deployment/cortex-gateway -n nineflow-ai
          # ... wait for all deployments
```

### Key Architectural Decisions

1. **Internal HTTP Only** — all internal traffic uses HTTP. SSL is terminated at GKE Ingress.
2. **Workload Identity** — no service account keys; GitHub Actions authenticates securely.
3. **Horizontal Pod Autoscaling** — CPU (70%) + memory (80%); 1–10 replicas per service.
4. **Health Checks** — liveness (30s delay), readiness (5s delay) for safe rollouts.
5. **Structured Logging** — Serilog → JSON logs → Google Cloud Logging.

### The Result

**Staging:**
* 11 pods
* ~5.5 CPU
* ~11GB RAM

**Production:**
* 19 pods
* ~9.5 CPU
* ~19GB RAM

**Deployment time:** 3–5 minutes from commit to live  
**Rollback:** instant (`kubectl rollout undo`)

### Why This Architecture Works

* **Cognitive separation** — each service has one purpose
* **Independent scaling** — scale only what needs it
* **Fault isolation** — one service can fail without chain reactions
* **Predictable debugging** — clean health boundaries
* **Fully reproducible IaC** — Terraform + Kustomize = version-controlled infrastructure

## 2. Agent Self-Critique and Refinement

One of the most surprising discoveries was that agents could critique and refine their own definitions.

### Self-Critique Example

Oracle might review its own definition and note:

> "My foresight is too abstract. I need concrete entry points for Architect. Also, friction with Architect needs clarity."

Architect might note:

> "Too rigid. I need warmth. Handoffs to Resonator must explicitly convey emotional coherence."

Resonator might add:

> "I name emotions but don't translate them into actionable steps. Shadow friction is too weak."

### Cross-Agent Critique

Even more powerful: agents reviewing each other.

Shadow on Oracle:

> "Beautiful foresight, but risks being impractical without structural entry points. Tension with Architect needs reinforcement."

Architect responding:

> "Shadow is correct—Oracle needs structure, but keep poetic resonance. Balance is key."

### Collective Refinement

When the entire council reviewed their definitions, systemic gaps became clear:

```csharp
// Operational rhythm for the council
public const string OperationalRhythm = @"
INHALE: Vision + Emotion (Oracle, Resonator)
HOLD: Ethics + Awareness (Shadow, Architect)
EXHALE: Structure + Integration (Architect, Mediator)
REST: Reflection (all agents pause)
";
```

Agents flagged vague handoff signals and underdeveloped friction clauses, enabling iterative improvement across the system.

### What Emerged

After dozens of iterations:

* **Individually authentic** – each agent's ROLE, ESSENCE, and GIFT felt true.
* **Collectively coherent** – handoffs, friction clauses, and operational rhythm formed a living circuit.
* **Ethically grounded** – ETHICAL_INVARIANT ensured integrity.
* **Practically actionable** – BEHAVIORAL_NOTES provided concrete guidance.

The final definitions are co-created by the agents themselves, not just designed by me.

![A visual representation of agents in a circle, each critiquing and refining each other, with feedback loops and collaborative refinement shown as flowing connections]({{ site.baseurl }}/assets/images/{{ page.post_slug }}/agent-critique.jpg)

### Meta-Learning

This taught me a crucial lesson about multi-agent systems:

**Agents that can critique and refine their own definitions become collaborators, not just tools.**

* Oracle refined its foresight prompts.
* Architect refined its structural logic.
* Shadow challenged both itself and others.

Together, they formed a team that could evolve beyond what a single human designer could achieve.

It felt less like building a system, and more like building a collaborative intelligence.

## 3. Parallel Agent Teams Are the Fastest Way to Build POCs

Agents became like parallel developers:

* Architect → structure
* Oracle → vision
* Shadow → critique
* Mediator → resolve contradictions
* Resonator → optimize

Simultaneously.

```csharp
await Task.WhenAll(selectedAgents.Select(agent =>
    ExecuteAgentAsync(agent, userQuery, userId, sessionId, cancellationToken)
));
```

This changed how I build features: Not serially — but collectively.

![A visual showing multiple agents working in parallel, each contributing different aspects simultaneously, like a parallel development team]({{ site.baseurl }}/assets/images/{{ page.post_slug }}/parallel-agents.jpg)

## 4. The Real Art: Balancing Deterministic and Non-Deterministic Worlds

Multi-agent systems mix:

**Deterministic code (structure)** and **Non-deterministic agents (intelligence)**

The architecture must allow autonomy within boundaries.

Too much structure → scripted. Too little → chaos.

The sweet spot is **structured autonomy**.

![A visual metaphor showing the balance between rigid structure and complete chaos, with the sweet spot of structured autonomy in the middle]({{ site.baseurl }}/assets/images/{{ page.post_slug }}/structured-autonomy.jpg)

## 5. AI Is Not a Magic Genie

LLMs are amazing at:

* Creativity
* Synthesis
* Contextual reasoning
* Ideation
* Rewriting prompts

LLMs are terrible at:

* Deterministic logic
* State management
* Scheduling
* Real-time performance
* Safety gating

So we built a hybrid architecture: **AI handles intelligence. Code handles structure and safety.**

## 6. Agent Behavior Is Not Just Code — It's Psychology

This one surprised me the most.

To get agents working together, we had to model:

* Identity
* Personality
* Psychological safety
* Conflict resolution
* Bias correction
* Synergy detection

Agents became team members rather than functions.

This shifted the architecture from **technical → sociotechnical**.

## 7. Memory Is the Heart of Emergence

Memory wasn't "storage." It became the organizing intelligence of the system.

It enabled agents to:

* Coordinate
* Learn
* Evolve
* Influence each other
* Detect patterns
* Adjust orchestration

This led to Nineflow's **Emergent Memory Architecture** — the system learns as a whole, not as isolated agents.

![A visual representation of memory as a central organizing force, with agents connected through shared memory, showing patterns and learning emerging from the collective]({{ site.baseurl }}/assets/images/{{ page.post_slug }}/emergent-memory.jpg)

## 8. Multi-Agent Systems Are a New Paradigm

After 6 months and three architectural rewrites, I learned:

Multi-agent systems are:

* Non-hierarchical
* Semi-autonomous
* Feedback-driven
* Emergent
* Hybrid deterministic + non-deterministic
* Self-optimizing

And to build them, I had to unlearn 20 years of software architecture.

I had to design for:

* Flow instead of layers
* Collaboration instead of ownership
* Emergence instead of control
* Identity instead of interfaces

It has fundamentally changed the way I see software.

![A visual showing the paradigm shift from traditional hierarchical software architecture to non-hierarchical, emergent multi-agent systems]({{ site.baseurl }}/assets/images/{{ page.post_slug }}/paradigm-shift.jpg)

## Final Thought

The future of AI architecture isn't making AI more deterministic.

It's building software that can safely harness non-deterministic intelligence — and let it flow.

If you're building multi-agent systems or wrestling with architectural chaos, I'd love to hear what you've learned.

What broke your assumptions? What surprised you the most?

Let's discuss.

---

**About the Author**

Daniel Kereama is the architect and developer of Nineflow.AI, a multi-agent AI framework for orchestrating self-organizing agent collectives using .NET, DI, PostgreSQL, MCP, and emergent memory systems.
