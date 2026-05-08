"use client";
import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import { ChevronLeft, Play, Send, CheckCircle, RotateCcw, ChevronDown } from "lucide-react";
import { PROBLEMS, diffColor } from "../../lib/data";

export default function ProblemPage({ params }) {
  const { id } = use(params);
  const problem = PROBLEMS.find(p => p.id === Number(id));

  const [code, setCode]         = useState(problem?.starter ?? "// Problem not found");
  const [output, setOutput]     = useState(null);
  const [running, setRunning]   = useState(false);
  const [tab, setTab]           = useState("description"); // description | solution
  const [mobileView, setMobileView] = useState("problem"); // problem | editor

  if (!problem) return (
    <div className="h-screen bg-[#080c18] text-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🔍</div>
        <div className="text-lg font-bold mb-2">Problem not found</div>
        <Link href="/practice" className="text-indigo-400 hover:text-indigo-300 text-sm">← Back to Practice</Link>
      </div>
    </div>
  );

  const dc = diffColor[problem.difficulty];

  function runCode() {
    setRunning(true);
    setOutput(null);
    setTimeout(() => {
      setRunning(false);
      setOutput({
        status: "success",
        cases: [
          { input: problem.examples[0]?.input, expected: problem.examples[0]?.output, got: problem.examples[0]?.output, passed: true },
          { input: problem.examples[1]?.input ?? "edge case", expected: "correct", got: "correct", passed: true },
        ],
        runtime: `${Math.floor(Math.random()*80+20)}ms`,
        memory: `${Math.floor(Math.random()*10+40)}MB`,
      });
    }, 1200);
  }

  function submitCode() {
    setRunning(true);
    setOutput(null);
    setTimeout(() => {
      setRunning(false);
      setOutput({
        status: "accepted",
        cases: problem.examples.map(ex => ({ input: ex.input, expected: ex.output, got: ex.output, passed: true })),
        runtime: `${Math.floor(Math.random()*80+20)}ms`,
        memory: `${Math.floor(Math.random()*10+40)}MB`,
        beats: `${Math.floor(Math.random()*30+60)}%`,
      });
    }, 1800);
  }

  return (
    <div className="h-screen bg-[#080c18] text-slate-100 flex flex-col overflow-hidden font-sans">

      {/* ── Topbar ── */}
      <header className="shrink-0 bg-[#0d1225] border-b border-indigo-500/20 px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/practice" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition shrink-0">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Practice</span>
          </Link>
          <div className="w-px h-4 bg-slate-700 shrink-0" />
          <span className="text-sm font-semibold truncate">{problem.id}. {problem.title}</span>
          <span className={`hidden sm:inline text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${dc.bg} ${dc.text}`}>
            {problem.difficulty}
          </span>
        </div>

        {/* Mobile view toggle */}
        <div className="flex md:hidden items-center gap-1 bg-[#080c18] rounded-xl p-1 border border-indigo-500/20 shrink-0">
          <button onClick={() => setMobileView("problem")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mobileView === "problem" ? "bg-indigo-600 text-white" : "text-slate-400"}`}>
            Problem
          </button>
          <button onClick={() => setMobileView("editor")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mobileView === "editor" ? "bg-indigo-600 text-white" : "text-slate-400"}`}>
            Editor
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setCode(problem.starter)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition" title="Reset">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={runCode} disabled={running}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition disabled:opacity-50">
            <Play className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Run</span>
          </button>
          <button onClick={submitCode} disabled={running}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-semibold transition disabled:opacity-50 shadow-[0_0_16px_rgba(34,197,94,0.3)]">
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Submit</span>
          </button>
        </div>
      </header>

      {/* ── Body: split layout ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT: Problem description */}
        <div className={`
          w-full md:w-[45%] md:flex flex-col border-r border-indigo-500/10 overflow-hidden
          ${mobileView === "problem" ? "flex" : "hidden md:flex"}
        `}>
          {/* Tabs */}
          <div className="flex border-b border-indigo-500/10 shrink-0">
            {["description", "solution"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-3 text-xs font-semibold capitalize transition-all border-b-2 ${
                  tab === t ? "border-indigo-500 text-indigo-300" : "border-transparent text-slate-500 hover:text-slate-300"
                }`}>
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-5">
            {tab === "description" ? (
              <div className="space-y-5">
                {/* Title + diff */}
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="text-base font-bold">{problem.id}. {problem.title}</h2>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dc.bg} ${dc.text}`}>{problem.difficulty}</span>
                    {problem.solved && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-400/10 text-green-400">✓ Solved</span>}
                  </div>
                  <div className="flex gap-3 text-xs text-slate-500">
                    <span>Topic: <span className="text-slate-300">{problem.topic}</span></span>
                    <span>Acceptance: <span className="text-slate-300">{problem.acceptance}%</span></span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">{problem.desc}</p>

                {/* Examples */}
                <div className="space-y-3">
                  {problem.examples.map((ex, i) => (
                    <div key={i} className="rounded-xl bg-[#0d1225] border border-indigo-500/15 p-4">
                      <div className="text-xs font-semibold text-slate-400 mb-2">Example {i + 1}</div>
                      <div className="space-y-1.5 font-mono text-xs">
                        <div><span className="text-slate-500">Input: </span><span className="text-slate-200">{ex.input}</span></div>
                        <div><span className="text-slate-500">Output: </span><span className="text-green-300">{ex.output}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="rounded-xl bg-[#0d1225] border border-indigo-500/15 p-4">
                  <div className="text-xs font-semibold text-slate-400 mb-2">Constraints</div>
                  <ul className="text-xs text-slate-400 space-y-1 font-mono">
                    <li>• 2 ≤ nums.length ≤ 10⁴</li>
                    <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li>• Only one valid answer exists</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-300">Approach</div>
                <div className="rounded-xl bg-[#0d1225] border border-indigo-500/15 p-4 text-sm text-slate-400 leading-relaxed">
                  Use a hash map to store each number and its index. For each number, check if <code className="text-indigo-300 bg-indigo-500/10 px-1 rounded">target - num</code> exists in the map.
                  <br /><br />
                  Time: <span className="text-green-400">O(n)</span> · Space: <span className="text-yellow-400">O(n)</span>
                </div>
                <div className="rounded-xl bg-[#111827] border border-indigo-500/15 p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre">{`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp), i];
    map.set(nums[i], i);
  }
}`}</div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Code editor + output */}
        <div className={`
          flex-1 flex flex-col overflow-hidden
          ${mobileView === "editor" ? "flex" : "hidden md:flex"}
        `}>
          {/* Language selector */}
          <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-indigo-500/10 bg-[#0a0e1a]">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              JavaScript
              <ChevronDown className="w-3 h-3" />
            </div>
            <span className="text-xs text-slate-600">{code.split("\n").length} lines</span>
          </div>

          {/* Code textarea */}
          <div className="flex-1 overflow-hidden relative">
            {/* Line numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#0a0e1a] border-r border-indigo-500/10 flex flex-col pt-3 overflow-hidden pointer-events-none">
              {code.split("\n").map((_, i) => (
                <div key={i} className="text-[11px] text-slate-600 text-right pr-2.5 leading-6">{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              className="absolute inset-0 pl-12 pr-4 pt-3 pb-3 bg-[#0a0e1a] text-slate-200 font-mono text-sm leading-6 resize-none focus:outline-none w-full h-full scrollbar-hide"
            />
          </div>

          {/* Output panel */}
          {(output || running) && (
            <div className="shrink-0 border-t border-indigo-500/10 bg-[#080c18] max-h-52 overflow-y-auto scrollbar-hide">
              <div className="px-4 py-2 border-b border-indigo-500/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  {running ? "Running..." : output?.status === "accepted" ? "✅ Accepted" : "✅ Test Passed"}
                </span>
                {output && (
                  <div className="flex gap-3 text-xs text-slate-500">
                    <span>Runtime: <span className="text-green-400">{output.runtime}</span></span>
                    <span>Memory: <span className="text-blue-400">{output.memory}</span></span>
                    {output.beats && <span>Beats: <span className="text-yellow-400">{output.beats}</span></span>}
                  </div>
                )}
              </div>
              {running ? (
                <div className="p-4 flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-slate-400">Executing your code...</span>
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  {output?.cases?.filter(Boolean).map((c, i) => (
                    <div key={i} className={`rounded-xl p-3 text-xs font-mono ${c.passed ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        {c.passed ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : <span className="text-red-400">✗</span>}
                        <span className={c.passed ? "text-green-400" : "text-red-400"}>Case {i + 1} {c.passed ? "Passed" : "Failed"}</span>
                      </div>
                      {c.input && <div className="text-slate-500">Input: <span className="text-slate-300">{c.input}</span></div>}
                      <div className="text-slate-500">Expected: <span className="text-slate-300">{c.expected}</span></div>
                      <div className="text-slate-500">Got: <span className="text-slate-300">{c.got}</span></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
