"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code2, LayoutDashboard, BookOpen, Mic, Map,
  Trophy, BarChart2, Settings, LogOut,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",   href: "/dashboard"   },
  { icon: BookOpen,        label: "Practice",    href: "/practice"    },
  { icon: Mic,             label: "Mock Intv",   href: "/mock"        },
  // { icon: Map,             label: "Roadmap",     href: "/roadmap"     },
  // { icon: Trophy,          label: "Leaderboard", href: "/leaderboard" },
  { icon: BarChart2,       label: "Analytics",   href: "/analytics"   },
  { icon: Settings,        label: "Settings",    href: "/settings"    },
];

export default function Sidebar({ open, onClose }) {
  const path = usePathname();
  return (
    <>
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60 h-screen
        bg-[#0d1225]/95 backdrop-blur border-r border-indigo-500/20
        flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex
      `}>
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-indigo-500/20 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-cyan-400 shadow-[0_0_16px_rgba(99,102,241,0.5)]">
            <Code2 className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-wide text-white">
            Code<span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Prep</span>
          </span>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-b border-indigo-500/20 shrink-0">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white shrink-0">JD</div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate">John Doe</div>
            <div className="text-xs text-slate-400">Level 14 · Pro</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-hidden">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = path.startsWith(href);
            return (
              <Link key={label} href={href} onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${active ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25" : "text-slate-400 hover:text-slate-100 hover:bg-white/5"}`}>
                <Icon className="w-4 h-4 shrink-0" />{label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-indigo-500/20 shrink-0">
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition">
            <LogOut className="w-4 h-4" /> Logout
          </Link>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onClose} />}
    </>
  );
}
