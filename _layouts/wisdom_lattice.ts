---
layout: default
---

<style>
  /* Cosmic UI styles */
  :root{
    --panel-bg: rgba(10,10,20,0.55);
    --accent-1: #8b5cf6;
    --accent-2: #3b82f6;
    --accent-3: #ef4444;
    --accent-4: #10b981;
    --accent-5: #f59e0b;
    --glass: rgba(255,255,255,0.03);
  }

  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: radial-gradient(ellipse at 30% 10%, rgba(20,18,40,0.6) 0%, rgba(0,0,5,1) 60%), #000;
    color: #cfe6ff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .container {
    padding: 28px;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    font-size: 28px;
    text-align: center;
    margin: 6px 0 2px;
    letter-spacing: 0.6px;
  }
  .subtitle {
    color: #9fb8ff;
    text-align: center;
    margin-bottom: 18px;
    font-size: 14px;
  }

  .stage {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 20px;
    align-items: start;
  }

  .panel {
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    border-radius: 12px;
    padding: 14px;
    border: 1px solid rgba(140,150,255,0.08);
    backdrop-filter: blur(6px);
  }

  /* left column panel */
  .controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .controls .row {
    display:flex;
    gap:8px;
    align-items:center;
    justify-content:space-between;
  }

  .btn {
    display:inline-flex;
    gap:8px;
    align-items:center;
    padding:8px 12px;
    border-radius:8px;
    border:1px solid rgba(120,140,255,0.12);
    background: rgba(40,50,90,0.45);
    color: white;
    cursor:pointer;
    font-weight:600;
  }
  .btn.ghost { background: transparent; border: 1px solid rgba(255,255,255,0.04); }
  .btn:active { transform: translateY(1px); }

  .hud {
    display:flex;
    gap:14px;
    justify-content:space-between;
    margin-top:8px;
    flex-wrap:wrap;
  }

  .stat {
    flex:1 1 120px;
    text-align:center;
    padding:8px;
    border-radius:8px;
    background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005));
    border:1px solid rgba(255,255,255,0.02);
  }
  .stat .big { font-size:18px; font-weight:700; color: #f0f7ff; }
  .stat .small { font-size:12px; color: #aec8ff; }

  .canvas-wrap {
    background: radial-gradient(ellipse at 20% 10%, rgba(50,36,90,0.08), rgba(0,0,10,0.3)), var(--panel-bg);
    border-radius:12px;
    padding:10px;
    border:1px solid rgba(120,140,255,0.06);
  }

  canvas {
    display:block;
    width:100%;
    border-radius:10px;
    background: transparent;
  }

  .banner {
    margin-top:8px;
    padding:8px;
    border-radius:8px;
    text-align:center;
    color:#dfffe0;
    background: linear-gradient(90deg, rgba(6,40,20,0.4), rgba(8,60,30,0.25));
    border:1px solid rgba(40,200,120,0.06);
    font-weight:700;
  }

  .legend { display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }
  .legend .item { display:flex; gap:8px; align-items:center; font-size:13px; color:#bcd3ff; }
  .dot { width:12px; height:12px; border-radius:50%; box-shadow:0 0 8px rgba(255,255,255,0.04) }

  .progress-wrap{
    margin-top:12px;
    display:flex;
    flex-direction:column;
    gap:6px;
  }
  .progress-label{
    display:flex;
    justify-content:space-between;
    font-size:12px;
    color:#c6dcff;
    letter-spacing:0.2px;
  }
  .progress-bar{
    height:8px;
    background:rgba(255,255,255,0.06);
    border-radius:999px;
    overflow:hidden;
    border:1px solid rgba(255,255,255,0.05);
  }
  .progress-fill{
    display:block;
    height:100%;
    width:0%;
    background:linear-gradient(90deg, #3b82f6, #8b5cf6);
    box-shadow:0 0 10px rgba(99,102,241,0.45);
    transition:width 0.25s ease-out;
  }

  .phase-note{
    margin-top:10px;
    font-size:13px;
    line-height:1.5;
    color:#9fb8ff;
    background:rgba(255,255,255,0.02);
    border:1px solid rgba(255,255,255,0.04);
    padding:10px;
    border-radius:8px;
  }

  .info-grid{
    margin-top:20px;
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(260px,1fr));
    gap:14px;
  }

  .info-card{
    padding:14px;
    border-radius:10px;
    border:1px solid rgba(140,150,255,0.08);
    background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  }
  .info-card h3{
    margin:0 0 8px;
    font-size:15px;
    letter-spacing:0.2px;
    color:#e7efff;
  }
  .info-list{ list-style:none; margin:0; padding:0; display:grid; gap:8px; }
  .info-list li{
    display:flex;
    gap:8px;
    align-items:flex-start;
    color:#bcd3ff;
    font-size:13px;
    line-height:1.5;
  }
  .info-list .bar{
    margin-top:6px;
    width:18px;
    height:2px;
    flex-shrink:0;
    border-radius:999px;
    background:rgba(255,255,255,0.35);
  }

  .tag-legend{
    display:flex;
    flex-direction:column;
    gap:8px;
  }
  .tag-row{
    display:flex;
    align-items:center;
    gap:8px;
    color:#c6dcff;
    font-size:13px;
  }

  .phase-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
    gap:10px;
    margin-top:10px;
  }
  .phase-pill{
    padding:12px;
    border-radius:10px;
    border:1px solid rgba(255,255,255,0.05);
    background:rgba(255,255,255,0.015);
    color:#cfe6ff;
    font-size:13px;
    line-height:1.5;
  }
  .phase-pill strong{ display:block; color:#ffffff; margin-bottom:4px; }

  .legend-grid{
    margin-top:24px;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:14px;
  }
  .legend-pane{
    position:relative;
    padding:14px;
    border-radius:12px;
    border:1px solid rgba(140,150,255,0.1);
    background:radial-gradient(circle at 20% 20%, rgba(99,102,241,0.1), rgba(0,0,0,0)) , rgba(255,255,255,0.02);
    box-shadow:0 10px 30px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.02);
  }
  .legend-pane:before{
    content:'';
    position:absolute;
    inset:-1px;
    border-radius:12px;
    border:1px solid rgba(255,255,255,0.05);
    pointer-events:none;
  }
  .legend-pane h3{
    margin:0 0 10px;
    font-size:15px;
    letter-spacing:0.3px;
    color:#e9f1ff;
  }
  .legend-pane ul{
    margin:0;
    padding-left:0;
    list-style:none;
    display:grid;
    gap:8px;
    color:#cfe0ff;
    font-size:13px;
    line-height:1.55;
  }
  .legend-pane li{
    position:relative;
    padding-left:18px;
  }
  .legend-pane li::before{
    content:'✦';
    position:absolute;
    left:0;
    color:#8b5cf6;
    opacity:0.9;
    font-size:10px;
    top:2px;
  }
  .legend-pane small{
    display:block;
    color:#94b3ff;
    margin-top:4px;
    font-size:12px;
  }

  /* small screens fallback */
  @media (max-width:980px){
    .stage { grid-template-columns: 1fr; }
    .container { padding: 16px; }
  }
</style>

<div class="container">
  <h1>Semantic Knowledge Graph — Constellation View</h1>
  <div class="subtitle">Peer into the lattice — watch memory crystals form constellations ✦</div>

  <div class="stage">
    <div class="panel controls">
      <div class="row" style="justify-content:center;">
        <button id="playPause" class="btn">Play</button>
        <button id="toggle3D" class="btn">3D View</button>
        <button id="resetBtn" class="btn">Reset</button>
      </div>

      <div>
        <label style="display:block; font-size:13px; color:#bcd3ff; margin-bottom:6px;">Simulation speed: <span id="speedLabel">1</span>x</label>
        <input id="speedSlider" type="range" min="1" max="100" value="1" style="width:100%;">
      </div>

      <div class="hud">
        <div class="stat">
          <div class="big" id="nodeCount">0</div>
          <div class="small">Memory Nodes</div>
        </div>
        <div class="stat">
          <div class="big" id="edgeCount">0</div>
          <div class="small">Relationships</div>
        </div>
        <div class="stat">
          <div class="big" id="avgDegree">0.00</div>
          <div class="small">Avg Degree</div>
        </div>
      </div>

      <div style="margin-top:10px;">
        <div style="font-size:13px; color:#c6dcff; margin-bottom:6px;">Phase</div>
        <div style="font-weight:800; font-size:18px; color:#f4f9ff;" id="phaseLabel">EARLY</div>
      </div>

      <div class="progress-wrap">
        <div class="progress-label">
          <span>Network Progress</span>
          <span id="progressValue">0%</span>
        </div>
        <div class="progress-bar"><span class="progress-fill" id="progressBar"></span></div>
      </div>

      <div id="criticalBanner" class="banner" style="display:none;margin-top:12px;">
        🎯 CRITICAL MASS ACHIEVED
      </div>

      <div class="phase-note" id="phaseNote">
        Early growth: low connectivity, seeds finding neighbors.
      </div>

      <div class="legend" aria-hidden="true">
        <div class="item"><span class="dot" style="background:#8b5cf6"></span>Agent-A</div>
        <div class="item"><span class="dot" style="background:#3b82f6"></span>Agent-B</div>
        <div class="item"><span class="dot" style="background:#ef4444"></span>Agent-C</div>
        <div class="item"><span class="dot" style="background:#10b981"></span>Agent-D</div>
        <div class="item"><span class="dot" style="background:#f59e0b"></span>Agent-E</div>
      </div>
    </div>

    <div class="panel canvas-wrap">
      <canvas id="latticeCanvas" width="800" height="800"></canvas>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-card">
      <h3>Source Distribution</h3>
      <div class="tag-legend">
        <div class="tag-row"><span class="dot" style="background:#8b5cf6"></span>Agent-A</div>
        <div class="tag-row"><span class="dot" style="background:#3b82f6"></span>Agent-B</div>
        <div class="tag-row"><span class="dot" style="background:#ef4444"></span>Agent-C</div>
        <div class="tag-row"><span class="dot" style="background:#10b981"></span>Agent-D</div>
        <div class="tag-row"><span class="dot" style="background:#f59e0b"></span>Agent-E</div>
      </div>
    </div>

    <div class="info-card">
      <h3>Relationship Types</h3>
      <ul class="info-list">
        <li><span class="bar" style="background:#10b981"></span><span><strong>Reinforces</strong> — validates existing pattern</span></li>
        <li><span class="bar" style="background:#ef4444"></span><span><strong>Opposes</strong> — high-tension contradiction</span></li>
        <li><span class="bar" style="background:#f59e0b"></span><span><strong>Qualifies</strong> — contextual nuance</span></li>
        <li><span class="bar" style="background:#8b5cf6"></span><span><strong>Builds-on</strong> — prerequisite link</span></li>
      </ul>
    </div>

    <div class="info-card">
      <h3>Network Phases</h3>
      <div class="phase-grid">
        <div class="phase-pill"><strong>Early</strong> Sparse seed crystals seeking anchors.</div>
        <div class="phase-pill"><strong>Growing</strong> Clusters form; merge-or-mount decisions accelerate.</div>
        <div class="phase-pill"><strong>Critical</strong> ⚡ Small-world structure forms; hubs emerge.</div>
        <div class="phase-pill"><strong>Mature</strong> Topology stabilizes; paths shorten.</div>
        <div class="phase-pill"><strong>Dense</strong> Scale-free behavior and resilient memory fabric.</div>
      </div>
    </div>

    <div class="info-card">
      <h3>Implementation Notes</h3>
      <ul class="info-list">
        <li><span class="bar"></span><span><strong>Graph evolution</strong> — merge-or-mount routing tuned by local connectivity.</span></li>
        <li><span class="bar"></span><span><strong>Forces</strong> — repulsion, spring edges, and gentle center gravity keep constellations coherent.</span></li>
        <li><span class="bar"></span><span><strong>3D projection</strong> — slow orbit reveals hidden clusters in depth.</span></li>
      </ul>
    </div>
  </div>

  <div class="legend-grid">
    <div class="legend-pane">
      <h3>Network Phase Transitions</h3>
      <ul>
        <li><strong>Critical Mass (~15K)</strong><small>Structure stabilizes; emergent properties appear (≈√N × 15).</small></li>
        <li>Average path length slides toward log(N).</li>
        <li>Clustering coefficient plateaus — specialized domains form.</li>
        <li>Small-world network traits emerge.</li>
        <li>High-degree nodes crystallize into hubs.</li>
      </ul>
    </div>

    <div class="legend-pane">
      <h3>Maximum Connectivity (~50K)</h3>
      <ul>
        <li>Peak average degree; topology optimizes.</li>
        <li>Each node keeps ~2–4 stable connections.</li>
        <li>Preferential attachment grows high-weight hubs (scale-free onset).</li>
        <li>Redundant edges pruned; critical paths preserved.</li>
        <li>Transition into mature distributed memory fabric.</li>
      </ul>
    </div>

    <div class="legend-pane">
      <h3>Scale-Free Network (500K+)</h3>
      <ul>
        <li>Power-law degree distribution dominates.</li>
        <li>Robust retrieval, graceful degradation.</li>
        <li>Fault tolerance rises with distributed hubs.</li>
      </ul>
    </div>
  </div>

  <div class="legend-grid">
    <div class="legend-pane">
      <h3>Growth Dynamics</h3>
      <ul>
        <li><strong>Early (0–1K)</strong><small>Sparse seeds; high merge probability (30%).</small></li>
        <li><strong>Growing (1K–15K)</strong><small>Connectivity rises; clusters emerge; multi-connection strategy begins.</small></li>
        <li><strong>Critical (15K–50K)</strong><small>⚡ Phase transition; small-world structure forms.</small></li>
        <li><strong>Mature (50K–500K)</strong><small>Stable topology; hubs dominate; optimized flow.</small></li>
        <li><strong>Dense (500K–1M)</strong><small>Scale-free network; power-law distribution; resilient memory.</small></li>
      </ul>
    </div>

    <div class="legend-pane">
      <h3>Source Distribution</h3>
      <ul>
        <li><span class="dot" style="background:#8b5cf6"></span> Agent-A</li>
        <li><span class="dot" style="background:#3b82f6"></span> Agent-B</li>
        <li><span class="dot" style="background:#ef4444"></span> Agent-C</li>
        <li><span class="dot" style="background:#10b981"></span> Agent-D</li>
        <li><span class="dot" style="background:#f59e0b"></span> Agent-E</li>
      </ul>
    </div>

    <div class="legend-pane">
      <h3>Relationship Types</h3>
      <ul>
        <li><span class="bar" style="background:#10b981"></span> Reinforces<small>Validates existing pattern.</small></li>
        <li><span class="bar" style="background:#ef4444"></span> Opposes<small>High-tension contradiction.</small></li>
        <li><span class="bar" style="background:#f59e0b"></span> Qualifies<small>Adds contextual nuance.</small></li>
        <li><span class="bar" style="background:#8b5cf6"></span> Builds-on<small>Prerequisite relationship.</small></li>
      </ul>
    </div>

    <div class="legend-pane">
      <h3>Technical Implementation</h3>
      <ul>
        <li>Graph evolution — merge vs. mount, guided by connectivity and distance.</li>
        <li>Physics — repulsion, spring tension, center gravity, damping.</li>
        <li>3D projection — slow orbit reveals depth-only clusters.</li>
      </ul>
    </div>
  </div>
</div>

<script>
/* Plain JS conversion of the LatticeVisualization
   - Keep same logic (merge-or-mount, forces, edges, 3D projection)
   - Cosmic visuals: starfield, subtle nebula, glowing nodes/edges
*/

(function(){
  // --- Config ---
  const CANVAS_SIZE = 800;
  const DISPLAY_NODES = 200;
  const TARGET_NODES = 1000000;
  const NODE_RADIUS = 3;
  const CRITICAL_MASS_THRESHOLD = 15000;
  const MAX_CONNECTIVITY_NODES = 50000;

  // Elements
  const canvas = document.getElementById('latticeCanvas');
  const ctx = canvas.getContext('2d');

  // High-DPI scaling
  function setCanvasSize(){
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    canvas.style.width = CANVAS_SIZE + 'px';
    canvas.style.height = CANVAS_SIZE + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  setCanvasSize();

  const playPause = document.getElementById('playPause');
  const toggle3D = document.getElementById('toggle3D');
  const resetBtn = document.getElementById('resetBtn');
  const speedSlider = document.getElementById('speedSlider');
  const speedLabel = document.getElementById('speedLabel');
  const progressBar = document.getElementById('progressBar');
  const progressValue = document.getElementById('progressValue');

  const nodeCountEl = document.getElementById('nodeCount');
  const edgeCountEl = document.getElementById('edgeCount');
  const avgDegreeEl = document.getElementById('avgDegree');
  const phaseLabel = document.getElementById('phaseLabel');
  const criticalBanner = document.getElementById('criticalBanner');
  const phaseNote = document.getElementById('phaseNote');

  // State
  let isPlaying = false;
  let is3D = false;
  let speed = parseInt(speedSlider.value,10) || 1;
  let timeAccumulator = 0;
  let rotation = { x: 0.3, y: 0 };
  let rotationAuto = { x: 0.3, y: 0 };
  let criticalMassHit = false;

  // Simulation containers
  let nodes = [];
  let edges = [];

  // Starfield background precompute
  const backgroundStars = [];
  for(let i=0;i<160;i++){
    backgroundStars.push({
      x: Math.random()*CANVAS_SIZE,
      y: Math.random()*CANVAS_SIZE,
      r: Math.random()*1.8 + 0.2,
      alpha: Math.random()*0.6 + 0.2
    });
  }

  // Helpers
  function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function formatNumber(num){
    if(num>=1000000) return (num/1000000).toFixed(2)+'M';
    if(num>=1000) return (num/1000).toFixed(1)+'K';
    return String(num);
  }

  function getPhaseFromCount(count){
    if(count < 1000) return 'early';
    if(count < 15000) return 'growing';
    if(count < 50000) return 'critical';
    if(count < 500000) return 'mature';
    return 'dense';
  }

  function getColorForType(type){
    const map = {'Agent-A':'#8b5cf6','Agent-B':'#3b82f6','Agent-C':'#ef4444','Agent-D':'#10b981','Agent-E':'#f59e0b'};
    return map[type] || '#6b7280';
  }
  function getEdgeColor(relationType){
    const map = {'Reinforces':'#10b981','Opposes':'#ef4444','Qualifies':'#f59e0b','Builds-on':'#8b5cf6'};
    return map[relationType] || '#6b7280';
  }

  function calculateConnectivity(nodesArr, edgesArr){
    if(nodesArr.length===0) return 0;
    return (edgesArr.length * 2) / nodesArr.length;
  }

  // Seed initial nodes
  function seedNodes(){
    nodes = Array.from({length:5}, (_,i) => ({
      id: i,
      x: Math.random()*CANVAS_SIZE,
      y: Math.random()*CANVAS_SIZE,
      z: Math.random()*CANVAS_SIZE,
      weight: Math.floor(Math.random()*5)+1,
      type: `Agent-${String.fromCharCode(65+i)}`,
      vx: 0, vy: 0, vz: 0,
      connections: 0
    }));
    edges = [];
    criticalMassHit = false;
    updateHUD();
  }

  seedNodes();

  // Merge-or-mount + addNode logic (ported)
  function addNode(existingNodes, actualCount){
    const types = ['Agent-A','Agent-B','Agent-C','Agent-D','Agent-E'];
    const randomType = types[Math.floor(Math.random()*types.length)];

    const currentConnectivity = calculateConnectivity(existingNodes, edges);
    const baseMergeRate = 0.3;
    const connectivityBoost = Math.min(currentConnectivity / 10, 0.4);
    const shouldMerge = Math.random() < (baseMergeRate + connectivityBoost) && existingNodes.length > 0;

    if(shouldMerge && existingNodes.length < DISPLAY_NODES){
      const targetIdx = Math.floor(Math.random()*existingNodes.length);
      const updated = existingNodes.slice();
      updated[targetIdx] = Object.assign({}, updated[targetIdx], { weight: updated[targetIdx].weight + 1 });
      return { nodes: updated, newEdges: [] };
    } else {
      if(existingNodes.length >= DISPLAY_NODES){
        const lowWeightIdx = existingNodes.findIndex(n => n.weight < 5);
        if(lowWeightIdx !== -1){
          const updated = existingNodes.slice();
          updated[lowWeightIdx] = {
            id: actualCount,
            x: Math.random()*CANVAS_SIZE,
            y: Math.random()*CANVAS_SIZE,
            z: Math.random()*CANVAS_SIZE,
            weight: 1,
            type: randomType,
            vx: 0, vy: 0, vz: 0,
            connections: 0
          };
          return { nodes: updated, newEdges: [] };
        }
        return { nodes: existingNodes, newEdges: [] };
      }

      const newNode = {
        id: actualCount,
        x: Math.random()*CANVAS_SIZE,
        y: Math.random()*CANVAS_SIZE,
        z: Math.random()*CANVAS_SIZE,
        weight: 1,
        type: randomType,
        vx: 0, vy: 0, vz: 0,
        connections: 0
      };

      const newEdges = [];
      const maxConnections = actualCount < CRITICAL_MASS_THRESHOLD ? 1 : (actualCount < MAX_CONNECTIVITY_NODES ? 3 : 2);

      const distances = existingNodes.map((node, idx) => {
        const dx = node.x - newNode.x;
        const dy = node.y - newNode.y;
        const dz = node.z - newNode.z;
        return { idx, dist: Math.sqrt(dx*dx + dy*dy + dz*dz), node };
      }).sort((a,b) => a.dist - b.dist);

      const handshakeDistance = 180;
      for(let i=0; i<Math.min(maxConnections, distances.length); i++){
        if(distances[i].dist < handshakeDistance){
          const relations = ['Reinforces','Opposes','Qualifies','Builds-on'];
          const weights = actualCount < CRITICAL_MASS_THRESHOLD ? [0.5,0.2,0.2,0.1] : [0.4,0.3,0.2,0.1];
          const rand = Math.random();
          let relationType = 'Reinforces';
          let cumulative = 0;
          for(let j=0;j<relations.length;j++){
            cumulative += weights[j];
            if(rand < cumulative){ relationType = relations[j]; break; }
          }
          newEdges.push({
            source: distances[i].node.id,
            target: newNode.id,
            type: relationType,
            tension: relationType === 'Opposes' ? (Math.random()*0.4 + 0.6) : (Math.random()*0.5)
          });
          distances[i].node.connections++;
          newNode.connections++;
        }
      }
      return { nodes: existingNodes.concat([newNode]), newEdges };
    }
  }

  // Force simulation
  function applyForces(nodesArr, edgesArr){
    const updated = nodesArr.map(n => Object.assign({}, n));
    const alpha = 0.08;

    for(let i=0;i<updated.length;i++){
      for(let j=i+1;j<updated.length;j++){
        const dx = updated[j].x - updated[i].x;
        const dy = updated[j].y - updated[i].y;
        const dz = updated[j].z - updated[i].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz) || 1;
        const force = (NODE_RADIUS * 50) / (dist * dist);

        updated[i].vx -= (dx / dist) * force;
        updated[i].vy -= (dy / dist) * force;
        updated[i].vz -= (dz / dist) * force;
        updated[j].vx += (dx / dist) * force;
        updated[j].vy += (dy / dist) * force;
        updated[j].vz += (dz / dist) * force;
      }
    }

    edgesArr.forEach(edge => {
      const source = updated.find(n => n.id === edge.source);
      const target = updated.find(n => n.id === edge.target);
      if(source && target){
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dz = target.z - source.z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz) || 1;
        const force = (dist - 120) * 0.01;

        source.vx += (dx / dist) * force;
        source.vy += (dy / dist) * force;
        source.vz += (dz / dist) * force;
        target.vx -= (dx / dist) * force;
        target.vy -= (dy / dist) * force;
        target.vz -= (dz / dist) * force;
      }
    });

    updated.forEach(node => {
      const dx = CANVAS_SIZE/2 - node.x;
      const dy = CANVAS_SIZE/2 - node.y;
      const dz = CANVAS_SIZE/2 - node.z;
      node.vx += dx * 0.0008;
      node.vy += dy * 0.0008;
      node.vz += dz * 0.0008;
    });

    updated.forEach(node => {
      node.x += node.vx * alpha;
      node.y += node.vy * alpha;
      node.z += node.vz * alpha;
      node.vx *= 0.85;
      node.vy *= 0.85;
      node.vz *= 0.85;

      node.x = Math.max(NODE_RADIUS*2, Math.min(CANVAS_SIZE - NODE_RADIUS*2, node.x));
      node.y = Math.max(NODE_RADIUS*2, Math.min(CANVAS_SIZE - NODE_RADIUS*2, node.y));
      node.z = Math.max(NODE_RADIUS*2, Math.min(CANVAS_SIZE - NODE_RADIUS*2, node.z));
    });

    return updated;
  }

  // 3D projection
  function project3D(x,y,z, rot){
    const centerX = CANVAS_SIZE/2;
    const centerY = CANVAS_SIZE/2;
    const dx = x - centerX;
    const dy = y - centerY;
    const dz = z - centerX; // centerZ ~ centerX (square)
    const cosX = Math.cos(rot.x), sinX = Math.sin(rot.x);
    const cosY = Math.cos(rot.y), sinY = Math.sin(rot.y);
    const y1 = dy * cosX - dz * sinX;
    const z1 = dy * sinX + dz * cosX;
    const x2 = dx * cosY + z1 * sinY;
    const z2 = -dx * sinY + z1 * cosY;
    const scale = 600 / (600 + z2);
    return { x: centerX + x2 * scale, y: centerY + y1 * scale, scale, z: z2 };
  }

  // Draw starfield + nebula
  function drawBackground(){
    // nebula gradient
    const g = ctx.createRadialGradient(120, 120, 10, CANVAS_SIZE/2, CANVAS_SIZE/2, CANVAS_SIZE*0.9);
    g.addColorStop(0, 'rgba(28,20,40,0.25)');
    g.addColorStop(0.25, 'rgba(20,10,40,0.18)');
    g.addColorStop(1, 'rgba(0,0,6,0.9)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

    // faint glow center
    const g2 = ctx.createRadialGradient(CANVAS_SIZE*0.75, CANVAS_SIZE*0.25, 10, CANVAS_SIZE*0.75, CANVAS_SIZE*0.25, CANVAS_SIZE*0.9);
    g2.addColorStop(0, 'rgba(72,50,120,0.06)');
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

    // background stars
    backgroundStars.forEach(s => {
      ctx.beginPath();
      ctx.globalAlpha = s.alpha * 0.9;
      ctx.fillStyle = '#ffffff';
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  // Main draw
  function drawFrame(){
    // clear & draw background
    ctx.clearRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    drawBackground();

    // auto rotation when 3D
    if(is3D){
      rotationAuto.y += 0.005 * (speed/5);
      rotation.y = rotationAuto.y;
      rotation.x = 0.28 + Math.sin(Date.now()/8000)*0.02;
    }

    if(is3D){
      // project nodes
      const projected = nodes.map(n => {
        const proj = project3D(n.x,n.y,n.z, rotation);
        return Object.assign({}, n, { proj });
      }).sort((a,b) => a.proj.z - b.proj.z);

      // draw edges (projected)
      edges.forEach(edge => {
        const src = projected.find(n => n.id === edge.source);
        const tgt = projected.find(n => n.id === edge.target);
        if(!src || !tgt) return;
        ctx.beginPath();
        ctx.moveTo(src.proj.x, src.proj.y);
        ctx.lineTo(tgt.proj.x, tgt.proj.y);
        ctx.strokeStyle = getEdgeColor(edge.type);
        const avgZ = (src.proj.z + tgt.proj.z)/2;
        const depthAlpha = Math.max(0.08, 1 - avgZ/400);
        ctx.lineWidth = (edge.tension > 0.6 ? 1.75 : 0.9) * (src.proj.scale + tgt.proj.scale) * 0.6;
        ctx.globalAlpha = ((edge.tension > 0.6 ? 0.6 : 0.18) * depthAlpha);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // draw nodes (projected)
      projected.forEach(n => {
        ctx.beginPath();
        const radius = (NODE_RADIUS + Math.log(n.weight + 1)*2) * n.proj.scale;
        ctx.arc(n.proj.x, n.proj.y, radius, 0, Math.PI*2);
        // glow fill
        const c = getColorForType(n.type);
        ctx.fillStyle = c;
        ctx.globalAlpha = Math.max(0.25, 1 - n.proj.z/400);
        ctx.fill();
        ctx.globalAlpha = 1;
        // subtle white rim
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        // tiny core
        ctx.beginPath();
        ctx.arc(n.proj.x, n.proj.y, Math.max(0.9, radius*0.25), 0, Math.PI*2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.06;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

    } else {
      // 2D: edges first
      edges.forEach(edge => {
        const s = nodes.find(n => n.id === edge.source);
        const t = nodes.find(n => n.id === edge.target);
        if(!s || !t) return;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = getEdgeColor(edge.type);
        ctx.lineWidth = edge.tension > 0.6 ? 1.8 : 0.8;
        ctx.globalAlpha = edge.tension > 0.6 ? 0.55 : 0.14;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // nodes
      nodes.forEach(n => {
        ctx.beginPath();
        const radius = NODE_RADIUS + Math.log(n.weight + 1)*2;
        ctx.arc(n.x, n.y, radius, 0, Math.PI*2);
        ctx.fillStyle = getColorForType(n.type);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.07)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    }

    // subtle constellation lines (visual enhancement): connect a few nearest neighbors lightly
    for(let i=0;i<Math.min(nodes.length, 60); i++){
      const a = nodes[i];
      let nearest = null, nd = Infinity;
      for(let j=0;j<nodes.length;j++){
        if(nodes[j].id === a.id) continue;
        const dx = nodes[j].x - a.x;
        const dy = nodes[j].y - a.y;
        const d = dx*dx + dy*dy;
        if(d < nd){ nd = d; nearest = nodes[j]; }
      }
      if(nearest && nd < 240*240){
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(nearest.x, nearest.y);
        ctx.strokeStyle = 'rgba(180,200,255,0.04)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    updateHUD();
  }

  // Update HUD labels
  function updateHUD(){
    nodeCountEl.textContent = formatNumber(nodes.length);
    edgeCountEl.textContent = formatNumber(edges.length);
    avgDegreeEl.textContent = calculateConnectivity(nodes, edges).toFixed(2);
    const phase = getPhaseFromCount(nodes.length);
    phaseLabel.textContent = phase.toUpperCase();
    const progressPct = ((nodes.length / TARGET_NODES) * 100);
    if(progressBar){
      progressBar.style.width = Math.min(progressPct, 100) + '%';
    }
    if(progressValue){
      progressValue.textContent = progressPct.toFixed(1) + '%';
    }
    if(phaseNote){
      const phaseMessages = {
        early: 'Early growth: low connectivity, seeds finding neighbors.',
        growing: 'Growing: clusters emerge and merge-or-mount choices intensify.',
        critical: 'Critical: small-world structure flashes into place; hubs dominate.',
        mature: 'Mature: optimized paths, resilient topology, predictable flows.',
        dense: 'Dense: scale-free behavior with robust distributed memory fabric.'
      };
      phaseNote.textContent = phaseMessages[phase] || '';
    }
    // critical mass banner
    if(nodes.length >= CRITICAL_MASS_THRESHOLD && !criticalMassHit){
      criticalMassHit = true;
      criticalBanner.style.display = 'block';
      criticalBanner.textContent = `🎯 CRITICAL MASS reached at ${formatNumber(nodes.length)} nodes`;
      setTimeout(()=>{ criticalBanner.style.display = 'none'; }, 8000);
    }
  }

  // Animation / simulation loop
  let rafId = null;
  function animate(){
    // tick time & growth
    if(isPlaying){
      timeAccumulator += speed;

      const currentPhase = getPhaseFromCount(nodes.length);
      let nodesToAdd = 0;
      if(currentPhase === 'early') nodesToAdd = Math.floor(timeAccumulator / 30) * speed;
      else if(currentPhase === 'growing') nodesToAdd = Math.floor(timeAccumulator / 20) * speed * 10;
      else if(currentPhase === 'critical') nodesToAdd = Math.floor(timeAccumulator / 15) * speed * 50;
      else if(currentPhase === 'mature') nodesToAdd = Math.floor(timeAccumulator / 10) * speed * 100;
      else nodesToAdd = Math.floor(timeAccumulator / 5) * speed * 1000;

      if(nodesToAdd > 0){
        timeAccumulator = 0;
        let updatedNodes = nodes.slice();
        let updatedEdges = edges.slice();
        let newCount = nodes.length;

        for(let i=0;i<nodesToAdd && newCount < TARGET_NODES; i++){
          const { nodes: newNodes, newEdges } = addNode(updatedNodes, newCount);
          updatedNodes = newNodes;
          newEdges.forEach(e => updatedEdges.push(e));
          if(updatedEdges.length > 400) updatedEdges = updatedEdges.slice(-400);
          newCount++;
        }

        updatedNodes = applyForces(updatedNodes, updatedEdges);
        nodes = updatedNodes;
        edges = updatedEdges;

        // maintain displayed arrays length
        if(nodes.length > DISPLAY_NODES + 30){
          // keep last DISPLAY_NODES elements but preserve high-weight nodes randomly
          nodes = nodes.slice(-DISPLAY_NODES);
        }
      }
    }

    drawFrame();
    rafId = requestAnimationFrame(animate);
  }

  // Controls
  playPause.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playPause.textContent = isPlaying ? 'Pause' : 'Play';
    if(isPlaying && !rafId) animate();
  });

  toggle3D.addEventListener('click', () => {
    is3D = !is3D;
    toggle3D.textContent = is3D ? '2D View' : '3D View';
    rotationAuto.y = rotation.y; // preserve continuity
  });

  resetBtn.addEventListener('click', () => {
    seedNodes();
    timeAccumulator = 0;
    nodes = nodes.slice(0,5);
    edges = [];
  });

  speedSlider.addEventListener('input', (e) => {
    speed = parseInt(e.target.value,10);
    speedLabel.textContent = speed;
  });

  // start a gentle animation even if paused so UI feels alive
  animate();

  // resize handler to keep canvas crisp
  window.addEventListener('resize', () => {
    setCanvasSize();
  });

})();
</script>
