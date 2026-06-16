"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Code2, Copy, Play, RotateCcw, Square } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const LANGS = [
  { id: "javascript", label: "JS" },
  { id: "typescript", label: "TS" },
  { id: "python",     label: "Python" },
  { id: "cpp",        label: "C++" },
  { id: "java",       label: "Java" },
];

const STARTER = `// Collaborative code editor - changes sync in real-time

function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map[diff] !== undefined) return [map[diff], i];
    map[nums[i]] = i;
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
`;

export default function CodeEditorPanel({ onBroadcast, syncEvent }) {
  const [lang,    setLang]    = useState(LANGS[0]);
  const [code,    setCode]    = useState(STARTER);
  const [output,  setOutput]  = useState(null);
  const [running, setRunning] = useState(false);
  const [copied,  setCopied]  = useState(false);
  const isSyncing = useRef(false); // prevent echo

  // Receive remote code changes
  const lastSyncT = useRef(0);
  useEffect(() => {
    if (!syncEvent || syncEvent.type !== "code") return;
    if (syncEvent._t === lastSyncT.current) return;
    lastSyncT.current = syncEvent._t;
    isSyncing.current = true;
    setCode(syncEvent.data.code);
    setTimeout(() => { isSyncing.current = false; }, 50);
  }, [syncEvent]);

  function handleCodeChange(val) {
    const v = val ?? "";
    setCode(v);
    if (!isSyncing.current) {
      onBroadcast?.({ type: "code", data: { code: v } });
    }
  }

  function runCode() {
    if (lang.id !== "javascript" && lang.id !== "typescript") {
      setOutput({ error: `${lang.label} execution runs server-side. Only JavaScript is supported in browser.`, logs: [] });
      return;
    }
    setRunning(true);
    setOutput(null);
    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" "));
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(code);
      const result = fn();
      setOutput({ logs, result: result !== undefined ? String(result) : undefined, error: null });
    } catch (e) {
      setOutput({ logs, error: e.message, result: null });
    } finally {
      console.log = originalLog;
      setRunning(false);
    }
  }

  async function copyCode() {
    await navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const opts = useMemo(() => ({
    fontSize: 13,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: "on",
    padding: { top: 12, bottom: 12 },
    automaticLayout: true,
    tabSize: 2,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontLigatures: true,
    lineHeight: 20,
    renderLineHighlight: "gutter",
    bracketPairColorization: { enabled: true },
    scrollbar: { verticalScrollbarSize: 4 },
  }), []);

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#0a0e1a]">
      {/* Toolbar */}
      <div className="shrink-0 h-11 flex items-center gap-2 px-3 border-b border-white/5 bg-[#0d1225]">
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
          {LANGS.map(l => (
            <button key={l.id} onClick={() => setLang(l)}
              className={`px-2.5 h-7 rounded-md text-xs font-semibold transition ${lang.id === l.id ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={copyCode}
            className="flex items-center gap-1.5 px-2.5 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold transition">
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
          <button onClick={() => { setCode(STARTER); onBroadcast?.({ type: "code", data: { code: STARTER } }); }}
            className="flex items-center gap-1.5 px-2.5 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold transition">
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button onClick={runCode} disabled={running}
            className="flex items-center gap-1.5 px-3 h-8 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white text-xs font-bold transition shadow-[0_0_12px_rgba(34,197,94,0.3)]">
            {running ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {running ? "Running" : "Run"}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <MonacoEditor
          height="100%"
          language={lang.id}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={opts}
        />
      </div>

      {/* Output panel */}
      {output !== null && (
        <div className="shrink-0 max-h-44 overflow-y-auto scrollbar-hide border-t border-white/5 bg-[#080b14] p-3 font-mono text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Output</span>
            <button onClick={() => setOutput(null)} className="text-slate-600 hover:text-slate-400 text-[10px]">✕ clear</button>
          </div>
          {output.error ? (
            <div className="text-red-400 whitespace-pre-wrap">{output.error}</div>
          ) : (
            <>
              {output.logs.map((l, i) => (
                <div key={i} className="text-green-300 whitespace-pre-wrap">&gt; {l}</div>
              ))}
              {output.result && (
                <div className="text-cyan-300 mt-1 whitespace-pre-wrap">↩ {output.result}</div>
              )}
              {output.logs.length === 0 && !output.result && (
                <div className="text-slate-500">No output</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
