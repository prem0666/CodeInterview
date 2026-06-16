"use client";
import { useEffect, useRef, useState } from "react";
import { Eraser, PenLine, Trash2 } from "lucide-react";

function getPt(e, canvas) {
  const r = canvas.getBoundingClientRect();
  const scaleX = canvas.width / r.width;
  const scaleY = canvas.height / r.height;
  const src = e.touches?.[0] ?? e;
  return {
    x: (src.clientX - r.left) * scaleX,
    y: (src.clientY - r.top) * scaleY,
  };
}

export default function WhiteboardCanvas({ roomCode, clientId, onBroadcast, syncEvent }) {
  const canvasRef = useRef(null);
  const ctxRef    = useRef(null);
  const drawing   = useRef(false);
  const lastPt    = useRef(null);
  const strokeCfg = useRef({ color: "#60a5fa", width: 4 });
  const pendingStrokes = useRef([]); // buffer remote strokes before canvas ready

  const [tool,  setTool]  = useState("pen");
  const [color, setColor] = useState("#60a5fa");
  const [size,  setSize]  = useState(4);

  // Init canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctxRef.current = ctx;
      // replay pending
      pendingStrokes.current.forEach(s => drawStroke(ctx, s));
      pendingStrokes.current = [];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    strokeCfg.current = {
      color: tool === "eraser" ? "#0a0e1a" : color,
      width: tool === "eraser" ? size * 4 : size,
    };
  }, [tool, color, size]);

  // Receive remote strokes — key on _t so same event doesn't re-fire
  const lastSyncT = useRef(0);
  useEffect(() => {
    if (!syncEvent || syncEvent.type !== "wb") return;
    if (syncEvent._t === lastSyncT.current) return;
    lastSyncT.current = syncEvent._t;
    const ctx = ctxRef.current;
    if (!ctx) { pendingStrokes.current.push(syncEvent.data); return; }
    drawStroke(ctx, syncEvent.data);
  }, [syncEvent]);

  function drawStroke(ctx, s) {
    if (s.action === "clear") {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      return;
    }
    ctx.strokeStyle = s.color;
    ctx.lineWidth   = s.width;
    ctx.beginPath();
    ctx.moveTo(s.x0, s.y0);
    ctx.quadraticCurveTo(s.cx, s.cy, s.x1, s.y1);
    ctx.stroke();
  }

  function startDraw(e) {
    e.preventDefault();
    drawing.current = true;
    lastPt.current  = getPt(e, canvasRef.current);
    canvasRef.current?.setPointerCapture?.(e.pointerId);
  }

  function moveDraw(e) {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx    = ctxRef.current;
    if (!canvas || !ctx) return;

    const pt   = getPt(e, canvas);
    const last = lastPt.current;
    const cx   = (last.x + pt.x) / 2;
    const cy   = (last.y + pt.y) / 2;
    const cfg  = strokeCfg.current;

    const stroke = { color: cfg.color, width: cfg.width, x0: last.x, y0: last.y, cx, cy, x1: pt.x, y1: pt.y };
    drawStroke(ctx, stroke);
    onBroadcast?.({ type: "wb", data: stroke });
    lastPt.current = pt;
  }

  function endDraw() { drawing.current = false; }

  function clearBoard() {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    onBroadcast?.({ type: "wb", data: { action: "clear" } });
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Toolbar */}
      <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-[#0d1225] flex-wrap">
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
          <button onClick={() => setTool("pen")}
            className={`w-8 h-8 rounded-md flex items-center justify-center transition ${tool === "pen" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/5"}`}>
            <PenLine className="w-4 h-4" />
          </button>
          <button onClick={() => setTool("eraser")}
            className={`w-8 h-8 rounded-md flex items-center justify-center transition ${tool === "eraser" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/5"}`}>
            <Eraser className="w-4 h-4" />
          </button>
        </div>

        <input type="color" value={color} onChange={e => setColor(e.target.value)}
          disabled={tool === "eraser"}
          className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer disabled:opacity-40" />

        <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5 border border-white/10">
          <span className="text-[11px] text-slate-400">Size</span>
          <input type="range" min={2} max={20} value={size} onChange={e => setSize(+e.target.value)}
            className="w-20 accent-indigo-500" />
          <span className="text-[11px] text-slate-400 w-5">{size}</span>
        </div>

        <button onClick={clearBoard}
          className="ml-auto flex items-center gap-1.5 px-3 h-8 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-300 text-xs font-semibold transition">
          <Trash2 className="w-3.5 h-3.5" />Clear
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 min-h-0 relative bg-[#0a0e1a] overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
        <canvas ref={canvasRef}
          className="absolute inset-0 touch-none cursor-crosshair w-full h-full"
          onPointerDown={startDraw} onPointerMove={moveDraw}
          onPointerUp={endDraw} onPointerCancel={endDraw}
          onTouchStart={startDraw} onTouchMove={moveDraw} onTouchEnd={endDraw}
        />
      </div>
    </div>
  );
}
