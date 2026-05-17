"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Mic,
  Trophy, BarChart2, Settings, LogOut, User,
  ChevronLeft, Code2,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",   href: "/dashboard"   },
  { icon: User,            label: "Profile",     href: "/profile"     },
  { icon: BookOpen,        label: "Practice",    href: "/practice"    },
  { icon: Mic,             label: "Mock Intv",   href: "/mock"        },
  // { icon: Trophy,          label: "Leaderboard", href: "/leaderboard" },
  { icon: BarChart2,       label: "Analytics",   href: "/analytics"   },
  { icon: Settings,        label: "Settings",    href: "/settings"    },
];

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
  const path = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col
        bg-[#0d1225] border-r border-white/5
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-14" : "w-60"}
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex
      `}>

        {/* Logo row */}
        <div className={`flex items-center h-14 border-b border-white/5 shrink-0 overflow-hidden
          ${collapsed ? "justify-center px-0" : "justify-between px-4"}`}>

          {/* Logo — click to expand */}
          <button onClick={() => collapsed && onToggleCollapse()}
            className={`flex items-center gap-2.5 min-w-0 ${collapsed ? "cursor-pointer" : "cursor-default"}`}>
            <div className="w-7 h-7 shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)]">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <span className="font-bold text-sm tracking-wide text-white whitespace-nowrap">
                Code<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Prep</span>
              </span>
            )}
          </button>

          {/* Collapse arrow — only when expanded */}
          {!collapsed && (
            <button onClick={onToggleCollapse}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition shrink-0">
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Profile section — expanded */}
        {!collapsed && (
          <div className="shrink-0 border-b border-white/5">
            {/* gradient bg area */}
            <div className="relative px-4 py-4"
              style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}>
              {/* glow blobs */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-indigo-500/30 blur-2xl" />
                <div className="absolute -bottom-4 -left-2 w-16 h-16 rounded-full bg-cyan-500/20 blur-2xl" />
              </div>
              <div className="relative flex items-center gap-3">
                {/* Avatar with glowing gradient ring */}
                <div className="shrink-0 relative">
                  <div className="w-11 h-11 rounded-xl p-0.5"
                    style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee, #6366f1)" }}>
                    <div className="w-full h-full rounded-[10px] bg-[#1a1a3e] flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-6 h-6">
                        <polygon points="50,4 92,27 92,73 50,96 8,73 8,27"
                          fill="none" stroke="#818cf8" strokeWidth="4" opacity="0.8" />
                        <polygon points="50,16 80,33 80,67 50,84 20,67 20,33"
                          fill="#1e1b4b" stroke="#c7d2fe" strokeWidth="2.5" opacity="0.9" />
                        <polygon points="50,4 62,27 50,16 38,27"
                          fill="#a5b4fc" opacity="1" />
                        <polygon points="8,27 30,38 20,33 8,27"
                          fill="#6366f1" opacity="0.7" />
                        <polygon points="92,27 70,38 80,33 92,27"
                          fill="#6366f1" opacity="0.7" />
                      </svg>
                    </div>
                  </div>
                  {/* online dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1a1a3e]" />
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">prem0666</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-semibold text-indigo-300">Beginner</span>
                    <span className="text-slate-600 text-[10px]">·</span>
                    <span className="text-[10px] text-slate-400">Lvl 1</span>
                  </div>
                  {/* XP bar */}
                  <div className="mt-1.5 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full w-[2%]"
                      style={{ background: "linear-gradient(90deg, #6366f1, #22d3ee)" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed profile avatar */}
        {collapsed && (
          <div className="flex justify-center py-2.5 border-b border-white/5 shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl p-0.5"
                style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)" }}>
                <div className="w-full h-full rounded-[10px] bg-[#1a1a3e] flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-4.5 h-4.5">
                    <polygon points="50,4 92,27 92,73 50,96 8,73 8,27"
                      fill="none" stroke="#818cf8" strokeWidth="5" opacity="0.8" />
                    <polygon points="50,4 62,27 50,16 38,27"
                      fill="#a5b4fc" opacity="1" />
                  </svg>
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0d1225]" />
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav className={`flex-1 flex flex-col py-3 gap-0.5 overflow-hidden ${collapsed ? "items-center px-0" : "px-3"}`}>
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = path.startsWith(href);
            return (
              <Link key={label} href={href} onClick={onClose}
                title={collapsed ? label : undefined}
                className={`
                  relative flex items-center gap-3 rounded-xl transition-all duration-150 group
                  ${collapsed ? "w-10 h-10 justify-center" : "px-3 py-2.5"}
                  ${active
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                    : "text-slate-500 hover:text-slate-100 hover:bg-white/5 border border-transparent"}
                `}>
                {/* Active left bar */}
                {active && collapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-r-full" />
                )}
                <Icon className="w-4.5 h-4.5 shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{label}</span>}
                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#1a2035] border border-white/10 text-xs text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: logout */}
        <div className={`border-t border-white/5 py-3 ${collapsed ? "flex justify-center" : "px-3"}`}>
          <Link href="/login"
            title={collapsed ? "Logout" : undefined}
            className={`
              relative flex items-center gap-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition group
              ${collapsed ? "w-10 h-10 justify-center" : "px-3 py-2.5"}
            `}>
            <LogOut className="w-4.5 h-4.5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
            {collapsed && (
              <span className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#1a2035] border border-white/10 text-xs text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                Logout
              </span>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}
