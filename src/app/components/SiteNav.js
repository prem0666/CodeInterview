"use client";
import { Code2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0f1629]/85 backdrop-blur-md border-b border-indigo-500/20">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-cyan-400 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          CodeInterview{" "}
          <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Pro</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how" className="hover:text-white transition">How it works</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#docs" className="hover:text-white transition">Docs</a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold px-5 py-2 rounded-lg border border-indigo-500/20 text-slate-100 hover:border-indigo-500 hover:bg-indigo-500/10 transition">
            Login
          </Link>
          <Link href="/register" className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:opacity-90 transition">
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-xl text-slate-100" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm text-slate-400 bg-[#0f1629]">
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#docs" onClick={() => setMenuOpen(false)}>Docs</a>
          <div className="flex gap-3 pt-2">
            <Link href="/login" className="text-sm font-semibold px-5 py-2 rounded-lg border border-indigo-500/20 text-slate-100">Login</Link>
            <Link href="/register" className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 text-white">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
