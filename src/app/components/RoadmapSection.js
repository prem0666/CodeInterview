"use client";
import Link from "next/link";
import { RoadmapNodes } from "../lib/data";

const nodeTones = {
  active:    { rgb: "99, 102, 241", outline: "rgba(99,102,241,0.36)",  selectedOutline: "rgba(99,102,241,0.6)",  connector: "#6366F1", label: "Current"   },
  completed: { rgb: "34, 197, 94",  outline: "rgba(34,197,94,0.3)",    selectedOutline: "rgba(34,197,94,0.55)",  connector: "#22C55E", label: "Completed" },
  locked:    { rgb: "71, 85, 105",  outline: "rgba(71,85,105,0.28)",   selectedOutline: "rgba(100,116,139,0.4)", connector: "#475569", label: "Locked"    },
};

function getState(n) {
  if (n.active) return "active";
  if (n.completed) return "completed";
  return "locked";
}

function connectorColor(a, b) {
  if (a.active || b?.active) return nodeTones.active.connector;
  if (a.completed && b?.completed) return nodeTones.completed.connector;
  return nodeTones.locked.connector;
}

// ── Layout (all in px, fixed coordinate space) ──
const W      = 480;   // container width
const CX     = W / 2; // horizontal center
const WAVE   = 160;   // sine amplitude
const BTN_W  = 60;    // btn-class-name width
const BTN_H  = 50;    // btn-class-name height
const ROW_H  = 155;   // vertical gap between node centers
const PAD_T  = 40;    // top padding

const nodes = [...RoadmapNodes].reverse(); // level 11 → 15
const N      = nodes.length;

// node center X — fixed cycle of 4 nodes per wave, works for any N
const nx = (i) => CX + Math.sin((i / 4) * Math.PI * 2) * WAVE;
// node center Y
const ny = (i) => PAD_T + i * ROW_H;

const TOTAL_H = PAD_T + (N - 1) * ROW_H + PAD_T + 30;

export default function RoadmapSection({ activeLevel, onNodeClick }) {
  return (
    <div className="mx-auto py-6" style={{ width: W, position: "relative", height: TOTAL_H }}>

      {/* ── SVG: connectors only ── */}
      <svg
        width={W}
        height={TOTAL_H}
        className="pointer-events-none absolute inset-0"
        style={{ overflow: "visible" }}
      >
        {nodes.map((node, i) => {
          const next = nodes[i + 1];
          if (!next) return null;

          const x1 = nx(i),     y1 = ny(i);
          const x2 = nx(i + 1), y2 = ny(i + 1);
          const mid = (y1 + y2) / 2;
          // smooth S-curve: CP1 stays on x1, CP2 on x2
          const d = `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
          const color  = connectorColor(node, next);
          const locked = next.locked;

          return (
            <g key={`c${i}`}>
              {/* outer glow */}
              <path d={d} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" opacity={0.1} />
              {/* inner glow */}
              <path d={d} fill="none" stroke={color} strokeWidth={6}  strokeLinecap="round" opacity={0.2} />
              {/* main line */}
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={locked ? "5 9" : "9 6"}
                opacity={locked ? 0.35 : 1}
                className={locked ? "" : "connector-path"}
              />
            </g>
          );
        })}
      </svg>

      {/* ── HTML nodes (btn-class-name) ── */}
      {nodes.map((node, i) => {
        const state    = getState(node);
        const tone     = nodeTones[state];
        const selected = node.level === activeLevel;
        const x        = nx(i);
        const y        = ny(i);

        return (
          <div
            key={node.level}
            className="absolute flex flex-col items-center"
            style={{
              left: x - BTN_W / 2,
              top:  y - BTN_H / 2,
              width: BTN_W,
            }}
          >
            {/* glow ring behind button */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width:  BTN_W + (selected ? 28 : 18),
                height: BTN_W + (selected ? 28 : 18),
                top:    "50%",
                left:   "50%",
                transform: "translate(-50%, -54%)",
                background: `radial-gradient(circle, rgba(${tone.rgb}, ${selected ? 0.28 : 0.12}) 0%, transparent 70%)`,
              }}
            />

            <Link
              href={node.locked ? "#" : `/roadmap/${node.level}`}
              onClick={(e) => {
                if (node.locked) e.preventDefault();
                onNodeClick?.(node);
              }}
              aria-disabled={node.locked}
              data-state={state}
              className={`btn-class-name group relative flex transition-transform duration-200 ${selected ? "scale-115" : "hover:scale-105"}`}
              style={{
                "--node-color": tone.rgb,
                outline: `10px solid ${selected ? tone.selectedOutline : tone.outline}`,
                opacity: node.locked ? 0.65 : 1,
              }}
            >
              <span className="back" />
              <span className="front">{node.level}</span>

              {/* Tooltip */}
              <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-5 w-52 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0b1120]/95 px-3.5 py-3 text-left opacity-0 shadow-2xl backdrop-blur-xl transition-opacity duration-150 group-hover:opacity-100">
                <span className="block text-xs font-bold text-slate-100 mb-1">{node.label}</span>
                <span className="block text-[11px] leading-relaxed text-slate-400">{node.desc}</span>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `rgba(${tone.rgb},0.18)`, color: `rgba(${tone.rgb},1)` }}>{tone.label}</span>
                  <span className="text-[10px] font-medium text-slate-400">{node.xp}</span>
                </div>
              </span>
            </Link>

            {/* Label */}
            <span
              className="mt-8 text-[11px] font-semibold tracking-wide whitespace-nowrap"
              style={{ color: `rgba(${tone.rgb}, ${node.locked ? 0.4 : 0.85})` }}
            >
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
