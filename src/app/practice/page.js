"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, CheckCircle, Hash } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { PROBLEMS, LEVELS } from "../lib/data";
import Image from "next/image";

// ── Difficulty bar (HTB style) ──
function DiffBar({ difficulty }) {
  const bars = 10;
  const filled =
    difficulty === "Easy"   ? 3 :
    difficulty === "Medium" ? 6 : 9;
  const color =
    difficulty === "Easy"   ? "#a3e635" :
    difficulty === "Medium" ? "#facc15" : "#f87171";
  return (
    <div className="flex items-end gap-0.75 h-5">
      {Array.from({ length: bars }).map((_, i) => {
        const active = i < filled;
        const h = 6 + (i / (bars - 1)) * 14; // 6px → 20px height
        return (
          <div
            key={i}
            style={{
              width: 4,
              height: h,
              borderRadius: 2,
              background: active ? color : "rgba(255,255,255,0.1)",
              boxShadow: active ? `0 0 4px ${color}88` : "none",
            }}
          />
        );
      })}
    </div>
  );
}

// ── Topic icon avatar ──
function TopicAvatar({ topic, id }) {
  const colors = {
    "Arrays":       { bg: "#0e7490", text: "#22d3ee", emoji: "📊" },
    "Recursion":    { bg: "#065f46", text: "#34d399", emoji: "🔄" },
    "Binary Trees": { bg: "#4c1d95", text: "#a78bfa", emoji: "🌳" },
  };
  const c = colors[topic] ?? { bg: "#1e293b", text: "#94a3b8", emoji: "💡" };
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 border-2"
      style={{ background: c.bg, borderColor: c.text + "44" }}>
      {c.emoji}
    </div>
  );
}

const TIERS = [
  { key: "all",   label: "All Problems" },
  { key: "11",    label: "Tier 1 · Arrays" },
  { key: "12",    label: "Tier 2 · Recursion" },
  { key: "13",    label: "Tier 3 · Binary Trees" },
];

const DIFFS = ["All", "Easy", "Medium", "Hard"];

export default function PracticePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tier,   setTier]   = useState("all");
  const [diff,   setDiff]   = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => PROBLEMS.filter(p => {
    if (tier !== "all" && p.level !== Number(tier)) return false;
    if (diff !== "All" && p.difficulty !== diff)    return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [tier, diff, search]);

  const solved = PROBLEMS.filter(p => p.solved).length;
  const total  = PROBLEMS.length;
  const pct    = Math.round((solved / total) * 100);

  // current tier info
  const tierLevel = LEVELS.find(l => l.level === Number(tier));

  return (
    <div className="h-screen bg-[#0f1117] text-slate-100 flex overflow-hidden font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Topbar ── */}
        <header className="shrink-0 bg-[#0f1117] border-b border-white/5 px-4 sm:px-6 py-3 flex items-center gap-3">
          <button className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition shrink-0"
            onClick={() => setSidebarOpen(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search Problems..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#1a1d27] border border-white/10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto shrink-0">
            <Link href="/dashboard"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition">
              Dashboard
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide">

          {/* ── Hero section ── */}
          <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-white/5 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0f1117 0%, #1a1040 40%, #0c2a1a 70%, #0f1117 100%)",
            }}
          >
            {/* Glow blobs */}
            <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
            <div className="absolute top-0 right-20 w-56 h-56 rounded-full opacity-15 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #22d3ee, transparent 70%)" }} />
            <div className="absolute bottom-0 left-1/2 w-64 h-32 rounded-full opacity-10 blur-2xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #34d399, transparent 70%)" }} />
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 max-w-5xl">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Master DSA Problems
                </h1>
                <p className="text-sm text-slate-400 max-w-xl leading-relaxed mb-5">
                  Practice curated coding problems organized by topic and difficulty.
                  Each tier builds on the previous — start from Arrays and work your way up.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> Beginner Friendly</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span> Structured Learning</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span> Interview Ready</span>
                </div>
              </div>
              {/* Stats */}
              <div className="flex gap-4 shrink-0">
                
                <Image src="/header-server.svg" alt="Stats" width={140} height={80} className="object-contain" />
              </div>
            </div>

            {/* Progress bar (HTB style) */}
            <div className="mt-6 max-w-5xl">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Progress</span>
                <span>{pct}%</span>
              </div>
              <div className="relative h-3 rounded-full overflow-hidden bg-[#1a1d27] border border-white/5">
                {/* Striped background */}
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.15) 4px, rgba(255,255,255,0.15) 8px)" }} />
                {/* Fill */}
                <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: "linear-gradient(90deg, #6366f1, #22d3ee)", boxShadow: "0 0 8px rgba(99,102,241,0.6)" }} />
                {/* Dot */}
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-indigo-500 shadow-lg transition-all duration-700"
                  style={{ left: `calc(${pct}% - 6px)` }} />
              </div>
              <div className="text-xs text-slate-600 mt-1">{solved} / {total} problems solved</div>
            </div>
          </div>

          {/* ── Tier tabs ── */}
          <div className="px-6 sm:px-8 border-b border-white/5">
            <div className="flex gap-0 overflow-x-auto scrollbar-hide">
              {TIERS.map(t => (
                <button key={t.key} onClick={() => setTier(t.key)}
                  className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    tier === t.key
                      ? "border-green-400 text-green-400"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Tier description ── */}
          {tier !== "all" && tierLevel && (
            <div className="px-6 sm:px-8 py-5 border-b border-white/5 bg-[#0d1117]">
              <div className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-bold text-slate-200 mb-2">About {tierLevel.label}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{tierLevel.desc}</p>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200 mb-2">Topics you&apos;ll cover</div>
                  <ul className="space-y-1">
                    {tierLevel.topics.map(t => (
                      <li key={t} className="text-sm text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"></span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ── Difficulty filter pills ── */}
          <div className="px-6 sm:px-8 py-4 flex items-center gap-3 border-b border-white/5">
            <span className="text-xs text-slate-500 shrink-0">Difficulty:</span>
            <div className="flex gap-2 flex-wrap">
              {DIFFS.map(d => (
                <button key={d} onClick={() => setDiff(d)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                    diff === d
                      ? d === "Easy"   ? "bg-green-400/15 text-green-400 border-green-400/40"
                      : d === "Medium" ? "bg-yellow-400/15 text-yellow-400 border-yellow-400/40"
                      : d === "Hard"   ? "bg-red-400/15 text-red-400 border-red-400/40"
                      :                  "bg-indigo-600 text-white border-indigo-500"
                      : "bg-transparent text-slate-500 border-white/10 hover:text-slate-300 hover:border-white/20"
                  }`}>
                  {d}
                </button>
              ))}
            </div>
            <span className="ml-auto text-xs text-slate-600">{filtered.length} problems</span>
          </div>

          {/* ── Table ── */}
          <div className="px-4 sm:px-6 py-4 max-w-6xl">
            {/* Table header */}
            <div className="grid items-center gap-4 px-4 py-2 mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider"
              style={{ gridTemplateColumns: "2.5rem 1fr 160px 100px 80px 80px 90px" }}>
              <span></span>
              <span>Problem</span>
              <span className="hidden md:block">User-Rated Difficulty</span>
              <span className="hidden sm:block">Topic</span>
              <span>Status</span>
              <span className="hidden sm:block">Acc.</span>
              <span className="hidden md:block text-right">Solves</span>
            </div>

            {/* Rows */}
            <div className="space-y-1">
              {filtered.length === 0 ? (
                <div className="py-20 text-center text-slate-600 text-sm">No problems found</div>
              ) : (
                filtered.map(p => (
                  <Link key={p.id} href={`/practice/${p.id}`}
                    className="grid items-center gap-4 px-4 py-3.5 rounded-xl bg-[#13161f] border border-white/4 hover:bg-[#1a1d2e] hover:border-indigo-500/20 transition-all group cursor-pointer"
                    style={{ gridTemplateColumns: "2.5rem 1fr 160px 100px 80px 80px 90px" }}>

                    {/* Avatar */}
                    <TopicAvatar topic={p.topic} id={p.id} />

                    {/* Title + subtitle */}
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition truncate">
                        {p.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span className={`font-medium ${
                          p.difficulty === "Easy"   ? "text-green-400" :
                          p.difficulty === "Medium" ? "text-yellow-400" : "text-red-400"
                        }`}>{p.difficulty}</span>
                        <span>·</span>
                        <span>{p.topic}</span>
                      </div>
                    </div>

                    {/* Difficulty bar */}
                    <div className="hidden md:flex items-center">
                      <DiffBar difficulty={p.difficulty} />
                    </div>

                    {/* Topic badge */}
                    <div className="hidden sm:block">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10 whitespace-nowrap">
                        {p.topic.split(" ")[0]}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      {p.solved ? (
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                          <span className="text-xs text-green-400 hidden sm:inline">Done</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-600">—</span>
                      )}
                    </div>

                    {/* Acceptance */}
                    <div className="hidden sm:block text-xs text-slate-400">{p.acceptance}%</div>

                    {/* Solves (fake) */}
                    <div className="hidden md:flex items-center justify-end gap-1 text-xs text-slate-500">
                      <Hash className="w-3 h-3" />
                      {(p.id * 7341 + 12345).toLocaleString()}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
