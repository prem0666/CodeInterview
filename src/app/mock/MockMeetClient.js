"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Monitor, Users, Calendar, Settings,
  Grid3x3, HelpCircle, MessageSquare, Plus, Code2,
  Clock, ChevronRight, Keyboard, Link2, Zap, Brain,
  Shield, ArrowRight, Play, Copy, Check, X,
} from "lucide-react";

const RECENT = [
  { id: 1, code: "abc-defg-hij", title: "DP Problems Session",   date: "May 6", dot: "bg-indigo-400" },
  { id: 2, code: "xyz-uvwx-yz1", title: "Graph Traversal Round", date: "May 5", dot: "bg-violet-400" },
  { id: 3, code: "mno-pqrs-tuv", title: "Recursion Deep Dive",   date: "May 3", dot: "bg-cyan-400"   },
];

const FEATURES = [
  { icon: Code2,    title: "Live Code Editor",  desc: "Solve problems together in real-time with syntax highlighting and 20+ languages.", gradient: "from-indigo-500 to-violet-500", glow: "rgba(99,102,241,0.35)",  stat: "20+ languages"  },
  { icon: Users,    title: "Peer Interviews",   desc: "Match with developers at your level for realistic mock interview sessions.",        gradient: "from-cyan-500 to-indigo-500",   glow: "rgba(34,211,238,0.35)", stat: "10K+ peers"     },
  { icon: Monitor,  title: "Screen Sharing",    desc: "Share your screen to walk through your thought process with your interviewer.",     gradient: "from-green-500 to-cyan-500",    glow: "rgba(34,197,94,0.35)",  stat: "HD quality"     },
  { icon: Brain,    title: "AI Interviewer",    desc: "Get grilled by our AI that asks follow-up questions just like a real interviewer.", gradient: "from-violet-500 to-pink-500",   glow: "rgba(139,92,246,0.35)", stat: "GPT-4 powered"  },
  { icon: Zap,      title: "Instant Feedback",  desc: "Get scored on time complexity, code quality, and communication after each session.",gradient: "from-yellow-500 to-orange-500", glow: "rgba(234,179,8,0.35)",  stat: "Real-time"      },
  { icon: Shield,   title: "Company Prep",      desc: "Practice with questions from Google, Amazon, Meta, Microsoft and 500+ companies.", gradient: "from-orange-500 to-red-500",    glow: "rgba(249,115,22,0.35)", stat: "500+ companies" },
];

function genCode() {
  const seg = () => Math.random().toString(36).substring(2, 5);
  return `${seg()}-${seg()}-${seg()}`;
}

// ── Copy Link Popup ──
function CopyLinkPopup({ meetCode, onClose }) {
  const [copied, setCopied] = useState(false);
  const link = typeof window !== "undefined"
    ? `${window.location.origin}/mock/room?code=${meetCode}`
    : `https://codemeet.app/mock/room?code=${meetCode}`;

  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(link); }
    catch {
      const el = document.createElement("textarea");
      el.value = link; document.body.appendChild(el);
      el.select(); document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [link]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0d1225] rounded-3xl border border-indigo-500/25 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-indigo-500/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.4)]">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100">Meeting link created</div>
              <div className="text-xs text-slate-500">Share this link to invite others</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/[0.08]">
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">Meeting code</div>
              <div className="text-base font-mono font-bold text-indigo-300 tracking-widest">{meetCode}</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/[0.08]">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-slate-500 mb-0.5">Shareable link</div>
              <div className="text-xs text-slate-300 truncate font-mono">{link}</div>
            </div>
            <button onClick={copy}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                copied ? "bg-green-500/20 text-green-400 border border-green-500/30"
                       : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
              }`}>
              {copied ? <><Check className="w-3.5 h-3.5" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
            </button>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Anyone with this link can join your interview session. The link expires after 24 hours.
          </p>
          <div className="flex gap-3 pt-1">
            <button onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm font-medium transition">
              Close
            </button>
            <Link href={`/mock/room?code=${meetCode}`}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold text-center hover:bg-indigo-500 transition shadow-[0_0_16px_rgba(99,102,241,0.3)]">
              Start meeting →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MockPage() {
  const router = useRouter();
  const [joinCode, setJoinCode]   = useState("");
  const [showNew, setShowNew]     = useState(false);
  const [copyPopup, setCopyPopup] = useState(null);

  const now     = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const handleDropdown = (action) => {
    setShowNew(false);
    if (action === "create")   setCopyPopup(genCode());
    if (action === "instant")  router.push(`/mock/room?code=${genCode()}`);
    if (action === "schedule") alert("Calendar scheduling coming soon!");
  };

  const handleJoin = () => {
    if (!joinCode.trim()) return;
    router.push(`/mock/room?code=${joinCode.trim()}`);
  };

  return (
    <div className="min-h-screen bg-[#080c18] text-slate-100 flex flex-col font-sans">

      {/* ── Topbar ── */}
      <header className="shrink-0 h-14 px-4 flex items-center justify-between border-b border-indigo-500/20 bg-[#0d1225]/90 backdrop-blur sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-white/5 transition">
            <Grid3x3 className="w-5 h-5 text-slate-400" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.5)]">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-semibold hidden sm:block">
              Code<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Meet</span>
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-sm">
          <span className="font-semibold text-slate-200">{timeStr}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">{dateStr}</span>
        </div>
        <div className="flex items-center gap-1">
          {[HelpCircle, MessageSquare, Settings, Grid3x3].map((Icon, i) => (
            <button key={i} className="p-2 rounded-full hover:bg-white/5 transition">
              <Icon className="w-5 h-5 text-slate-500" />
            </button>
          ))}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white ml-1 cursor-pointer shadow-[0_0_10px_rgba(99,102,241,0.4)]">
            JD
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-hide">

        {/* ── Hero ── */}
        <div className="relative flex flex-col items-center justify-center pt-14 pb-10 px-4 text-center overflow-visible">
          <div className="absolute -top-16 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none bg-indigo-600" />
          <div className="absolute top-8 right-1/4 w-60 h-60 rounded-full opacity-10 blur-3xl pointer-events-none bg-cyan-500" />

          <span className="relative inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
            <Zap className="w-3 h-3" /> AI-Powered Mock Interviews
          </span>
          <h1 className="relative text-4xl sm:text-5xl font-extrabold text-white mb-3 leading-tight">
            Mock coding interviews<br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">for everyone</span>
          </h1>
          <p className="relative text-sm text-slate-400 mb-8 max-w-md leading-relaxed">
            Practice real interview problems with peers or AI. Get feedback, improve your skills, and land your dream job.
          </p>

          {/* Action row */}
          <div className="relative flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl">

            {/* New interview + dropdown */}
            <div className="relative">
              <button onClick={() => setShowNew(v => !v)}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                <Plus className="w-4 h-4" />
                New interview
                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showNew ? "rotate-90" : ""}`} />
              </button>

              {showNew && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#0d1225] rounded-2xl shadow-2xl border border-indigo-500/25 py-2 overflow-hidden"
                  style={{ zIndex: 9999 }}>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
                  {[
                    { action: "create",   icon: Link2,    label: "Create a meeting for later", sub: "Get a shareable link to send",   gradient: "from-indigo-500 to-violet-500"  },
                    { action: "instant",  icon: Play,     label: "Start an instant meeting",   sub: "Jump into the room right now",   gradient: "from-green-500 to-cyan-500"     },
                    { action: "schedule", icon: Calendar, label: "Schedule in calendar",       sub: "Plan ahead with teammates",      gradient: "from-orange-500 to-yellow-500"  },
                  ].map(({ action, icon: Icon, label, sub, gradient }) => (
                    <button key={action} onClick={() => handleDropdown(action)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition text-left group">
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition">{label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{sub}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-slate-400 transition" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Code input */}
            <div className="flex items-center flex-1 w-full sm:w-auto border border-indigo-500/25 rounded-full overflow-hidden hover:border-indigo-500/50 focus-within:border-indigo-500 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition bg-[#0d1225]">
              <div className="pl-4 pr-2">
                <Keyboard className="w-4 h-4 text-slate-500" />
              </div>
              <input value={joinCode} onChange={e => setJoinCode(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleJoin()}
                placeholder="Enter a code or link"
                className="flex-1 py-3 pr-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none bg-transparent" />
              <button onClick={handleJoin} disabled={!joinCode.trim()}
                className={`px-4 py-3 text-sm font-semibold transition ${joinCode.trim() ? "text-indigo-400 hover:bg-indigo-500/10" : "text-slate-600 cursor-not-allowed"}`}>
                Join
              </button>
            </div>
          </div>

          <button className="relative mt-4 text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition">
            Learn more about CodeMeet <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="border-t border-indigo-500/10 mx-6" />

        {/* ── Recent sessions only ── */}
        <div className="px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Recent sessions</h2>
          <div className="space-y-1.5">
            {RECENT.map(r => (
              <Link key={r.id} href={`/mock/room?code=${r.code}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl border border-indigo-500/10 hover:border-indigo-500/25 hover:bg-indigo-500/5 transition cursor-pointer group">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${r.dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-300 truncate group-hover:text-white transition">{r.title}</div>
                  <div className="text-xs text-slate-600 font-mono mt-0.5">{r.code}</div>
                </div>
                <span className="text-xs text-slate-600 shrink-0">{r.date}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Feature Cards ── */}
        <div className="px-6 sm:px-10 pb-12 max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-200">Why CodeMeet?</h2>
            <span className="text-xs text-slate-600">6 features</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc, gradient, glow, stat }) => (
              <div key={title}
                className="group relative bg-[#0d1225] border border-indigo-500/15 rounded-2xl p-5 hover:border-indigo-500/35 transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 20% 20%, ${glow.replace("0.35","0.1")} 0%, transparent 60%)` }} />
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient}`}
                      style={{ boxShadow: `0 0 16px ${glow}` }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-white/5 text-slate-500 border border-white/5">{stat}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-200 group-hover:text-white transition mb-1.5">{title}</h3>
                  <p className="text-xs text-slate-500 group-hover:text-slate-400 leading-relaxed transition">{desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Outside click closes dropdown */}
      {showNew && <div className="fixed inset-0 z-[9998]" onClick={() => setShowNew(false)} />}

      {/* Copy Link Popup */}
      {copyPopup && <CopyLinkPopup meetCode={copyPopup} onClose={() => setCopyPopup(null)} />}
    </div>
  );
}
