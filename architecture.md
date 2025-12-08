---
layout: default
title: "Architecture"
---

<style>
    .architecture-page {
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 200px);
    }

    .architecture-container {
        background: linear-gradient(to bottom, #ffffff 0%, #fafbfc 100%);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        padding: 24px;
        max-width: 1400px;
        width: 100%;
        border: 1px solid rgba(0,0,0,0.05);
    }

    .architecture-header {
        text-align: center;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .architecture-header .toroid-logo {
        width: 64px;
        height: 64px;
        filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.3));
    }

    .architecture-header h1 {
        font-size: 28px;
        color: #1a1a1a;
        margin-bottom: 6px;
        font-weight: 700;
        letter-spacing: -0.5px;
    }

    .architecture-header p {
        font-size: 14px;
        color: #555;
        font-weight: 400;
    }

    .architecture {
        position: relative;
    }

    .layer {
        margin-bottom: 12px;
        position: relative;
    }

    .layer-title {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #444;
        margin-bottom: 8px;
    }

    .services {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .service {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 8px;
        padding: 12px;
        min-width: 140px;
        flex: 1;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        border: 1.5px solid;
        position: relative;
        backdrop-filter: blur(10px);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .service:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    }

    .service-name {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 4px;
    }

    .service-port {
        font-size: 11px;
        color: #555;
        font-family: 'Consolas', monospace;
        margin-bottom: 6px;
        font-weight: 500;
    }

    .service-detail {
        font-size: 10px;
        color: #666;
        line-height: 1.6;
    }

    /* Color Themes */
    .frontend { border-color: #E3F2FD; background: #F8FBFF; }
    .frontend .service-name { color: #1976D2; }

    .gateway { border-color: #90CAF9; background: #EEF6FF; }
    .gateway .service-name { color: #1565C0; }

    .orchestration { border-color: #1976D2; background: #E3F2FD; }
    .orchestration .service-name { color: #0D47A1; }
    .orchestration-box {
        background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
        color: white;
        padding: 12px;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(25,118,210,0.3);
    }
    .orchestration-box .service-name { color: white; }
    .orchestration-box .service-port { color: rgba(255,255,255,0.8); }
    .orchestration-box .service-detail { color: rgba(255,255,255,0.9); }

    .platform { border-color: #009688; background: #E0F2F1; }
    .platform .service-name { color: #00695C; }

    .agents { border-color: #9C27B0; background: #F3E5F5; }
    .agents .service-name { color: #6A1B9A; }
    .agents .service {
        min-width: 100px;
        text-align: center;
    }

    .specialized { border-color: #00BCD4; background: #E0F7FA; }
    .specialized .service-name { color: #00838F; }

    .llm { border-color: #FF9800; background: #FFF3E0; }
    .llm .service-name { color: #E65100; }

    .infrastructure { border-color: #607D8B; background: #ECEFF1; }
    .infrastructure .service-name { color: #37474F; }

    .flow-arrow {
        text-align: center;
        color: #6366f1;
        font-size: 24px;
        margin: 8px 0;
        font-weight: 600;
        text-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    .flow-arrow-bidirectional {
        text-align: center;
        color: #6366f1;
        font-size: 24px;
        margin: 8px 0;
        font-weight: 600;
        text-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
        animation: pulse 2s ease-in-out infinite;
    }

    .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 10px;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 2px solid #E0E0E0;
    }

    .feature {
        padding: 14px;
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        border-radius: 8px;
        border-left: 4px solid #6366f1;
        box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        transition: transform 0.2s ease;
    }

    .feature:hover {
        transform: translateX(4px);
    }

    .feature h3 {
        font-size: 13px;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 6px;
    }

    .feature p {
        font-size: 11px;
        color: #555;
        line-height: 1.6;
    }

    .tech-stack {
        margin-top: 20px;
        padding: 16px;
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        border-radius: 8px;
        text-align: center;
        border: 1px solid rgba(0,0,0,0.05);
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .tech-stack h3 {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #444;
        margin-bottom: 10px;
    }

    .tech-stack p {
        font-size: 12px;
        color: #333;
        line-height: 1.8;
    }

    @media (max-width: 768px) {
        .architecture-container {
            padding: 12px;
        }
        .services {
            flex-direction: column;
        }
        .service {
            min-width: 100%;
        }
    }

    @media print {
        .architecture-page {
            background: white;
            padding: 0;
        }
        .architecture-container {
            box-shadow: none;
            padding: 10px;
        }
    }
</style>

<div class="architecture-page">
    <div class="architecture-container">
        <div class="architecture-header">
            <img src="{{ '/assets/images/toroid-logo.svg' | relative_url }}" alt="Nineflow.AI" class="toroid-logo">
            <h1>NineFlow.AI System Architecture</h1>
            <p>Production Multi-Agent Orchestration Platform • 17 Microservices • Kubernetes (GKE)</p>
        </div>

        <div class="architecture">
            <!-- Frontend Layer -->
            <div class="layer">
                <div class="layer-title">Frontend Layer</div>
                <div class="services">
                    <div class="service frontend">
                        <div class="service-name">Public Web</div>
                        <div class="service-port">Port 3000</div>
                        <div class="service-detail">Next.js 15.5.4 • React 18.3.1 • TypeScript</div>
                    </div>
                    <div class="service frontend">
                        <div class="service-name">Corporate Site</div>
                        <div class="service-port">Port 3001</div>
                        <div class="service-detail">Marketing & Documentation</div>
                    </div>
                </div>
            </div>

            <div class="flow-arrow-bidirectional">⇅</div>

            <!-- API Gateway Layer -->
            <div class="layer">
                <div class="layer-title">API Gateway Layer</div>
                <div class="services">
                    <div class="service gateway">
                        <div class="service-name">Public API</div>
                        <div class="service-port">Port 5205</div>
                        <div class="service-detail">SignalR Real-Time • Chat Endpoints • Session Management</div>
                    </div>
                    <div class="service gateway">
                        <div class="service-name">Auth Service</div>
                        <div class="service-port">Port 5250</div>
                        <div class="service-detail">JWT Tokens • OAuth (Google/GitHub)</div>
                    </div>
                </div>
            </div>

            <div class="flow-arrow-bidirectional">⇅</div>

            <!-- Orchestration Layer -->
            <div class="layer">
                <div class="layer-title">AI Orchestration Layer</div>
                <div class="orchestration-box">
                    <div class="service-name" style="font-size: 14px; margin-bottom: 6px;">Dynamic Council Orchestrator</div>
                    <div class="service-detail">
                        • Agent Selection (1-5 agents) • Query Entropy Analysis<br>
                        • 12D Intelligence • Context Management • Adaptive Fusion
                    </div>
                </div>
            </div>

            <div class="flow-arrow-bidirectional">⇅</div>

            <!-- Platform Services -->
            <div class="layer">
                <div class="layer-title">Core Platform Services</div>
                <div class="services">
                    <div class="service platform">
                        <div class="service-name">Cortex Gateway</div>
                        <div class="service-port">Port 5201</div>
                        <div class="service-detail">LLM Routing • Model Selection • Streaming • 12D Analysis</div>
                    </div>
                    <div class="service platform">
                        <div class="service-name">Memory Service V3</div>
                        <div class="service-port">Port 5202</div>
                        <div class="service-detail">12D Vectors • Similarity Search • Deduplication</div>
                    </div>
                    <div class="service platform">
                        <div class="service-name">MCP Tools Service</div>
                        <div class="service-port">Port 5203</div>
                        <div class="service-detail">Tool Execution • Context Protocol</div>
                    </div>
                </div>
            </div>

            <div class="flow-arrow-bidirectional">⇅</div>

            <!-- Agent Services -->
            <div class="layer">
                <div class="layer-title">AI Agent Services (5 Specialized Agents)</div>
                <div class="services">
                    <div class="service agents">
                        <div class="service-name">Mediator</div>
                        <div class="service-port">:6000</div>
                        <div class="service-detail">Diplomatic<br>Unifying</div>
                    </div>
                    <div class="service agents">
                        <div class="service-name">Oracle</div>
                        <div class="service-port">:6001</div>
                        <div class="service-detail">Visionary<br>Prophetic</div>
                    </div>
                    <div class="service agents">
                        <div class="service-name">Architect</div>
                        <div class="service-port">:6002</div>
                        <div class="service-detail">Systematic<br>Analytical</div>
                    </div>
                    <div class="service agents">
                        <div class="service-name">Resonator</div>
                        <div class="service-port">:6003</div>
                        <div class="service-detail">Empathetic<br>Creative</div>
                    </div>
                    <div class="service agents">
                        <div class="service-name">Shadow</div>
                        <div class="service-port">:6004</div>
                        <div class="service-detail">Critical<br>Risk Analysis</div>
                    </div>
                </div>
            </div>

            <div class="flow-arrow-bidirectional">⇅</div>

            <!-- Specialized Services -->
            <div class="layer">
                <div class="layer-title">Specialized AI Services</div>
                <div class="services">
                    <div class="service specialized">
                        <div class="service-name">Embedding Service</div>
                        <div class="service-port">Port 5010</div>
                        <div class="service-detail">Text Vectorization • 384-dimensional</div>
                    </div>
                    <div class="service specialized">
                        <div class="service-name">DuckDuckGo Search</div>
                        <div class="service-port">Port 8000</div>
                        <div class="service-detail">Web Search • Real-time Results</div>
                    </div>
                </div>
            </div>

            <div class="flow-arrow-bidirectional">⇅</div>

            <!-- LLM Providers -->
            <div class="layer">
                <div class="layer-title">LLM Providers</div>
                <div class="services">
                    <div class="service llm">
                        <div class="service-name">OpenAI</div>
                        <div class="service-detail">GPT-5 • GPT-4o • Realtime API</div>
                    </div>
                    <div class="service llm">
                        <div class="service-name">xAI</div>
                        <div class="service-detail">Grok Models</div>
                    </div>
                    <div class="service llm">
                        <div class="service-name">Ollama</div>
                        <div class="service-detail">Local Model Hosting</div>
                    </div>
                </div>
            </div>

            <div class="flow-arrow-bidirectional">⇅</div>

            <!-- Infrastructure -->
            <div class="layer">
                <div class="layer-title">Infrastructure</div>
                <div class="services">
                    <div class="service infrastructure">
                        <div class="service-name">PostgreSQL 17</div>
                        <div class="service-port">Port 5432</div>
                        <div class="service-detail">pgvector Extension • 12D Vector Storage • Primary Database</div>
                    </div>
                    <div class="service infrastructure">
                        <div class="service-name">Redis 7</div>
                        <div class="service-port">Port 6379</div>
                        <div class="service-detail">Caching • Session Management • State Management</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Key Features -->
        <div class="feature-grid">
            <div class="feature">
                <h3>Multi-Agent Orchestration</h3>
                <p>Dynamic selection of 1-5 specialized agents based on query complexity, with sequential execution and context-aware coordination.</p>
            </div>
            <div class="feature">
                <h3>12D Dimensional Intelligence</h3>
                <p>Comprehensive content analysis across 12 dimensions: Vision, Structure, Semantic, Temporal, Emotional, Relational, Ethical, and more.</p>
            </div>
            <div class="feature">
                <h3>Intelligent LLM Routing</h3>
                <p>Model-agnostic routing with complexity-based selection, reducing costs by 40-60% through adaptive model matching.</p>
            </div>
            <div class="feature">
                <h3>Production Architecture</h3>
                <p>Enterprise-grade microservices on Kubernetes (GKE) with full observability, health monitoring, and real-time streaming.</p>
            </div>
        </div>

        <!-- Tech Stack -->
        <div class="tech-stack">
            <h3>Technology Stack</h3>
            <p>
                <strong>Backend:</strong> .NET 8 • Python • gRPC • SignalR<br>
                <strong>Frontend:</strong> Next.js 15 • React 18 • TypeScript<br>
                <strong>Infrastructure:</strong> Kubernetes (GKE) • Terraform • PostgreSQL 17 • Redis 7<br>
                <strong>AI/ML:</strong> OpenAI • Anthropic • Ollama • pgvector
            </p>
        </div>
    </div>
</div>
