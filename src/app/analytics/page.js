"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Particles from "../components/ui/Particle";
import TopNav from "../components/TopNav";
import {
  Flame, TrendingUp, Shield, Swords, FlaskConical,
  Flag, ChevronLeft, ChevronRight, LayoutGrid,
} from "lucide-react";

function RankIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_16px_rgba(148,163,184,0.5)]">
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
      <div className="absolute inset-0 rounded-xl bg-linear-to-br from-green-500/10 to-emerald-900/20" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <polygon points="50,3 95,27 95,73 50,97 5,73 5,27" fill="none" stroke="#4ade80" strokeWidth="1.2" opacity="0.35" />
        <polygon points="50,10 88,31 88,69 50,90 12,69 12,31" fill="none" stroke="#22c55e" strokeWidth="0.8" opacity="0.2" />
      </svg>
      <div className="relative z-10 w-12 h-12 rounded-lg bg-linear-to-br from-green-400/20 to-green-900/40 border border-green-400/40 flex items-center justify-center shadow-[0_0_16px_rgba(74,222,128,0.4)]">
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#4ade80" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>
    </div>
  );
}

function ConcentricChart() {
  const cx = 90, cy = 90;
  return (
    <svg viewBox="0 0 180 180" className="w-full h-full">
      {[70, 56, 42, 28, 14].map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth="1.5" />
      ))}
      <circle cx={cx} cy={cy} r={5} fill="#334155" />
      <line x1={cx} y1={cy} x2={cx} y2={cy - 65} stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx - 3} y2={cy - 42} stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + 3} y2={cy - 28} stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const TABS = ["Profile", "Activity", "Badges", "Published Content"];

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const [chartFilter, setChartFilter] = useState("1M");

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

          {/* Page body */}
          <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#080c18]">
            <div className="max-w-6xl mx-auto px-4 py-5">

              {/* Tabs */}
              <div className="flex gap-0 border-b border-white/5 mb-5 overflow-x-auto scrollbar-hide">
                {TABS.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`shrink-0 px-4 py-2.5 text-xs font-semibold transition-all relative
                      ${activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Two-column layout */}
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-start">

                {/* ══ LEFT / MAIN CONTENT ══ */}
                <div className="w-full flex-1 min-w-0 space-y-3">

                  {/* Card A + Card B side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    {/* Card A: Rank icon + Lvl + XP bar + Beginner + Grade */}
                    <div className="rounded-xl bg-[#0d1225] border border-white/5 overflow-hidden flex flex-col">
                      {/* rank icon + lvl */}
                      <div className="flex flex-col items-center justify-center p-6 flex-1 relative"
                        style={{
                          backgroundImage: "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
                          backgroundSize: "28px 28px"
                        }}>
                        <RankIcon />
                        <div className="mt-3 flex items-baseline gap-1.5">
                          <span className="text-slate-400 text-xs">Lvl</span>
                          <span className="text-3xl font-extrabold text-white">1</span>
                        </div>
                      </div>
                      {/* XP bar */}
                      <div className="px-4 py-2.5 border-t border-white/5">
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
                          <span className="flex items-center gap-1">
                            Level
                            <span className="bg-indigo-600 text-white text-[8px] px-1.5 py-0.5 rounded font-bold ml-1">XP</span>
                          </span>
                          <span>0/150</span>
                        </div>
                        <div className="h-1.5 bg-[#1a2035] rounded-full overflow-hidden">
                          <div className="h-full w-[2%] rounded-full bg-linear-to-r from-green-500 to-green-400" />
                        </div>
                      </div>
                      {/* Beginner + Grade */}
                      <div className="grid grid-cols-2 divide-x divide-white/5 border-t border-white/5">
                        {[
                          { top: "Beginner", bot: "HTB Rank" },
                          { top: "◆ ◇ ◇",   bot: "Grade"    },
                        ].map(({ top, bot }) => (
                          <div key={bot} className="px-4 py-3">
                            <div className="text-sm font-bold text-slate-100">{top}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{bot}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card B: Season + Cube + Unranked + Points + Flags */}
                    <div className="rounded-xl bg-[#0d1225] border border-white/5 overflow-hidden flex flex-col">
                      {/* season + cube */}
                      <div className="flex flex-col items-center justify-center p-6 flex-1 relative"
                        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(88,28,135,0.25) 0%, transparent 70%)" }}>
                        <div className="flex items-center gap-2 mb-4 text-xs text-slate-300 font-medium">
                          <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                          Open Beta Season
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <CubeBadge />
                        <div className="mt-3 text-[9px] uppercase tracking-[0.18em] text-slate-500 bg-[#1a2035] border border-white/10 px-2.5 py-0.5 rounded-full">
                          Unranked
                        </div>
                        <div className="mt-1.5 text-xs text-slate-500">
                          # <span className="inline-block w-8 h-px bg-slate-600 align-middle ml-0.5" />
                        </div>
                      </div>
                      {/* Points + Flags */}
                      <div className="grid grid-cols-2 divide-x divide-white/5 border-t border-white/5">
                        {[
                          { top: "—",    bot: "Points" },
                          { top: "0/26", bot: "Flags"  },
                        ].map(({ top, bot }) => (
                          <div key={bot} className="px-4 py-3">
                            <div className="text-sm font-bold text-slate-100">{top}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{bot}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Top 3 counters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { icon: LayoutGrid, label: "Machines",   done: 0, total: 528 },
                      { icon: Shield,     label: "Sherlocks",  done: 0, total: 149 },
                      { icon: Swords,     label: "Challenges", done: 0, total: 827 },
                    ].map(({ icon: Icon, label, done, total }) => (
                      <div key={label} className="rounded-xl bg-[#0d1225] border border-white/5 p-4 flex items-center gap-3">
                        <Icon className="w-5 h-5 text-slate-500 shrink-0" />
                        <div>
                          <div className="text-lg font-extrabold leading-none">
                            <span className="text-white">{done}</span>
                            <span className="text-slate-500 font-normal text-sm"> /{total}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                    {/* Bar chart */}
                    <div className="lg:col-span-3 rounded-xl bg-[#0d1225] border border-white/5 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-200">Machines Completed</span>
                        <div className="relative flex items-center gap-1 bg-[#080c18] border border-white/10 rounded-lg px-2 py-1 cursor-pointer">
                          <span className="text-[10px] text-slate-300">{chartFilter}</span>
                          <svg className="w-2.5 h-2.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          <select value={chartFilter} onChange={e => setChartFilter(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full">
                            {["1W","1M","3M","1Y"].map(v => <option key={v}>{v}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="h-24 flex items-end gap-1 mb-3">
                        {Array.from({ length: 14 }).map((_, i) => (
                          <div key={i} className="flex-1 rounded-sm bg-[#1a2035]" style={{ height: "6px" }} />
                        ))}
                      </div>
                      <div className="flex items-center px-0.5">
                        {[0,1,2,3].map(i => (
                          <div key={i} className="flex items-center flex-1 last:flex-none">
                            <div className="w-2 h-2 rounded-full bg-green-400 shrink-0 shadow-[0_0_5px_rgba(74,222,128,0.7)]" />
                            {i < 3 && <div className="flex-1 h-px bg-green-400/50" />}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Concentric chart */}
                    <div className="lg:col-span-2 rounded-xl bg-[#0d1225] border border-white/5 p-4">
                      <div className="text-xs font-semibold text-slate-200 mb-2">Difficulty Completion</div>
                      <div className="w-full aspect-square max-w-30 mx-auto">
                        <ConcentricChart />
                      </div>
                    </div>
                  </div>

                  {/* Bottom 3 counters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { icon: FlaskConical, label: "Pro Labs",      done: 0, total: 11 },
                      { icon: TrendingUp,   label: "Mini Pro Labs", done: 0, total: 22 },
                      { icon: Flag,         label: "Fortresses",    done: 0, total: 6  },
                    ].map(({ icon: Icon, label, done, total }) => (
                      <div key={label} className="rounded-xl bg-[#0d1225] border border-white/5 p-4 flex items-center gap-3">
                        <Icon className="w-5 h-5 text-slate-500 shrink-0" />
                        <div>
                          <div className="text-lg font-extrabold leading-none">
                            <span className="text-white">{done}</span>
                            <span className="text-slate-500 font-normal text-sm"> /{total}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* ══ RIGHT SIDEBAR ══ */}
                <div className="w-full lg:w-52 shrink-0 space-y-3">

                  <div className="rounded-xl bg-[#0d1225] border border-white/5 p-4">
                    <div className="text-xs font-bold text-slate-200 mb-2">Weekly Streak</div>
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="w-5 h-5 text-orange-400 shrink-0" />
                      <span className="text-xl font-extrabold text-white">0 weeks</span>
                    </div>
                    <div className="h-px bg-white/5 my-2.5" />
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <TrendingUp className="w-3 h-3 text-slate-500" />
                      Personal best: 0 weeks
                    </div>
                  </div>

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

                  {[
                    { title: "Badges",     msg: "You have no badges yet"          },
                    { title: "Activity",   msg: "You have no activity"            },
                    { title: "Team",       msg: "You are not a part of a Team"    },
                    { title: "University", msg: "You are not a part of a University" },
                  ].map(({ title, msg }) => (
                    <div key={title} className="rounded-xl bg-[#0d1225] border border-white/5 p-4">
                      <div className="text-xs font-bold text-slate-200 mb-2">{title}</div>
                      <div className="rounded-lg bg-[#080c18] border border-white/5 p-3 text-center">
                        <p className="text-[10px] text-slate-500">{msg}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
