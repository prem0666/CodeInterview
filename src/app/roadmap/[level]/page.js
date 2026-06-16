"use client";
import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import { ChevronLeft, BookOpen, CheckCircle, Circle, ChevronRight, Lock, ChevronDown, ChevronUp } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { LEVELS, PROBLEMS, diffColor } from "../../lib/data";

export default function RoadmapLevelPage({ params }) {
  const { level } = use(params);
  const lvl = LEVELS.find(l => l.level === Number(level));

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openTheory, setOpenTheory]   = useState(null);

  if (!lvl) return (
    <div className="h-screen bg-[#080c18] text-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🔍</div>
        <div className="text-lg font-bold mb-2">Level not found</div>
        <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300 text-sm">← Back to Dashboard</Link>
      </div>
    </div>
  );

  if (lvl.locked) return (
    <div className="h-screen bg-[#080c18] text-slate-100 flex items-center justify-center">
      <div className="text-center p-8 rounded-3xl bg-[#0d1225] border border-indigo-500/20 max-w-sm mx-4">
        <Lock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <div className="text-lg font-bold mb-2">{lvl.label} is Locked</div>
        <div className="text-sm text-slate-400 mb-6">{lvl.desc}</div>
        <Link href="/dashboard" className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );

  const levelProblems = lvl.problems ?? [];
  const solvedCount   = levelProblems.filter(p => p.solved).length;
  const progress      = levelProblems.length > 0 ? (solvedCount / levelProblems.length) * 100 : 0;

  const stateColor = lvl.active
    ? { ring: `rgb(${lvl.color})`, glow: `rgba(${lvl.color},0.3)` }
    : { ring: `rgb(${lvl.color})`, glow: `rgba(${lvl.color},0.2)` };

  return (
    <div className="h-screen bg-[#080c18] text-slate-100 flex overflow-hidden font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="shrink-0 bg-[#080c18]/90 backdrop-blur border-b border-indigo-500/20 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition shrink-0"
              onClick={() => setSidebarOpen(true)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/dashboard" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition shrink-0">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="w-px h-4 bg-slate-700 shrink-0" />
            <span className="text-sm font-bold truncate" style={{ color: stateColor.ring }}>{lvl.label}</span>
          </div>
          <Link href="/practice"
            className="shrink-0 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-500 transition shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            All Problems
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* Hero card */}
            <div className="rounded-3xl p-6 sm:p-8 border relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(${lvl.color},0.12) 0%, rgba(${lvl.secondary},0.06) 100%)`,
                borderColor: `rgba(${lvl.color},0.3)`,
                boxShadow: `0 0 40px rgba(${lvl.color},0.1)`,
              }}>
              {/* Glow blob */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-3xl"
                style={{ background: `rgb(${lvl.color})` }} />

              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-extrabold" style={{ color: `rgb(${lvl.color})` }}>
                      {lvl.label}
                    </span>
                    {lvl.active && (
                      <span className="text-xs px-3 py-1 rounded-full font-bold animate-pulse"
                        style={{ background: `rgba(${lvl.color},0.2)`, color: `rgb(${lvl.color})` }}>
                        🔥 Active
                      </span>
                    )}
                    {lvl.completed && (
                      <span className="text-xs px-3 py-1 rounded-full font-bold bg-green-400/15 text-green-400">
                        ✅ Completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 max-w-md">{lvl.desc}</p>
                </div>

                {/* Progress ring */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                      <circle cx="40" cy="40" r="32" fill="none"
                        stroke={`rgb(${lvl.color})`} strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 32}`}
                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - progress / 100)}`}
                        style={{ transition: "stroke-dashoffset 0.6s ease", filter: `drop-shadow(0 0 6px rgba(${lvl.color},0.6))` }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-extrabold" style={{ color: `rgb(${lvl.color})` }}>{solvedCount}</span>
                      <span className="text-[10px] text-slate-500">/{levelProblems.length}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Problems</div>
                    <div className="text-sm font-bold text-slate-200">{Math.round(progress)}% done</div>
                  </div>
                </div>
              </div>

              {/* Topic pills */}
              {(lvl.topics ?? []).length > 0 && (
                <div className="relative flex flex-wrap gap-2 mt-5">
                  {(lvl.topics ?? []).map(t => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{ background: `rgba(${lvl.color},0.15)`, color: `rgb(${lvl.color})` }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Theory section */}
            {(lvl.theory ?? []).length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-base font-bold">Theory</h2>
                </div>
                <div className="space-y-2">
                  {(lvl.theory ?? []).map((t, i) => (
                    <div key={i} className="rounded-2xl bg-[#0d1225] border border-indigo-500/15 overflow-hidden">
                      <button
                        onClick={() => setOpenTheory(openTheory === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/2 transition">
                        <span className="text-sm font-semibold text-slate-200">{t.title}</span>
                        {openTheory === i
                          ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                          : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                      </button>
                      {openTheory === i && (
                        <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-indigo-500/10">
                          <div className="pt-3">{t.body}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problems section */}
            {levelProblems.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold">Must-Solve Problems</h2>
                  <span className="text-xs text-slate-500">{solvedCount}/{levelProblems.length} solved</span>
                </div>
                <div className="rounded-2xl bg-[#0d1225] border border-indigo-500/20 overflow-hidden">
                  {levelProblems.map((p, i) => {
                    const dc = diffColor[p.difficulty];
                    return (
                      <Link key={p.id} href={`/practice/${p.id}`}
                        className="flex items-center gap-4 px-5 py-4 border-b border-indigo-500/10 last:border-0 hover:bg-white/3 transition group">
                        {p.solved
                          ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                          : <Circle className="w-5 h-5 text-slate-600 shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-200 group-hover:text-white transition truncate">
                            {p.id}. {p.title}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">{p.topic}</div>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${dc.bg} ${dc.text}`}>
                          {p.difficulty}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Next level CTA */}
            <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/25 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-indigo-300 mb-1">
                  {progress === 100 ? "🎉 Level Complete!" : "Keep going!"}
                </div>
                <div className="text-xs text-slate-400">
                  {progress === 100
                    ? "You've mastered this level. Move to the next one!"
                    : `Solve ${levelProblems.length - solvedCount} more problem${levelProblems.length - solvedCount !== 1 ? "s" : ""} to complete this level.`}
                </div>
              </div>
              <Link href="/dashboard"
                className="shrink-0 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition shadow-[0_0_16px_rgba(99,102,241,0.3)]">
                {progress === 100 ? "Next Level →" : "Back to Map"}
              </Link>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
