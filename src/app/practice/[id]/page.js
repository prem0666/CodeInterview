"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { use } from "react";
import dynamic from "next/dynamic";
import {
  ChevronLeft, Play, Send, CheckCircle, RotateCcw,
  ChevronDown, Maximize2, Settings, Copy, Check, XCircle,
} from "lucide-react";
import { PROBLEMS, diffColor } from "../../lib/data";
import { runAllTests } from "../../lib/executor";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const LANGUAGES = [
  { id: "javascript", label: "JavaScript", color: "#f7df1e" },
  { id: "python",     label: "Python",     color: "#3776ab" },
  { id: "cpp",        label: "C++",        color: "#00599c" },
  { id: "java",       label: "Java",       color: "#ed8b00" },
];

const MONACO_THEME = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "comment",  foreground: "6272a4" },
    { token: "keyword",  foreground: "ff79c6" },
    { token: "string",   foreground: "f1fa8c" },
    { token: "number",   foreground: "bd93f9" },
    { token: "function", foreground: "50fa7b" },
  ],
  colors: {
    "editor.background":                  "#0a0e1a",
    "editor.foreground":                  "#f8f8f2",
    "editorLineNumber.foreground":        "#44475a",
    "editorLineNumber.activeForeground":  "#6272a4",
    "editor.lineHighlightBackground":     "#ffffff08",
    "editorCursor.foreground":            "#f8f8f2",
    "editor.selectionBackground":         "#44475a",
  },
};

export default function ProblemPage({ params }) {
  const { id } = use(params);
  const problem = PROBLEMS.find(p => p.id === Number(id));

  const [lang, setLang]           = useState(LANGUAGES[0]);
  const [langOpen, setLangOpen]   = useState(false);
  const [code, setCode]           = useState(problem?.starter ?? "");
  const [output, setOutput]       = useState(null);
  const [running, setRunning]     = useState(false);
  const [tab, setTab]             = useState("description");
  const [outputTab, setOutputTab] = useState("testcase");
  const [mobileView, setMobileView] = useState("problem");
  const [copied, setCopied]       = useState(false);

  if (!problem) return (
    <div className="h-screen bg-[#080c18] text-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🔍</div>
        <div className="text-lg font-bold mb-2">Problem not found</div>
        <Link href="/practice" className="text-indigo-400 hover:text-indigo-300 text-sm">← Back</Link>
      </div>
    </div>
  );

  const dc = diffColor[problem.difficulty];

  function handleEditorMount(editor, monaco) {
    monaco.editor.defineTheme("codeprep-dark", MONACO_THEME);
    monaco.editor.setTheme("codeprep-dark");
  }

  function copyCode() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function execute(isSubmit) {
    if (lang.id !== "javascript") {
      setOutput({ status: "error", error: "Only JavaScript execution is supported in browser. Python/C++/Java coming soon.", cases: [], runtime: "—" });
      setOutputTab("result");
      return;
    }
    setRunning(true);
    setOutput(null);
    setOutputTab("result");
    setTimeout(() => {
      const result = runAllTests(code, problem.examples);
      setOutput({
        ...result,
        memory: `${Math.floor(Math.random() * 10 + 38)}MB`,
        beats: isSubmit && result.allPassed ? `${Math.floor(Math.random() * 30 + 60)}%` : null,
      });
      setRunning(false);
    }, 200);
  }

  const statusMeta = {
    accepted:     { label: "✅ Accepted — All test cases passed!", cls: "bg-green-500/10 text-green-400 border-green-500/20" },
    wrong_answer: { label: "❌ Wrong Answer",                       cls: "bg-red-500/10 text-red-400 border-red-500/20"   },
    error:        { label: "❌ Runtime Error",                      cls: "bg-red-500/10 text-red-400 border-red-500/20"   },
  };

  return (
    <div className="h-screen bg-[#080c18] text-slate-100 flex flex-col overflow-hidden font-sans">

      {/* Topbar */}
      <header className="shrink-0 h-12 bg-[#0d1225] border-b border-white/5 px-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/practice" className="flex items-center gap-1 text-slate-400 hover:text-white transition shrink-0">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Practice</span>
          </Link>
          <div className="w-px h-4 bg-white/10 shrink-0" />
          <span className="text-sm font-semibold truncate text-slate-200">{problem.id}. {problem.title}</span>
          <span className={`hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${dc.bg} ${dc.text}`}>
            {problem.difficulty}
          </span>
        </div>

        <div className="flex md:hidden items-center gap-1 bg-[#080c18] rounded-lg p-0.5 border border-white/10 shrink-0">
          {["problem", "editor"].map(v => (
            <button key={v} onClick={() => setMobileView(v)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold capitalize transition
                ${mobileView === v ? "bg-indigo-600 text-white" : "text-slate-400"}`}>
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={() => setCode(problem.starter)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition" title="Reset">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => execute(false)} disabled={running}
            className="flex items-center gap-1.5 px-3 h-8 rounded-lg bg-[#1e2535] hover:bg-[#252d42] text-white text-xs font-semibold transition disabled:opacity-50 border border-white/10">
            <Play className="w-3 h-3 text-green-400" />
            Run
          </button>
          <button onClick={() => execute(true)} disabled={running}
            className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-bold text-black transition disabled:opacity-50"
            style={{ background: "#84cc16" }}>
            <Send className="w-3 h-3" />
            Submit
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT: Problem */}
        <div className={`w-full md:w-[42%] flex flex-col border-r border-white/5 overflow-hidden bg-[#0a0e1a]
          ${mobileView === "problem" ? "flex" : "hidden md:flex"}`}>

          <div className="flex border-b border-white/5 shrink-0 bg-[#0d1225]">
            {["description", "solution", "submissions"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-xs font-semibold capitalize transition relative
                  ${tab === t ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>
                {t}
                {tab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400 rounded-full" />}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide p-5">
            {tab === "description" && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap mb-2">
                    <h2 className="text-base font-bold text-white">{problem.id}. {problem.title}</h2>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${dc.bg} ${dc.text}`}>{problem.difficulty}</span>
                    {problem.solved && <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-400/10 text-green-400">✓ Solved</span>}
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>Topic: <span className="text-slate-300">{problem.topic}</span></span>
                    <span>Acceptance: <span className="text-slate-300">{problem.acceptance}%</span></span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{problem.desc}</p>

                <div className="space-y-3">
                  {problem.examples.map((ex, i) => (
                    <div key={i} className="rounded-xl bg-[#0d1225] border border-white/5 overflow-hidden">
                      <div className="px-4 py-2 border-b border-white/5 text-xs font-semibold text-slate-400">Example {i + 1}</div>
                      <div className="p-4 space-y-2 font-mono text-xs">
                        <div><span className="text-slate-500">Input: </span><span className="text-slate-200">{ex.input}</span></div>
                        <div><span className="text-slate-500">Output: </span><span className="text-green-300">{ex.output}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-[#0d1225] border border-white/5 p-4">
                  <div className="text-xs font-semibold text-slate-400 mb-3">Constraints</div>
                  <ul className="text-xs text-slate-400 space-y-1.5 font-mono">
                    {(problem.constraints ?? ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹"]).map((c, i) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-indigo-400">•</span>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tab === "solution" && (
              <div className="space-y-4">
                <div className="text-sm font-bold text-slate-200">Optimal Approach</div>
                <div className="rounded-xl bg-[#0d1225] border border-white/5 p-4 text-sm text-slate-400 leading-relaxed">
                  {problem.hint ?? "Think about the most efficient data structure for this problem."}
                </div>
                {problem.solution && (
                  <div className="rounded-xl bg-[#0a0e1a] border border-white/5 p-4 font-mono text-xs text-slate-300 leading-6 whitespace-pre overflow-x-auto">
                    {problem.solution}
                  </div>
                )}
              </div>
            )}

            {tab === "submissions" && (
              <div className="py-16 text-center text-slate-600 text-sm">No submissions yet</div>
            )}
          </div>
        </div>

        {/* RIGHT: Editor + Output */}
        <div className={`flex-1 flex flex-col overflow-hidden
          ${mobileView === "editor" ? "flex" : "hidden md:flex"}`}>

          {/* Editor toolbar */}
          <div className="shrink-0 h-10 flex items-center justify-between px-4 bg-[#0d1225] border-b border-white/5">
            <div className="relative">
              <button onClick={() => setLangOpen(p => !p)}
                className="flex items-center gap-2 px-3 h-7 rounded-lg bg-[#1a2035] border border-white/10 hover:border-white/20 transition text-xs font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: lang.color }} />
                {lang.label}
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
              {langOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 rounded-xl bg-[#1a2035] border border-white/10 shadow-2xl z-50 overflow-hidden">
                  {LANGUAGES.map(l => (
                    <button key={l.id} onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium transition hover:bg-white/5
                        ${lang.id === l.id ? "text-white bg-white/5" : "text-slate-400"}`}>
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
                      {l.label}
                      {lang.id === l.id && <Check className="w-3 h-3 ml-auto text-green-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={copyCode} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition">
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition">
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Monaco */}
          <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
            <MonacoEditor
              height="100%"
              language={lang.id}
              value={code}
              onChange={v => setCode(v ?? "")}
              onMount={handleEditorMount}
              theme="codeprep-dark"
              options={{
                fontSize: 13,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                lineHeight: 22,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                renderLineHighlight: "line",
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                smoothScrolling: true,
                padding: { top: 16, bottom: 16 },
                tabSize: 2,
                wordWrap: "on",
                bracketPairColorization: { enabled: true },
                scrollbar: { verticalScrollbarSize: 4, horizontalScrollbarSize: 4 },
              }}
            />
          </div>

          {/* Output panel */}
          <div className="shrink-0 border-t border-white/5 bg-[#0a0e1a]" style={{ height: "220px" }}>
            <div className="flex items-center justify-between px-4 border-b border-white/5 h-9">
              <div className="flex">
                {["testcase", "result", "console"].map(t => (
                  <button key={t} onClick={() => setOutputTab(t)}
                    className={`px-3 py-1.5 text-[10px] font-semibold transition relative
                      ${outputTab === t ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>
                    {t === "testcase" ? "Test Cases" : t === "result" ? "Output" : "Console"}
                    {outputTab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />}
                  </button>
                ))}
              </div>
              {output && !running && (
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span>Runtime: <span className="text-green-400 font-semibold">{output.runtime}</span></span>
                  <span>Memory: <span className="text-blue-400 font-semibold">{output.memory}</span></span>
                  {output.beats && <span>Beats: <span className="text-yellow-400 font-semibold">{output.beats}</span></span>}
                </div>
              )}
            </div>

            <div className="overflow-y-auto scrollbar-hide" style={{ height: "171px" }}>

              {/* Test Cases tab */}
              {outputTab === "testcase" && (
                <div className="p-3 space-y-2">
                  {problem.examples.map((ex, i) => (
                    <div key={i} className="rounded-lg bg-[#0d1225] border border-white/5 p-3">
                      <div className="text-[10px] text-slate-500 mb-1 font-semibold">Case {i + 1}</div>
                      <div className="font-mono text-xs text-slate-300">{ex.input}</div>
                      <div className="font-mono text-xs text-slate-500 mt-0.5">Expected: <span className="text-green-300">{ex.output}</span></div>
                    </div>
                  ))}
                </div>
              )}

              {/* Output tab */}
              {outputTab === "result" && (
                <div className="p-3">
                  {running ? (
                    <div className="flex items-center gap-3 py-5">
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin shrink-0" />
                      <span className="text-xs text-slate-400">Running your code...</span>
                    </div>
                  ) : !output ? (
                    <div className="py-8 text-center text-slate-600 text-xs">Click Run to execute your code</div>
                  ) : (
                    <div className="space-y-2">
                      {/* Status */}
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border ${statusMeta[output.status]?.cls ?? statusMeta.error.cls}`}>
                        {output.status === "accepted" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {statusMeta[output.status]?.label ?? "Error"}
                      </div>

                      {/* Global error */}
                      {output.error && (
                        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 font-mono text-xs text-red-300">
                          {output.error}
                        </div>
                      )}

                      {/* Per case */}
                      {output.cases?.map((c, i) => (
                        <div key={i} className={`rounded-lg p-3 text-xs font-mono border
                          ${c.passed ? "bg-green-500/5 border-green-500/15" : "bg-red-500/5 border-red-500/15"}`}>
                          <div className="flex items-center gap-1.5 mb-2">
                            {c.passed
                              ? <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                              : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                            <span className={`font-bold ${c.passed ? "text-green-400" : "text-red-400"}`}>
                              Case {c.index} — {c.passed ? "Passed" : "Failed"}
                            </span>
                          </div>
                          <div className="space-y-1 text-[11px]">
                            <div className="text-slate-500">Input: <span className="text-slate-300">{c.input}</span></div>
                            <div className="text-slate-500">Expected: <span className="text-green-300">{c.expected}</span></div>
                            <div className="text-slate-500">Got: <span className={c.passed ? "text-green-300" : "text-red-300"}>{c.got}</span></div>
                            {c.error && <div className="text-red-400 mt-1">Error: {c.error}</div>}
                            {c.logs?.length > 0 && (
                              <div className="mt-1.5 pt-1.5 border-t border-white/5">
                                <div className="text-slate-600 mb-0.5">console.log:</div>
                                {c.logs.map((l, j) => <div key={j} className="text-yellow-300">{l}</div>)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {/* Console tab */}
              {outputTab === "console" && (
                <div className="p-3 font-mono text-xs space-y-1">
                  {!output && !running && (
                    <div className="py-8 text-center text-slate-600">Run your code to see console output</div>
                  )}
                  {running && (
                    <div className="flex items-center gap-3 py-5">
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin shrink-0" />
                      <span className="text-slate-400">Running...</span>
                    </div>
                  )}
                  {output && !running && (() => {
                    const allLogs = output.cases?.flatMap(c => c.logs ?? []) ?? [];
                    return allLogs.length === 0
                      ? <div className="py-8 text-center text-slate-600">No console.log output</div>
                      : allLogs.map((log, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-slate-600 shrink-0 select-none">&gt;</span>
                            <span className="text-yellow-300 break-all">{log}</span>
                          </div>
                        ));
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
