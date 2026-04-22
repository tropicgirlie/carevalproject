import { useState, useMemo } from 'react';

type GraphNode = {
  node_id: string;
  label: string;
  type: string;
  group: string;
  description: string;
  severity: number;
  visibility: string;
};

type GraphLink = {
  edge_id: string;
  source: string;
  target: string;
  weight: number;
  relationship_type: string;
  explanation: string;
};

type FailurePath = {
  path_id: string;
  label: string;
  sequence: string[];
  description: string;
};

type GraphData = {
  meta: { title: string; description: string; version: string; node_count: number; link_count: number };
  nodes: GraphNode[];
  links: GraphLink[];
  example_failure_paths: FailurePath[];
};

import data from '../../../public/momops_interdependency_graph.json';
const graphData = data as GraphData;

const TYPE_COLORS: Record<string, string> = {
  disruption: '#ef4444',
  infrastructure: '#3b82f6',
  dimension: '#0D9488',
  actor: '#64748b',
  outcome: '#f59e0b',
};

const TYPE_LABELS: Record<string, string> = {
  disruption: 'Disruption',
  infrastructure: 'Infrastructure',
  dimension: 'Dimension',
  actor: 'Actor',
  outcome: 'Outcome',
};

function layoutNodes(nodes: GraphNode[], links: GraphLink[], width: number, height: number) {
  const cx = width / 2;
  const cy = height / 2;

  // Group nodes by type and arrange in concentric rings
  const typeOrder = ['disruption', 'dimension', 'infrastructure', 'actor', 'outcome'];
  const groups = typeOrder.map(t => nodes.filter(n => n.type === t));
  const positioned = new Map<string, { x: number; y: number }>();

  groups.forEach((group, ringIdx) => {
    const radius = 80 + ringIdx * 70;
    const count = group.length;
    group.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / count - Math.PI / 2 + ringIdx * 0.3;
      positioned.set(node.node_id, {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      });
    });
  });

  return positioned;
}

export function InterdependencyGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const svgWidth = 900;
  const svgHeight = 560;

  const positions = useMemo(
    () => layoutNodes(graphData.nodes, graphData.links, svgWidth, svgHeight),
    []
  );

  // Highlight nodes/edges in selected failure path
  const pathNodeIds = new Set<string>();
  const pathEdgeIds = new Set<string>();
  if (selectedPath) {
    const fp = graphData.example_failure_paths.find(p => p.path_id === selectedPath);
    if (fp) {
      fp.sequence.forEach(id => pathNodeIds.add(id));
      for (let i = 0; i < fp.sequence.length - 1; i++) {
        const src = fp.sequence[i];
        const tgt = fp.sequence[i + 1];
        const edge = graphData.links.find(
          l => l.source === src && l.target === tgt
        );
        if (edge) pathEdgeIds.add(edge.edge_id);
      }
    }
  }

  // Determine which nodes/edges to dim
  const activeNodeIds = hoveredNode
    ? new Set([
        hoveredNode,
        ...graphData.links
          .filter(l => l.source === hoveredNode || l.target === hoveredNode)
          .flatMap(l => [l.source, l.target]),
      ])
    : null;

  const isEdgeActive = (link: GraphLink) => {
    if (selectedPath) return pathEdgeIds.has(link.edge_id);
    if (hoveredNode) return link.source === hoveredNode || link.target === hoveredNode;
    return true;
  };

  const isNodeActive = (node: GraphNode) => {
    if (selectedPath) return pathNodeIds.has(node.node_id);
    if (activeNodeIds) return activeNodeIds.has(node.node_id);
    return true;
  };

  const hoveredNodeData = hoveredNode
    ? graphData.nodes.find(n => n.node_id === hoveredNode)
    : null;

  return (
    <div className="space-y-4">
      {/* SVG graph */}
      <div className="border border-border/40 bg-[#f8fafc] overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto min-w-[600px]"
          style={{ maxHeight: '560px' }}
        >
          {/* Edges */}
          {graphData.links.map(link => {
            const src = positions.get(link.source);
            const tgt = positions.get(link.target);
            if (!src || !tgt) return null;
            const active = isEdgeActive(link);
            const inPath = pathEdgeIds.has(link.edge_id);
            return (
              <line
                key={link.edge_id}
                x1={src.x}
                y1={src.y}
                x2={tgt.x}
                y2={tgt.y}
                stroke={inPath ? '#0D9488' : active ? '#94a3b8' : '#e2e8f0'}
                strokeWidth={inPath ? 2.5 : active ? Math.max(1, link.weight * 2) : 0.5}
                strokeOpacity={active ? 0.7 : 0.15}
              />
            );
          })}

          {/* Nodes */}
          {graphData.nodes.map(node => {
            const pos = positions.get(node.node_id);
            if (!pos) return null;
            const active = isNodeActive(node);
            const inPath = pathNodeIds.has(node.node_id);
            const color = TYPE_COLORS[node.type] || '#64748b';
            const r = node.type === 'dimension' ? 18 : node.type === 'disruption' ? 15 : 12;
            return (
              <g
                key={node.node_id}
                transform={`translate(${pos.x},${pos.y})`}
                onMouseEnter={() => setHoveredNode(node.node_id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                <circle
                  r={r}
                  fill={active ? color : '#e2e8f0'}
                  fillOpacity={active ? (inPath ? 1 : 0.85) : 0.3}
                  stroke={inPath ? '#0f172a' : active ? color : '#cbd5e1'}
                  strokeWidth={inPath ? 2 : 1}
                />
                <text
                  textAnchor="middle"
                  dy={r + 12}
                  className="text-[9px] fill-deep-navy"
                  fillOpacity={active ? 1 : 0.3}
                  style={{ fontWeight: inPath ? 600 : 400, fontSize: '9px' }}
                >
                  {node.label.length > 22 ? node.label.slice(0, 20) + '…' : node.label}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g transform={`translate(16, ${svgHeight - 120})`}>
            {typeOrder.map((t, i) => (
              <g key={t} transform={`translate(0, ${i * 20})`}>
                <circle r={6} fill={TYPE_COLORS[t]} />
                <text x={14} dy={4} style={{ fontSize: '10px' }} className="fill-slate-grey">
                  {TYPE_LABELS[t]}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Tooltip / info panel */}
      {hoveredNodeData && (
        <div className="border border-border/60 bg-white p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: TYPE_COLORS[hoveredNodeData.type] }}
            />
            <p className="text-[16px] uppercase tracking-[0.1em] text-slate-grey">
              {TYPE_LABELS[hoveredNodeData.type]}
            </p>
          </div>
          <p className="text-[16px] font-semibold text-deep-navy">{hoveredNodeData.label}</p>
          <p className="text-[16px] text-slate-grey leading-5">{hoveredNodeData.description}</p>
          <p className="text-[16px] text-slate-grey">
            Severity: {(hoveredNodeData.severity * 100).toFixed(0)}% · Visibility: {hoveredNodeData.visibility}
          </p>
        </div>
      )}

      {/* Failure path selector */}
      <div className="space-y-3">
        <p className="text-[16px] uppercase tracking-[0.12em] text-slate-grey">Example failure paths</p>
        <div className="flex flex-wrap gap-2">
          {graphData.example_failure_paths.map(fp => (
            <button
              key={fp.path_id}
              onClick={() => setSelectedPath(selectedPath === fp.path_id ? null : fp.path_id)}
              className={`px-3 py-1.5 text-[16px] tracking-[0.1em] uppercase border transition-colors ${
                selectedPath === fp.path_id
                  ? 'bg-deep-navy text-white border-deep-navy'
                  : 'bg-white text-deep-navy border-border/60 hover:border-deep-navy/30'
              }`}
            >
              {fp.label}
            </button>
          ))}
        </div>
        {selectedPath && (() => {
          const fp = graphData.example_failure_paths.find(p => p.path_id === selectedPath);
          if (!fp) return null;
          return (
            <div className="border-l-2 border-primary pl-4 py-2">
              <p className="text-[16px] text-slate-grey leading-6">{fp.description}</p>
              <p className="text-[16px] uppercase tracking-[0.1em] text-slate-grey mt-2">
                Path: {fp.sequence.join(' → ')}
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

const typeOrder = ['disruption', 'dimension', 'infrastructure', 'actor', 'outcome'];
