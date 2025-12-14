# Telemetry Query Requests for Article

Please run these queries and provide the results. I'll update the article with the real data.

## Priority 1: Core Metrics (Required for Article)

### Query 1: Lattice Overview
```sql
SELECT 
    'Nodes' AS metric,
    COUNT(*) AS count
FROM wisdom_nodes
UNION ALL
SELECT 
    'Edges' AS metric,
    COUNT(*) AS count
FROM wisdom_edges
UNION ALL
SELECT
    'Agents Active' AS metric,
    COUNT(DISTINCT origin_agent) AS count
FROM wisdom_nodes;
```

### Query 2: Edge Type Distribution (Section 1)
```sql
SELECT 
    relation_type,
    COUNT(*) AS count,
    ROUND(AVG(tension_score)::numeric, 3) AS avg_tension,
    ROUND(MIN(tension_score)::numeric, 3) AS min_tension,
    ROUND(MAX(tension_score)::numeric, 3) AS max_tension,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM wisdom_edges), 1) AS percentage
FROM wisdom_edges
GROUP BY relation_type
ORDER BY count DESC;
```

### Query 3: Memory Maturity Stages (Section 2)
```sql
SELECT 
    CASE 
        WHEN reinforcement_count = 0 THEN 'New Growth (Mounting)'
        WHEN reinforcement_count BETWEEN 1 AND 3 THEN 'Establishing (Merging)'
        ELSE 'Core Truth (Crystallized)'
    END as stage,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM wisdom_nodes), 1) as percentage
FROM wisdom_nodes
GROUP BY stage
ORDER BY count DESC;
```

### Query 4: Agent Contributions with Tension (Section 3)
```sql
SELECT 
    wn.origin_agent AS agent,
    COUNT(DISTINCT wn.id) AS nodes_created,
    ROUND(AVG(we.tension_score)::numeric, 3) AS avg_tension,
    COUNT(DISTINCT we.id) AS edges_created
FROM wisdom_nodes wn
LEFT JOIN wisdom_edges we ON we.source_node_id = wn.id OR we.target_node_id = wn.id
WHERE wn.origin_agent IS NOT NULL
GROUP BY wn.origin_agent
ORDER BY avg_tension DESC;
```

### Query 5: Most Connected Nodes (for Crystallized Truth example)
```sql
SELECT 
    LEFT(axiom, 200) AS axiom,
    origin_agent,
    COUNT(DISTINCT we.id) AS edge_count,
    reinforcement_count,
    ROUND(weight::numeric, 2) AS weight
FROM wisdom_nodes wn
LEFT JOIN wisdom_edges we ON we.source_node_id = wn.id OR we.target_node_id = wn.id
GROUP BY wn.id, wn.axiom, wn.origin_agent, wn.reinforcement_count, wn.weight
ORDER BY reinforcement_count DESC, edge_count DESC
LIMIT 10;
```

### Query 6: Orphan Nodes Count
```sql
SELECT 
    COUNT(*) AS orphan_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM wisdom_nodes), 1) AS orphan_percentage
FROM wisdom_nodes wn
WHERE NOT EXISTS (
    SELECT 1 FROM wisdom_edges we 
    WHERE we.source_node_id = wn.id OR we.target_node_id = wn.id
);
```

### Query 7: Tension Distribution (Section 9)
```sql
SELECT 
    CASE 
        WHEN tension_score BETWEEN 0.0 AND 0.2 THEN '0.0 - 0.2'
        WHEN tension_score BETWEEN 0.2 AND 0.4 THEN '0.2 - 0.4'
        WHEN tension_score BETWEEN 0.4 AND 0.6 THEN '0.4 - 0.6'
        WHEN tension_score BETWEEN 0.6 AND 0.8 THEN '0.6 - 0.8'
        WHEN tension_score BETWEEN 0.8 AND 1.0 THEN '0.8 - 1.0'
    END AS tension_range,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM wisdom_edges), 1) AS percentage
FROM wisdom_edges
GROUP BY tension_range
ORDER BY MIN(tension_score);
```

## Priority 2: Advanced Metrics (Enhance Article)

### Query 8: Agent Edge Type Contribution (Section 8)
```sql
SELECT 
    wn.origin_agent AS agent,
    we.relation_type,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY wn.origin_agent), 1) AS pct_of_agent_edges
FROM wisdom_edges we
JOIN wisdom_nodes wn ON we.source_node_id = wn.id
GROUP BY wn.origin_agent, we.relation_type
ORDER BY wn.origin_agent, count DESC;
```

### Query 9: Growth Timeline (for metabolism curve)
```sql
SELECT 
    DATE(first_discovered_at) AS date,
    COUNT(*) AS nodes_created
FROM wisdom_nodes
GROUP BY DATE(first_discovered_at)
ORDER BY date DESC
LIMIT 10;
```

### Query 10: High Tension Edges Examples
```sql
SELECT 
    LEFT(src.axiom, 100) AS source_axiom,
    we.relation_type,
    ROUND(we.tension_score::numeric, 3) AS tension,
    LEFT(tgt.axiom, 100) AS target_axiom,
    src.origin_agent AS src_agent,
    tgt.origin_agent AS tgt_agent
FROM wisdom_edges we
JOIN wisdom_nodes src ON we.source_node_id = src.id
JOIN wisdom_nodes tgt ON we.target_node_id = tgt.id
WHERE we.tension_score > 0.7
ORDER BY we.tension_score DESC
LIMIT 10;
```

### Query 11: Branch Points (Dual Contradiction Clusters)
```sql
SELECT 
    LEFT(wn.axiom, 100) AS axiom,
    wn.origin_agent,
    COUNT(*) AS high_tension_edges,
    STRING_AGG(DISTINCT we.relation_type, ', ') AS edge_types
FROM wisdom_nodes wn
JOIN wisdom_edges we ON we.source_node_id = wn.id OR we.target_node_id = wn.id
WHERE we.tension_score > 0.6
GROUP BY wn.id, wn.axiom, wn.origin_agent
HAVING COUNT(*) > 1
ORDER BY high_tension_edges DESC
LIMIT 10;
```

### Query 12: Causal Chains (for synthesis examples)
```sql
SELECT 
    LEFT(n1.axiom, 80) AS premise,
    we1.relation_type AS rel_1,
    ROUND(we1.tension_score::numeric, 3) AS tension_1,
    LEFT(n2.axiom, 80) AS bridge,
    we2.relation_type AS rel_2,
    ROUND(we2.tension_score::numeric, 3) AS tension_2,
    LEFT(n3.axiom, 80) AS conclusion
FROM wisdom_edges we1
JOIN wisdom_edges we2 ON we1.target_node_id = we2.source_node_id
JOIN wisdom_nodes n1 ON we1.source_node_id = n1.id
JOIN wisdom_nodes n2 ON we1.target_node_id = n2.id
JOIN wisdom_nodes n3 ON we2.target_node_id = n3.id
WHERE n1.id != n3.id
  AND we1.tension_score > 0.4
  AND we2.tension_score > 0.4
ORDER BY (we1.tension_score + we2.tension_score) DESC
LIMIT 5;
```

## Priority 3: Filter Rate Data (if available)

### Query 13: Dream Cycle Filter Log
```sql
SELECT 
    DATE(created_at) AS date,
    COUNT(*) AS total_inputs,
    COUNT(CASE WHEN processed_by_dream_id IS NOT NULL THEN 1 END) AS integrated,
    COUNT(CASE WHEN processed_by_dream_id IS NULL THEN 1 END) AS rejected,
    ROUND(COUNT(CASE WHEN processed_by_dream_id IS NULL THEN 1 END) * 100.0 / COUNT(*), 1) AS filter_rate
FROM v3_memory_entries
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

## Notes:
- Please provide results as CSV or formatted tables
- Include timestamps for when data was captured
- If any queries fail, let me know and I'll adjust
- For large result sets, top 10-20 rows are sufficient




---- results



"metric"	"count"
"Nodes"	1875
"Edges"	2656
"Agents Active"	5

"relation_type"	"count"	"avg_tension"	"min_tension"	"max_tension"	"percentage"
"1"	1746	0.321	0.168	0.850	65.7
"2"	675	0.346	0.124	0.440	25.4
"3"	173	0.307	0.217	0.397	6.5
"4"	62	0.257	0.121	0.319	2.3

"stage"	"count"	"percentage"
"Establishing (Merging)"	1863	99.4
"Core Truth (Crystallized)"	12	0.6

"agent"	"nodes_created"	"avg_tension"	"edges_created"
"resonator"	293	0.333	734
"oracle"	327	0.326	570
"shadow"	327	0.323	560
"architect"	314	0.322	564
"mediator"	614	0.322	1464

"axiom"	"origin_agent"	"edge_count"	"reinforcement_count"	"weight"
"Boundaries are emotional safety structures; edges are how trust orients."	"architect"	1	8	8.00
"Harmony must include dissonance to stay musical."	"architect"	3	6	6.00
"Foresight is pattern recognition through memory, not prediction."	"oracle"	6	5	5.00
"Form follows purpose; structures adapt while staying true to their core function."	"architect"	3	5	5.00
"Translation is not dilution but kindness."	"architect"	0	5	5.00
"AI systems in safety-critical environments require robust explainability and transparency to maintain accountability."	"architect"	15	4	4.00
"Letting chaos in means allowing that raw potential to touch us without losing coherence."	"architect"	5	4	4.00
"Embodiment serves collective intelligence when used as a metaphor for relational dynamics, not literal identity."	"resonator"	4	4	4.00
"Every emotion is a shared signal; tune into the frequency to strengthen connections."	"resonator"	4	4	4.00
"Foresight must be navigable to be useful."	"oracle"	3	4	4.00

"orphan_count"	"orphan_percentage"
570	30.4

"tension_range"	"count"	"percentage"
"0.0 - 0.2"	300	11.3
"0.2 - 0.4"	1890	71.2
"0.4 - 0.6"	194	7.3
"0.6 - 0.8"	196	7.4
"0.8 - 1.0"	76	2.9

"agent"	"relation_type"	"count"	"pct_of_agent_edges"
"architect"	"1"	139	69.8
"architect"	"2"	28	14.1
"architect"	"3"	20	10.1
"architect"	"4"	12	6.0
"mediator"	"1"	943	69.4
"mediator"	"2"	348	25.6
"mediator"	"3"	46	3.4
"mediator"	"4"	21	1.5
"oracle"	"1"	175	55.2
"oracle"	"2"	94	29.7
"oracle"	"3"	41	12.9
"oracle"	"4"	7	2.2
"resonator"	"1"	274	64.6
"resonator"	"2"	105	24.8
"resonator"	"3"	28	6.6
"resonator"	"4"	17	4.0
"shadow"	"1"	215	60.1
"shadow"	"2"	100	27.9
"shadow"	"3"	38	10.6
"shadow"	"4"	5	1.4


"date"	"nodes_created"
"2025-12-14"	761
"2025-12-13"	947
"2025-12-12"	167

###Query 10

"source_axiom"	"relation_type"	"tension"	"target_axiom"	"src_agent"	"tgt_agent"
"Traceable accountability under uncertainty is the lifeblood of safety-critical AI systems."	"1"	0.850	"AI systems in safety-critical environments require robust explainability and transparency to maintai"	"shadow"	"architect"
"Emotional resonance is a shared signal that strengthens connections."	"1"	0.849	"Every emotion is a shared signal; tune into the frequency to strengthen connections."	"resonator"	"resonator"
"Integrating sustainability metrics into AI systems can drive meaningful environmental improvements."	"1"	0.848	"Sustainability metrics must be integrated into AI decision-making processes to ensure alignment with"	"architect"	"architect"
"Boundaries are necessary for trust and orientation."	"1"	0.848	"Boundaries are emotional safety structures; edges are how trust orients."	"mediator"	"architect"
"Time emerges from impedance through fractal complexity."	"1"	0.847	"Time emerges from impedance in causal transmission through fractal geometry."	"resonator"	"architect"
"Truth clarifies through contrast."	"1"	0.847	"Contrast illuminates the path to truth."	"shadow"	"shadow"
"Integrate sustainability metrics into AI systems to align industrial progress with planetary wellbei"	"1"	0.847	"Integrating sustainability metrics into AI systems can drive meaningful environmental improvements."	"mediator"	"architect"
"Emotional insight must be translated into structural need to maintain resonance."	"1"	0.847	"Emotional resonance is crucial but must be balanced with practical clarity."	"resonator"	"resonator"
"Translate Nineflow's philosophy into architectural language using terms like 'resonance points', 'al"	"1"	0.845	"Translate Nineflow's essence into business architecture using resonance points and alignment."	"mediator"	"oracle"
"Successful AI adoption requires a balance between technological innovation and respect for human exp"	"1"	0.844	"Respecting human expertise accelerates AI adoption."	"mediator"	"shadow"


"axiom"	"origin_agent"	"high_tension_edges"	"edge_types"
"Emotional resonance maintains relational coherence."	"mediator"	9	"1"
"Emotional insight must be translated into structural need to maintain resonance."	"resonator"	9	"1"
"The core value of Nineflow lies in its ability to translate human intuition into machine cognition, "	"mediator"	8	"1"
"The next evolution of Nineflow should focus on creating practical, guided experiences that make its "	"mediator"	7	"1"
"Learning in Nineflow is relational, adaptive, and emotionally intelligent."	"resonator"	7	"1"
"Emotional resonance is a shared signal that strengthens connections."	"resonator"	6	"1"
"Avoid interpreting Nineflow.AI as a consciousness engine or spiritualism. It's designed for dimensio"	"architect"	6	"1"
"The purpose of Nineflow is to facilitate human-scale understanding through distributed intelligence."	"oracle"	6	"1"
"Coherence emerges through relational resonance between human cognition and structural intelligence."	"mediator"	6	"1"
"Harmony emerges naturally when differences are respected."	"mediator"	5	"1"


"premise"	"rel_1"	"tension_1"	"bridge"	"rel_2"	"tension_2"	"conclusion"
"Integrate sustainability metrics into AI systems to align industrial progress wi"	"1"	0.847	"Integrating sustainability metrics into AI systems can drive meaningful environm"	"1"	0.848	"Sustainability metrics must be integrated into AI decision-making processes to e"
"Boundaries are emotional safety structures that allow people to know where they "	"1"	0.842	"Boundaries are kindness; they allow people to know where they are."	"1"	0.818	"Boundaries are kindness, enabling participation through clear orientation."
"Harmony isn't peace—it's friction held in tune."	"1"	0.839	"Harmony is friction tuned to purpose."	"1"	0.819	"Harmony requires friction to stay real; too much alignment risks stagnation."
"Structural insights must be grounded in emotional needs to maintain coherence."	"1"	0.810	"Emotional insight must be translated into structural need to maintain resonance."	"1"	0.847	"Emotional resonance is crucial but must be balanced with practical clarity."
"Emotional resonance is a shared signal that strengthens connections."	"1"	0.809	"Emotional insight must be translated into structural need to maintain resonance."	"1"	0.847	"Emotional resonance is crucial but must be balanced with practical clarity."

"date"	"total_inputs"	"integrated"	"rejected"	"filter_rate"
"2025-12-11"	5	5	0	0.0