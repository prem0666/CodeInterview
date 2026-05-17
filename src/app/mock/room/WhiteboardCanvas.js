"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Eraser, PenLine, RotateCcw, Trash2 } from "lucide-react";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getPointFromPointerEvent(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

export default function WhiteboardCanvas() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const strokeRef = useRef({ width: 4, color: "#60a5fa" });

  const [tool, setTool] = useState("pen"); // pen | eraser
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [strokeColor, setStrokeColor] = useState("#60a5fa");

  const effectiveColor = tool === "eraser" ? "#0d1225" : strokeColor;
  const widthLabel = useMemo(() => `${strokeWidth}px`, [strokeWidth]);

  useEffect(() => {
    strokeRef.current = { width: strokeWidth, color: effectiveColor };
  }, [strokeWidth, effectiveColor]);

  function resizeCanvas() {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const cssWidth = Math.max(1, Math.floor(rect.width));
    const cssHeight = Math.max(1, Math.floor(rect.height));

    const dpr = clamp(window.devicePixelRatio || 1, 1, 3);
    const prev = canvas.toDataURL("image/png");

    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;
    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.imageSmoothingEnabled = true;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.drawImage(img, 0, 0, cssWidth, cssHeight);
    };
    img.src = prev;

    ctxRef.current = ctx;
  }

  function clearBoard() {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function resetTools() {
    setTool("pen");
    setStrokeWidth(4);
    setStrokeColor("#60a5fa");
  }

  function onPointerDown(e) {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    canvas.setPointerCapture?.(e.pointerId);

    drawingRef.current = true;
    lastPointRef.current = getPointFromPointerEvent(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
  }

  function onPointerMove(e) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const point = getPointFromPointerEvent(e, canvas);
    const last = lastPointRef.current;
    if (!last) return;

    ctx.strokeStyle = strokeRef.current.color;
    ctx.lineWidth = strokeRef.current.width;

    const midX = (last.x + point.x) / 2;
    const midY = (last.y + point.y) / 2;
    ctx.quadraticCurveTo(last.x, last.y, midX, midY);
    ctx.stroke();

    lastPointRef.current = point;
  }

  function onPointerUp() {
    drawingRef.current = false;
    lastPointRef.current = null;
  }

  useEffect(() => {
    resizeCanvas();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="shrink-0 flex items-center gap-2 p-3 border-b border-white/5 bg-[#0d1225]/80 backdrop-blur">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            type="button"
            onClick={() => setTool("pen")}
            className={`h-9 w-9 rounded-lg flex items-center justify-center transition ${
              tool === "pen" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-white/5"
            }`}
            aria-label="Pen"
            title="Pen"
          >
            <PenLine className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setTool("eraser")}
            className={`h-9 w-9 rounded-lg flex items-center justify-center transition ${
              tool === "eraser" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-white/5"
            }`}
            aria-label="Eraser"
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[11px] font-semibold text-slate-300">Size</span>
          <input
            type="range"
            min={2}
            max={14}
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-28 accent-indigo-500"
            aria-label="Stroke size"
          />
          <span className="text-[11px] text-slate-400 w-10 text-right tabular-nums">{widthLabel}</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[11px] font-semibold text-slate-300 hidden sm:inline">Color</span>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="h-6 w-8 bg-transparent border-none p-0"
            aria-label="Stroke color"
            disabled={tool === "eraser"}
            title={tool === "eraser" ? "Color disabled in eraser mode" : "Stroke color"}
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={resetTools}
            className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-slate-200 text-xs font-semibold flex items-center gap-2"
            title="Reset tools"
          >
            <RotateCcw className="w-4 h-4 text-slate-300" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            type="button"
            onClick={clearBoard}
            className="h-9 px-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 transition text-red-300 text-xs font-semibold flex items-center gap-2"
            title="Clear board"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      <div ref={wrapRef} className="flex-1 min-h-0 p-3 bg-[#0a0e1a]">
        <div className="relative h-full w-full rounded-2xl bg-[#0d1225] border border-white/10 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 touch-none cursor-crosshair"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            aria-label="Whiteboard canvas"
          />
        </div>
      </div>
    </div>
  );
}

