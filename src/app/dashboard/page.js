"use client";

import { useState } from "react";
import { CheckCircle, Flame, Target, TrendingUp, Trophy } from "lucide-react";
import Particles from "../components/ui/Particle";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import RoadmapSection from "../components/RoadmapSection";
import { RoadmapNodes } from "../lib/data";

const weeklyData = [40, 65, 30, 80, 55, 90, 70];
const days = ["M", "T", "W", "T", "F", "S", "S"];
const currentXp = 1420;
const targetXp = 2000;
const xpProgress = Math.round((currentXp / targetXp) * 100);

const analyticsCardClass =
  "p-4 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-[0_14px_45px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 hover:border-indigo-400/30";

const achievements = [
  {
    title: "First 100 Problems",
    value: "Unlocked",
    icon: Trophy,
    accent: "text-amber-300",
    border: "border-amber-500/20",
    bg: "bg-amber-500/10",
  },
  {
    title: "14 Day Streak",
    value: "Active",
    icon: Flame,
    accent: "text-orange-300",
    border: "border-orange-500/20",
    bg: "bg-orange-500/10",
  },
  {
    title: "Binary Tree Master",
    value: "In progress",
    icon: CheckCircle,
    accent: "text-emerald-300",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/10",
  },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileTab] = useState("map");

  const [activeLevel, setActiveLevel] = useState(
    () => RoadmapNodes.find((n) => n.active)?.level ?? RoadmapNodes[0]?.level,
  );
  const [levelInfo, setLevelInfo] = useState(
    () => RoadmapNodes.find((n) => n.active) ?? {},
  );

  function handleNodeClick(node) {
    setLevelInfo(node);
    setActiveLevel(node.level);
  }

  return (
    <>
      <div className="fixed inset-0 z-0 bg-[#020617]">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={24}
          particleSpread={9}
          speed={0.06}
          particleBaseSize={45}
          moveParticlesOnHover
          particleHoverFactor={0.45}
          alphaParticles
          disableRotation={false}
          pixelRatio={1}
          className="h-full w-full opacity-25"
        />
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden text-slate-100 font-sans">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />

        <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
          <TopNav onMenuClick={() => setSidebarOpen(true)} />

          <div className="flex flex-1 overflow-hidden">
            <section
              className={`
                relative flex-1 overflow-y-auto scrollbar-hide
                p-4 sm:p-6 lg:border-r border-white/[0.06]
                flex-col
                ${mobileTab === "stats" ? "hidden lg:flex" : "flex"}
              `}
            >
              <div className="sticky top-0 z-20 -mx-4 -mt-4 mb-5 border-b border-white/[0.06] bg-[#020617]/85 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:-mt-6 sm:px-6">
                <div className="mx-auto max-w-2xl">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                    
                      <h2 className="mt-1 text-xl font-bold text-slate-50 sm:text-2xl">
                        Continue your {levelInfo.label ?? "Coding"} journey
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {levelInfo.desc ?? "Your learning journey"}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-row items-center gap-2 sm:flex-col sm:items-end">
                      <span className="rounded-full border border-indigo-500/25 bg-indigo-500/15 px-3 py-1.5 text-xs font-semibold text-indigo-200">
                        Level {levelInfo.level ?? 13} / 20
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {currentXp} / {targetXp} XP
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800/80">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_18px_rgba(99,102,241,0.45)]"
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              <RoadmapSection activeLevel={activeLevel} onNodeClick={handleNodeClick} />

              <div className="mx-auto grid w-full max-w-2xl  fixed bottom-0 grid-cols-1 gap-3 pb-6 sm:grid-cols-3">
                {achievements.map(
                  ({ title, value, icon: Icon, accent, border, bg }) => (
                    <div
                      key={title}
                      className={`rounded-lg border ${border} ${bg} p-3 backdrop-blur-xl  transition duration-200 hover:-translate-y-0.5`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${accent}`} />
                        <span className="truncate text-xs font-bold text-slate-100">
                          {title}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] font-medium text-slate-400">
                        {value}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>

            <aside
              className={`
                w-full overflow-y-auto scrollbar-hide
                bg-[#020617]/80 border-white/[0.06] p-4 sm:p-5
                flex-col gap-4 backdrop-blur-xl
                lg:w-72 lg:shrink-0 lg:border-l
                ${mobileTab === "stats" ? "flex" : "hidden lg:flex"}
              `}
            >
              <h2 className="shrink-0 text-base font-bold">Analytics</h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className={analyticsCardClass}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-indigo-400" />
                      <span className="text-xs text-slate-400">
                        Global Rank
                      </span>
                    </div>
                    <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] text-indigo-300">
                      Top 1%
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-indigo-300">
                    #214
                  </div>
                  <div className="mt-1 text-xs text-emerald-400">
                    Up 12 positions this week
                  </div>
                </div>

                <div className={analyticsCardClass}>
                  <div className="mb-2 flex items-center gap-2">
                    <Flame className="h-4 w-4 text-amber-400" />
                    <span className="text-xs text-slate-400">
                      Current Streak
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-extrabold text-amber-300">
                      14
                    </span>
                    <span className="mb-1 text-sm text-amber-400">days</span>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div
                        key={index}
                        className={`h-1.5 flex-1 rounded-full ${index < 6 ? "bg-amber-400" : "bg-slate-700"}`}
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">
                    Last 7 days
                  </div>
                </div>

                <div className={analyticsCardClass}>
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs text-slate-400">
                      Problems Solved
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-300">
                    128
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    {[
                      ["Easy", "60", "text-emerald-300"],
                      ["Med", "52", "text-amber-300"],
                      ["Hard", "16", "text-red-300"],
                    ].map(([label, value, color]) => (
                      <div
                        key={label}
                        className="flex-1 rounded-lg bg-slate-900/70 p-2 text-center"
                      >
                        <div className={`text-sm font-bold ${color}`}>
                          {value}
                        </div>
                        <div className="mt-0.5 text-[10px] text-slate-500">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={analyticsCardClass}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-cyan-400" />
                      <span className="text-xs text-slate-400">Accuracy</span>
                    </div>
                    <span className="text-2xl font-extrabold text-cyan-300">
                      87%
                    </span>
                  </div>
                  <div className="my-2 flex justify-center">
                    <div
                      className="h-20 w-20 rounded-full p-[3px]"
                      style={{
                        background: `conic-gradient(#22d3ee ${87 * 3.6}deg, #1e293b 0deg)`,
                      }}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0f172a] text-sm font-bold text-cyan-300">
                        87%
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-xs text-slate-500">
                    Acceptance rate
                  </div>
                </div>

                <div className="rounded-lg border border-indigo-500/25 bg-indigo-500/10 p-4 backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-indigo-400/40 sm:col-span-2 lg:col-span-1">
                  <div className="mb-1 text-xs font-semibold text-indigo-300">
                    Next Goal
                  </div>
                  <div className="text-sm font-bold text-slate-100">
                    Solve 5 DP Problems
                  </div>
                  <div className="mb-1.5 mt-2 flex justify-between text-xs text-slate-400">
                    <span>Progress</span>
                    <span>2 / 5</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800/80">
                    <div className="h-full w-[40%] rounded-full bg-linear-to-r from-indigo-500 to-cyan-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                  </div>
                </div>

                <div
                  className={`${analyticsCardClass} sm:col-span-2 lg:col-span-1`}
                >
                  <div className="mb-3 text-xs font-medium text-slate-400">
                    Weekly Activity
                  </div>
                  <div className="flex h-20 items-end gap-1.5">
                    {weeklyData.map((height, index) => (
                      <div
                        key={`${days[index]}-${index}`}
                        className="flex flex-1 flex-col items-center gap-1"
                      >
                        <div
                          className="w-full rounded-t-lg bg-linear-to-t from-indigo-600 to-cyan-400 opacity-75 transition-all hover:opacity-100"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[9px] text-slate-500">
                          {days[index]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] text-slate-500">
                    <span>This week</span>
                    <span className="text-emerald-400">+23% vs last</span>
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
