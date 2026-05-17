"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, HelpCircle, LayoutGrid, Zap, ChevronDown } from "lucide-react";

export default function TopNav({ onMenuClick }) {
  const path = usePathname();

  // Page title from path
  const title = path.split("/")[1];
  const pageTitle = title ? title.charAt(0).toUpperCase() + title.slice(1) : "Home";

  return (
    <header className="shrink-0 z-30 h-14 bg-[#0d1225] border-b border-white/5 flex items-center justify-between px-4 gap-3">

      {/* Left: hamburger (mobile) + page title */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition"
          onClick={onMenuClick}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-slate-300 hidden sm:block">{pageTitle}</span>
      </div>

      {/* Right: icon buttons + upgrade + user */}
      <div className="flex items-center gap-1.5">

        {/* Bell */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-400" />
        </button>

        {/* Help */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition">
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Grid / apps */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition">
          <LayoutGrid className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Upgrade button */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs text-black transition hover:brightness-110 hover:shadow-[0_0_16px_rgba(132,204,22,0.4)]"
          style={{ background: "#84cc16" }}>
          <Zap className="w-3.5 h-3.5" />
          Upgrade
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* User profile chip */}
        <Link href="/profile"
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/5 transition group">
          {/* Avatar */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-400/30 to-green-900/50 border border-green-400/30 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#4ade80" strokeWidth="1.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition hidden sm:block">prem0666</span>
          {/* FREE badge */}
          <span className="text-[9px] font-bold text-slate-400 border border-white/15 px-1.5 py-0.5 rounded hidden sm:block">FREE</span>
          <ChevronDown className="w-3 h-3 text-slate-500 hidden sm:block" />
        </Link>

      </div>
    </header>
  );
}
