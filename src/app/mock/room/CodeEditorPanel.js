"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Check, Code2, Copy, RotateCcw } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const LANGUAGES = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "cpp", label: "C++" },
  { id: "java", label: "Java" },
];

const STARTER = `// Interview scratchpad\n// Use this space to reason, code, and iterate.\n\nfunction solve(input) {\n  // TODO\n  return input;\n}\n\nconsole.log(solve(\"hello\"));\n`;

export default function CodeEditorPanel() {
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(STARTER);
  const [copied, setCopied] = useState(false);

  const editorOptions = useMemo(
    () => ({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: "on",
      padding: { top: 14, bottom: 14 },
      roundedSelection: false,
      automaticLayout: true,
      renderLineHighlight: "gutter",
      tabSize: 2,
      fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    }),
    []
  );

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="shrink-0 flex items-center gap-2 p-3 border-b border-white/5 bg-[#0d1225]/80 backdrop-blur">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <Code2 className="w-4 h-4 text-indigo-200" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-100 truncate">Code editor</div>
            <div className="text-[11px] text-slate-500 truncate">Collaborative scratchpad</div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] font-semibold text-slate-300">Lang</span>
            <select
              value={lang.id}
              onChange={(e) => setLang(LANGUAGES.find(l => l.id === e.target.value) ?? LANGUAGES[0])}
              className="bg-transparent text-xs text-slate-200 focus:outline-none"
              aria-label="Language"
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id} className="bg-[#0d1225]">
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setCode(STARTER)}
            className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-slate-200 text-xs font-semibold flex items-center gap-2"
            title="Reset code"
          >
            <RotateCcw className="w-4 h-4 text-slate-300" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            type="button"
            onClick={copyAll}
            className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-slate-200 text-xs font-semibold flex items-center gap-2"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4 text-slate-300" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-[#0a0e1a]">
        <MonacoEditor
          height="100%"
          language={lang.id}
          value={code}
          onChange={(v) => setCode(v ?? "")}
          theme="vs-dark"
          options={editorOptions}
        />
      </div>
    </div>
  );
}

