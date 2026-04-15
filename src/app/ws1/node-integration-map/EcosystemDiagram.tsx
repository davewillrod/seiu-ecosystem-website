"use client";

import { useState } from "react";

interface Node {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  primary?: boolean;
}

interface Connection {
  from: string;
  to: string;
  weight: number;
  label: string;
}

const NODES: Node[] = [
  { id: "brand", label: "Master Brand", sublabel: "SEIU Healthcare", x: 360, y: 60, primary: true },
  { id: "mobile", label: "Mobile App", sublabel: "Member experience", x: 580, y: 180 },
  { id: "training", label: "Training Centre", sublabel: "Credential pipeline", x: 580, y: 340 },
  { id: "workers", label: "WorkersFirst", sublabel: "Placement engine", x: 440, y: 460 },
  { id: "my65", label: "My65+", sublabel: "Retirement savings", x: 200, y: 400 },
  { id: "savings", label: "UnionSavings", sublabel: "Ambient retention", x: 80, y: 250 },
  { id: "homecare", label: "Home Care", sublabel: "Growth frontier", x: 200, y: 160 },
];

const CONNECTIONS: Connection[] = [
  { from: "homecare", to: "brand", weight: 80, label: "80" },
  { from: "homecare", to: "my65", weight: 75, label: "75" },
  { from: "training", to: "workers", weight: 70, label: "70" },
  { from: "training", to: "brand", weight: 60, label: "60" },
  { from: "my65", to: "brand", weight: 55, label: "55" },
  { from: "workers", to: "brand", weight: 50, label: "50" },
  { from: "homecare", to: "training", weight: 45, label: "45" },
  { from: "homecare", to: "workers", weight: 40, label: "40" },
  { from: "workers", to: "training", weight: 30, label: "30" },
  { from: "savings", to: "brand", weight: 15, label: "15" },
];

function getNodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function weightToColor(weight: number): string {
  if (weight >= 70) return "#411175";
  if (weight >= 50) return "#6612B5";
  if (weight >= 30) return "#B063FF";
  return "#000000";
}

function weightToOpacity(weight: number): number {
  if (weight >= 70) return 0.7;
  if (weight >= 50) return 0.4;
  if (weight >= 30) return 0.25;
  return 0.15;
}

export function EcosystemDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="bg-white border border-black/10 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-black/10 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-black/30">
          Ecosystem node map
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-purple-power opacity-70" />
            <span className="font-mono text-[9px] text-black/30">High (70–80)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-purple-mid opacity-40" />
            <span className="font-mono text-[9px] text-black/30">Med (50–60)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-purple-light opacity-25" />
            <span className="font-mono text-[9px] text-black/30">Low (15–40)</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <svg
          viewBox="0 0 680 540"
          className="w-full"
          aria-label="Ecosystem node connection diagram"
        >
          {/* Connection lines */}
          {CONNECTIONS.map((conn) => {
            const from = getNodeById(conn.from);
            const to = getNodeById(conn.to);
            const isActive =
              hovered === null || hovered === conn.from || hovered === conn.to;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;

            return (
              <g key={`${conn.from}-${conn.to}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={weightToColor(conn.weight)}
                  strokeOpacity={isActive ? weightToOpacity(conn.weight) : 0.05}
                  strokeWidth={conn.weight >= 70 ? 1.5 : 1}
                  strokeDasharray={conn.weight < 30 ? "3 4" : undefined}
                />
                {/* Weight label */}
                {isActive && (
                  <text
                    x={midX}
                    y={midY - 4}
                    textAnchor="middle"
                    className="font-mono"
                    style={{ fontSize: "8px", fontFamily: "var(--font-dm-mono), monospace" }}
                    fill={weightToColor(conn.weight)}
                    fillOpacity={weightToOpacity(conn.weight) + 0.2}
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => {
            const isActive = hovered === null || hovered === node.id;
            const connections = CONNECTIONS.filter(
              (c) => c.from === node.id || c.to === node.id
            );
            const maxWeight = Math.max(...connections.map((c) => c.weight), 0);

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Outer ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.primary ? 44 : 38}
                  fill="white"
                  stroke={node.primary ? "#411175" : "#000000"}
                  strokeOpacity={
                    hovered === node.id
                      ? 0.5
                      : isActive
                      ? node.primary
                        ? 0.2
                        : 0.1
                      : 0.04
                  }
                  strokeWidth={node.primary ? 1.5 : 1}
                />
                {/* Inner fill */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.primary ? 36 : 30}
                  fill={node.primary ? "#411175" : "#EEEEEE"}
                  fillOpacity={isActive ? (node.primary ? 1 : 0.6) : 0.2}
                />
                {/* Label */}
                <text
                  x={node.x}
                  y={node.y - 3}
                  textAnchor="middle"
                  style={{
                    fontSize: node.primary ? "9px" : "8px",
                    fontWeight: 600,
                    fontFamily: "var(--font-work-sans), system-ui, sans-serif",
                    fill: node.primary ? "white" : "#000000",
                    fillOpacity: isActive ? 1 : 0.3,
                  }}
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + 9}
                  textAnchor="middle"
                  style={{
                    fontSize: "7px",
                    fontFamily: "var(--font-dm-mono), monospace",
                    fill: node.primary ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)",
                    fillOpacity: isActive ? 1 : 0.3,
                  }}
                >
                  {node.sublabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="px-5 py-2.5 border-t border-black/10 bg-grey/50">
        <p className="font-mono text-[9px] text-black/25">
          Hover a node to highlight its connections · Weight = conversion priority &amp; strategic urgency
        </p>
      </div>
    </div>
  );
}
