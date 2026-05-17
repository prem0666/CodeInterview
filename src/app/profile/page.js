"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Particles from "../components/ui/Particle";
import TopNav from "../components/TopNav";
import { Flame, TrendingUp, ExternalLink, ChevronLeft, ChevronRight, Users, BookOpen, Zap } from "lucide-react";

const resources = [
  { icon: Users,    title: "Discord Community", desc: "Join the CodePrep community to discuss, share, and grow together.",        color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { icon: BookOpen, title: "CodePrep Blog",      desc: "Explore insights and stories linking real coding incidents to skills.",     color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20"  },
  { icon: Zap,      title: "Resource Hub",       desc: "Access quick guides and templates to boost your coding efficiency.",       color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
];

function RankIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_18px_rgba(148,163,184,0.5)]">
      <polygon points="50,2 95,26 95,74 50,98 5,74 5,26" fill="none" stroke="#64748b" strokeWidth="1.5" opacity="0.5" />
      <polygon points="50,10 87,30 87,70 50,90 13,70 13,30" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.4" />
      <polygon points="50,20 78,36 78,64 50,80 22,64 22,36" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" opacity="0.6" />
      <polygon points="50,2 62,26 50,20 38,26" fill="#94a3b8" opacity="0.9" />
      <polygon points="5,26 28,36 22,36 13,30" fill="#64748b" opacity="0.7" />
      <polygon points="95,26 72,36 78,36 87,30" fill="#64748b" opacity="0.7" />
      <polygon points="50,98 62,74 50,80 38,74" fill="#475569" opacity="0.8" />
      <polygon points="50,32 66,44 60,62 40,62 34,44" fill="#1e3a5f" stroke="#7dd3fc" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

function CubeBadge() {
  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-900/20" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <polygon points="50,3 95,27 95,73 50,97 5,73 5,27" fill="none" stroke="#4ade80" strokeWidth="1.2" opacity="0.35" />
        <polygon points="50,10 88,31 88,69 50,90 12,69 12,31" fill="none" stroke="#22c55e" strokeWidth="0.8" opacity="0.2" />
      </svg>
      <div className="relative z-10 w-13 h-13 rounded-xl bg-gradient-to-br from-green-400/20 to-green-900/40 border border-green-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.4)] p-3">
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#4ade80" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-[#080c18] z-0">
        <Particles particleColors={["#ffffff"]} particleCount={150} particleSpread={10}
          speed={0.1} particleBaseSize={100} moveParticlesOnHover alphaParticles={false}
          disableRotation={false} pixelRatio={1} className="w-full h-full" />
      </div>

      <div className="relative z-10 h-screen text-slate-100 flex overflow-hidden font-sans">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(p => !p)} />

        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <TopNav onMenuClick={() => setSidebarOpen(true)} />

          <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#080c18]">
            <div className="max-w-5xl mx-auto px-4 py-5 space-y-4">

              {/* Username header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-400/30 to-green-900/50 border border-green-400/30 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#4ade80" strokeWidth="1.5">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-white">prem0666</span>
                      <span className="text-xs text-slate-500">#1N</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full">Pro</span>
                      <span className="text-[10px] bg-green-500/20 border border-green-500/30 text-green-300 px-2 py-0.5 rounded-full">Beginner</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" /> View Profile
                </button>
              </div>

              {/* Two-column layout */}
              <div className="flex gap-4 items-start">

                {/* LEFT MAIN */}
                <div className="flex-1 min-w-0 space-y-3">

                  {/* Card A + Card B — taller */}
                  <div className="grid grid-cols-2 gap-3">

                    {/* Card A */}
                    <div className="rounded-xl bg-[#0d1225] border border-white/5 overflow-hidden flex flex-col min-h-[300px]">
                      <div className="flex flex-col items-center justify-center flex-1 relative p-8"
                        style={{
                          backgroundImage: "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
                          backgroundSize: "28px 28px"
                        }}>
                        <RankIcon />
                        <div className="mt-4 flex items-baseline gap-1.5">
                          <span className="text-slate-400 text-sm">Lvl</span>
                          <span className="text-4xl font-extrabold text-white">1</span>
                        </div>
                      </div>
                      <div className="px-5 py-3 border-t border-white/5">
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
                          <span className="flex items-center gap-1">
                            Level <span className="bg-indigo-600 text-white text-[8px] px-1.5 py-0.5 rounded font-bold ml-1">XP</span>
                          </span>
                          <span>0/150</span>
                        </div>
                        <div className="h-1.5 bg-[#1a2035] rounded-full overflow-hidden">
                          <div className="h-full w-[2%] rounded-full bg-gradient-to-r from-green-500 to-green-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-white/5 border-t border-white/5">
                        {[{ top: "Beginner", bot: "HTB Rank" }, { top: "◆ ◇ ◇", bot: "Grade" }].map(({ top, bot }) => (
                          <div key={bot} className="px-5 py-3.5">
                            <div className="text-sm font-bold text-slate-100">{top}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{bot}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card B */}
                    <div className="rounded-xl bg-[#0d1225] border border-white/5 overflow-hidden flex flex-col min-h-[300px]">
                      <div className="flex flex-col items-center justify-center flex-1 relative p-8"
                        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(88,28,135,0.3) 0%, transparent 70%)" }}>
                        <div className="flex items-center gap-2 mb-5 text-xs text-slate-300 font-medium">
                          <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                          Open Beta Season
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <CubeBadge />
                        <div className="mt-4 text-[9px] uppercase tracking-[0.18em] text-slate-500 bg-[#1a2035] border border-white/10 px-3 py-1 rounded-full">
                          Unranked
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                          # <span className="inline-block w-10 h-px bg-slate-600 align-middle ml-0.5" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-white/5 border-t border-white/5">
                        {[{ top: "—", bot: "Points" }, { top: "0/26", bot: "Flags" }].map(({ top, bot }) => (
                          <div key={bot} className="px-5 py-3.5">
                            <div className="text-sm font-bold text-slate-100">{top}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{bot}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Latest News — cinematic banner */}
                  <div className="rounded-xl overflow-hidden border border-white/5 relative group cursor-pointer" style={{ minHeight: "280px" }}>

                    {/* Base dark bg */}
                    <div className="absolute inset-0 bg-[#060a14]" />

                    {/* Left photo collage */}
                    <div className="absolute left-0 top-0 bottom-0 w-48 z-[5]">
                      <div className="absolute inset-0 flex flex-col">
                        <div className="flex-1" style={{ background: "linear-gradient(135deg, #0c1830 0%, #1a2e50 60%, #0a1525 100%)" }}>
                          <div className="w-full h-full relative overflow-hidden">
                            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(30,70,140,0.7) 0%, transparent 65%)" }} />
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-5xl select-none" style={{ filter: "brightness(0.5) saturate(0.3)" }}>👩</div>
                          </div>
                        </div>
                        <div className="flex-1" style={{ background: "linear-gradient(135deg, #180d28 0%, #2d1848 60%, #150a20 100%)" }}>
                          <div className="w-full h-full relative overflow-hidden">
                            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(80,20,130,0.6) 0%, transparent 65%)" }} />
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-5xl select-none" style={{ filter: "brightness(0.4) saturate(0.2)" }}>👨</div>
                          </div>
                        </div>
                      </div>
                      {/* fade right */}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 40%, #060a14 100%)" }} />
                    </div>

                    {/* Right photo collage */}
                    <div className="absolute right-0 top-0 bottom-0 w-48 z-[5]">
                      <div className="absolute inset-0 flex flex-col">
                        <div className="flex-1" style={{ background: "linear-gradient(225deg, #0d1e28 0%, #1a3040 60%, #0a1520 100%)" }}>
                          <div className="w-full h-full relative overflow-hidden">
                            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(20,80,110,0.7) 0%, transparent 65%)" }} />
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-5xl select-none" style={{ filter: "brightness(0.45) saturate(0.25)" }}>🧑</div>
                          </div>
                        </div>
                        <div className="flex-1" style={{ background: "linear-gradient(225deg, #0a1810 0%, #162a18 60%, #0a1510 100%)" }}>
                          <div className="w-full h-full relative overflow-hidden">
                            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 60%, rgba(20,90,30,0.6) 0%, transparent 65%)" }} />
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-5xl select-none" style={{ filter: "brightness(0.4) saturate(0.2)" }}>👨</div>
                          </div>
                        </div>
                      </div>
                      {/* fade left */}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to left, transparent 40%, #060a14 100%)" }} />
                    </div>

                    {/* Green geometric SVG lines */}
                    <svg className="absolute inset-0 w-full h-full z-[6]" viewBox="0 0 700 280" preserveAspectRatio="none">
                      <polyline points="0,90 55,90 85,55 125,55" fill="none" stroke="#84cc16" strokeWidth="1.5" opacity="0.65" />
                      <polyline points="0,180 45,180 75,215 115,215" fill="none" stroke="#84cc16" strokeWidth="1.5" opacity="0.65" />
                      <polyline points="700,70 645,70 615,105 575,105" fill="none" stroke="#84cc16" strokeWidth="1.5" opacity="0.65" />
                      <polyline points="700,200 650,200 620,165 580,165" fill="none" stroke="#84cc16" strokeWidth="1.5" opacity="0.65" />
                      <polygon points="32,140 58,112 84,140 58,168" fill="none" stroke="#84cc16" strokeWidth="1" opacity="0.45" />
                      <polygon points="616,130 642,102 668,130 642,158" fill="none" stroke="#84cc16" strokeWidth="1" opacity="0.45" />
                    </svg>

                    {/* Center content */}
                    <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-52 py-10" style={{ minHeight: "280px" }}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded bg-green-400/20 border border-green-400/40 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#4ade80" strokeWidth="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-white tracking-[0.2em] uppercase">CodePrep</span>
                      </div>
                      <div className="text-3xl font-black text-white leading-tight tracking-wide uppercase mb-2">
                        Global Coding Skills<br />Benchmark 2026
                      </div>
                      <div className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#84cc16" }}>
                        Project Nightfall
                      </div>
                      <div className="text-xs text-slate-400 mb-5">15–20 May 2026</div>
                      <button
                        className="px-6 py-2.5 rounded-lg font-bold text-sm text-black transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(132,204,22,0.55)]"
                        style={{ background: "#84cc16" }}>
                        Join the CTF for free
                      </button>
                    </div>

                    {/* Hover border glow */}
                    <div className="absolute inset-0 z-30 rounded-xl border border-transparent group-hover:border-green-400/30 transition-all duration-300 pointer-events-none" />
                  </div>

                </div>

                {/* RIGHT SIDEBAR */}
                <div className="w-56 shrink-0 space-y-3">

                  {/* Weekly Streak */}
                  <div className="rounded-xl bg-[#0d1225] border border-white/5 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-200">Weekly Streak</span>
                      <span className="text-[10px] text-slate-500 cursor-help">ℹ</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="w-5 h-5 text-orange-400 shrink-0" />
                      <span className="text-xl font-extrabold text-white">0 weeks</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                      <span>Weekly</span><span>0/365</span>
                    </div>
                    <div className="h-1 bg-[#1a2035] rounded-full overflow-hidden mb-3">
                      <div className="h-full w-0 rounded-full bg-indigo-500" />
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      {["🔥","⚡","💎","🏆"].map((ic, i) => (
                        <div key={i} className="w-9 h-9 rounded-lg bg-[#1a2035] border border-white/5 flex items-center justify-center text-base opacity-35">
                          {ic}
                        </div>
                      ))}
                    </div>
                    <div className="h-px bg-white/5 my-3" />
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <TrendingUp className="w-3 h-3 text-slate-500" />
                      Personal best: 0 weeks
                    </div>
                  </div>

                  {/* About */}
                  <div className="rounded-xl bg-[#0d1225] border border-white/5 p-4">
                    <div className="text-xs font-bold text-slate-200 mb-3">About</div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                      {[
                        ["Joined Date", "May, 2026"],
                        ["Country",     "India"    ],
                        ["Respects",    "0"        ],
                        ["Respected",   "0"        ],
                        ["Followers",   "0"        ],
                        ["Following",   "0"        ],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <div className="text-[9px] text-slate-500">{k}</div>
                          <div className="text-xs font-bold text-slate-100 mt-0.5">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources — clean, no inner bg */}
                  <div className="rounded-xl bg-[#0d1225] border border-white/5 p-4">
                    <div className="text-xs font-bold text-slate-200 mb-3">Resources</div>
                    <div className="space-y-0">
                      {resources.map(({ icon: Icon, title, desc, color, bg }, i) => (
                        <div key={title}>
                          <div className="flex items-start gap-3 py-3 cursor-pointer group transition-all duration-150 hover:translate-x-0.5">
                            <div className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center ${bg} ${color} transition group-hover:scale-110`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-100 group-hover:text-white transition">{title}</div>
                              <div className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{desc}</div>
                            </div>
                          </div>
                          {i < resources.length - 1 && <div className="h-px bg-white/5" />}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
