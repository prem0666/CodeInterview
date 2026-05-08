"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Code2, LayoutDashboard, BookOpen, Mic, Map, Trophy,
  BarChart2, Settings, LogOut, Flame, Target, TrendingUp, CheckCircle,
} from "lucide-react";
import Particles from "../components/ui/Particle";
import Sidebar from "../components/Sidebar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",   href: "/dashboard",   active: true },
  { icon: BookOpen,        label: "Practice",    href: "/practice" },
  { icon: Mic,             label: "Mock Intv",   href: "/mock" },
  // { icon: Map,             label: "Roadmap",     href: "/roadmap" },
  { icon: Trophy,          label: "Leaderboard", href: "/leaderboard" },
  { icon: BarChart2,       label: "Analytics",   href: "/analytics" },
  { icon: Settings,        label: "Settings",    href: "/settings" },
];

const roadmapNodes = [
  { level: 15, label: "Level 15",     locked: true,                desc: "Unlock after completing Level 14",       xp: "1000 XP needed" },
  { level: 14, label: "Level 14",     locked: true,                desc: "Almost there! Keep grinding.",           xp: "720 / 1000 XP"  },
  { level: 13, label: "Binary Trees", active: true,                desc: "Learn traversals, BST, and tree DP.",    xp: "In Progress"    },
  { level: 12, label: "Recursion",    completed: true,             desc: "Mastered base cases and call stacks.",   xp: "500 XP earned"  },
  { level: 11, label: "Arrays",       completed: true,             desc: "Two pointers, sliding window, prefix sum.", xp: "400 XP earned" },
];

const weeklyData = [40, 65, 30, 80, 55, 90, 70];
const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileTab, setMobileTab]     = useState("map"); // "map" | "stats"

  const [activeLevel, setActiveLevel] = useState(
    () => roadmapNodes.find((n) => n.active)?.level ?? roadmapNodes[0]?.level
  );
  const [levelInfo2, setlevelInfo2] = useState(
    () => roadmapNodes.find((n) => n.active) ?? {}
  );

  const roadmapContainerRef = useRef(null);
  const [roadmapWidth, setRoadmapWidth] = useState(0);

  useEffect(() => {
    const el = roadmapContainerRef.current;
    if (!el) return;
    const update = () => setRoadmapWidth(el.getBoundingClientRect().width);
    update();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const waveScale = useMemo(() => {
    const maxScale = 190;
    if (!roadmapWidth) return maxScale;
    const available = roadmapWidth / 2 - 30 - 24;
    return Math.max(0, Math.min(maxScale, available));
  }, [roadmapWidth]);

  function leveldescription(level) {
    const info = roadmapNodes.find((n) => n.level === level);
    setlevelInfo2(info);
    setActiveLevel(level);
  }

  return (
    <>
      {/* ── Background particles ── */}
      <div className="fixed inset-0 bg-[#080c18] z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
          className="w-full h-full"
        />
      </div>

      {/* ── App shell ── */}
      <div className="relative z-10 h-screen text-slate-100 flex overflow-hidden font-sans">

        {/* ════════ SIDEBAR ════════ */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {/* Sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ════════ MAIN ════════ */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

          {/* ── Topbar ── */}
          <header className="shrink-0 z-30 bg-[#080c18]/90 backdrop-blur border-b border-indigo-500/20 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Hamburger */}
              <button
                className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition shrink-0"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base font-bold">Dashboard</h1>
                <p className="text-xs text-slate-400 hidden sm:block">Welcome back, John 👋</p>
              </div>
            </div>

            {/* Mobile tab switcher — hidden on lg+ */}
            <div className="flex lg:hidden items-center gap-1 bg-[#0d1225] rounded-xl p-1 border border-indigo-500/20 shrink-0">
              <button
                onClick={() => setMobileTab("map")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mobileTab === "map" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
              >Map</button>
              <button
                onClick={() => setMobileTab("stats")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mobileTab === "stats" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
              >Stats</button>
            </div>

            <Link href="/practice"
              className="shrink-0 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-500 transition shadow-[0_0_20px_rgba(99,102,241,0.35)]">
              Practice Now
            </Link>
          </header>

          {/* ── Body ── */}
          <div className="flex-1 flex overflow-hidden">

            {/* ════ CENTER: ROADMAP ════ */}
            <section className={`
              flex-1 overflow-y-auto scrollbar-hide
              relative p-4 sm:p-6
              lg:border-r border-indigo-500/10
              flex-col
              ${mobileTab === "stats" ? "hidden lg:flex" : "flex"}
            `}>
              {/* Header row */}
              <div className="flex items-center fixed  max-w-2xl w-full justify-between mb-5 gap-2">
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-bold">Coding Roadmap</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Your learning journey</p>
                </div>
                {levelInfo2.label && (
                  <div className="text-sm sm:text-base font-bold text-indigo-300 truncate shrink-0">{levelInfo2.label}</div>
                )}
                <span className="text-xs px-3 py-1.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 font-semibold whitespace-nowrap shrink-0">
                  Level {levelInfo2.level ?? 14} / 20
                </span>
              </div>

              {/* Roadmap nodes — sine wave */}
              <div
                ref={roadmapContainerRef}
                className="relative flex flex-col items-center max-w-md mx-auto w-full py-8"
              >
                {roadmapNodes.map((node, i) => {
                  const offset = Math.sin(i * 0.9) * waveScale;
                  return (
                    <div key={i} className="relative flex flex-col items-center w-full">
                      <div
                        className="transition-all duration-700"
                        style={{ transform: `translateX(${offset}px)` }}
                      >
                        <Link
                          href={node.locked ? "#" : `/roadmap/${node.level}`}
                          onClick={() => leveldescription(node.level)}
                          className="relative flex btn-class-name"
                          style={{
                            outline: `10px solid ${
                              node.active     ? "rgb(99,102,241)"  :
                              node.completed  ? "rgb(16,185,129)"  :
                                               "rgb(234,88,12)"
                            }`,
                            pointerEvents: node.locked ? "none" : "auto",
                            opacity: node.locked ? 0.5 : 1,
                          }}
                        >
                          <span className="back" />
                          <span className={`front ${
                            node.active    ? "bg-indigo-500" :
                            node.completed ? "bg-green-500"  :
                                             "bg-amber-500"
                          }`}>
                            {node.level}
                          </span>
                        </Link>
                      </div>
                      {/* Spacer between nodes */}
                      {i < roadmapNodes.length - 1 && (
                        <div className="relative h-16 sm:h-20 w-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ════ RIGHT: ANALYTICS ════ */}
            <aside className={`
              overflow-y-auto scrollbar-hide
              bg-[#0a0e1a] border-indigo-500/10 p-4 sm:p-5
              flex-col gap-4
              w-full lg:w-72 lg:shrink-0 lg:border-l
              ${mobileTab === "stats" ? "flex" : "hidden lg:flex"}
            `}>
              <h2 className="text-base font-bold shrink-0">Analytics</h2>

              {/* On md screens show 2-col grid, on lg back to 1-col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">

                {/* Global Rank */}
                <div className="p-4 rounded-2xl bg-[#0d1225] border border-indigo-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs text-slate-400">Global Rank</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300">Top 1%</span>
                  </div>
                  <div className="text-3xl font-extrabold text-indigo-300">#214</div>
                  <div className="text-xs text-green-400 mt-1">↑ 12 positions this week</div>
                </div>

                {/* Streak */}
                <div className="p-4 rounded-2xl bg-[#0d1225] border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-slate-400">Current Streak</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-extrabold text-orange-300">14</span>
                    <span className="text-sm text-orange-400 mb-1">days 🔥</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className={`flex-1 h-1.5 rounded-full ${i < 6 ? "bg-orange-400" : "bg-slate-700"}`} />
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Last 7 days</div>
                </div>

                {/* Problems Solved */}
                <div className="p-4 rounded-2xl bg-[#0d1225] border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-slate-400">Problems Solved</span>
                  </div>
                  <div className="text-3xl font-extrabold text-green-300">128</div>
                  <div className="flex gap-1.5 mt-3">
                    {[["Easy","60","bg-green-500"],["Med","52","bg-yellow-500"],["Hard","16","bg-red-500"]].map(([l,v,c]) => (
                      <div key={l} className="flex-1 rounded-xl bg-slate-800/60 p-2 text-center">
                        <div className={`text-sm font-bold ${c.replace("bg-","text-")}`}>{v}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accuracy */}
                <div className="p-4 rounded-2xl bg-[#0d1225] border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-slate-400">Accuracy</span>
                    </div>
                    <span className="text-2xl font-extrabold text-cyan-300">87%</span>
                  </div>
                  <div className="flex justify-center my-2">
                    <div className="w-20 h-20 rounded-full"
                      style={{ background: `conic-gradient(#22d3ee ${87*3.6}deg, #1e293b 0deg)`, padding: "3px" }}>
                      <div className="w-full h-full rounded-full bg-[#0d1225] flex items-center justify-center text-sm font-bold text-cyan-300">87%</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 text-center">Acceptance rate</div>
                </div>

                {/* Next Goal */}
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 sm:col-span-2 lg:col-span-1">
                  <div className="text-xs text-indigo-300 font-semibold mb-1">🎯 Next Goal</div>
                  <div className="text-sm font-bold text-slate-100">Solve 5 DP Problems</div>
                  <div className="flex justify-between text-xs text-slate-400 mt-2 mb-1.5">
                    <span>Progress</span><span>2 / 5</span>
                  </div>
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div className="h-full w-[40%] rounded-full bg-linear-to-r from-indigo-500 to-cyan-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                  </div>
                </div>

                {/* Weekly Graph */}
                <div className="p-4 rounded-2xl bg-[#0d1225] border border-indigo-500/20 sm:col-span-2 lg:col-span-1">
                  <div className="text-xs text-slate-400 font-medium mb-3">📊 Weekly Activity</div>
                  <div className="flex items-end gap-1.5 h-20">
                    {weeklyData.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-lg bg-linear-to-t from-indigo-600 to-cyan-400 opacity-75 hover:opacity-100 transition-all"
                          style={{ height: `${h}%` }} />
                        <span className="text-[9px] text-slate-500">{days[i]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                    <span>This week</span>
                    <span className="text-green-400">+23% vs last</span>
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
