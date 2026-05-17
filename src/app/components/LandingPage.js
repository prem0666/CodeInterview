"use client";
import { SiteNav } from "./SiteNav";
import {
  Code2,
  Zap,
  Users,
  Trophy,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Terminal,
  Brain,
  Clock,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Terminal,
    title: "Real IDE Experience",
    desc: "Code in a full-featured editor with syntax highlighting, autocomplete, and 20+ languages.",
  },
  {
    icon: Brain,
    title: "AI-Powered Hints",
    desc: "Stuck? Get intelligent hints that guide you without giving away the answer.",
  },
  {
    icon: Users,
    title: "Mock Interviews",
    desc: "Practice with peers or AI interviewers in real-time video sessions.",
  },
  {
    icon: Clock,
    title: "Timed Challenges",
    desc: "Simulate real interview pressure with countdown timers and performance tracking.",
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    desc: "Compete globally, track your rank, and celebrate your progress.",
  },
  {
    icon: Shield,
    title: "Company-Specific Prep",
    desc: "Curated question banks from Google, Amazon, Meta, Microsoft and more.",
  },
];

const steps = [
  {
    step: "01",
    title: "Pick a Topic",
    desc: "Choose from Arrays, Trees, DP, System Design and 50+ categories.",
  },
  {
    step: "02",
    title: "Solve & Submit",
    desc: "Write code in our IDE, run test cases, and submit your solution.",
  },
  {
    step: "03",
    title: "Get Feedback",
    desc: "Receive detailed analysis on time complexity, space, and code quality.",
  },
  {
    step: "04",
    title: "Land the Job",
    desc: "Track your progress and walk into interviews with confidence.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["50 problems", "3 languages", "Basic hints", "Community access"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    features: [
      "Unlimited problems",
      "20+ languages",
      "AI hints & feedback",
      "Mock interviews",
      "Company prep kits",
      "Priority support",
    ],
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    features: [
      "Everything in Pro",
      "Up to 10 members",
      "Team leaderboard",
      "Admin dashboard",
      "Custom problem sets",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "SDE @ Google",
    text: "CodeInterview Pro helped me crack Google in 3 months. The AI feedback is insanely good.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Engineer @ Amazon",
    text: "The company-specific prep kits are a game changer. Got my Amazon offer after 6 weeks.",
    rating: 5,
  },
  {
    name: "Sara Khan",
    role: "Frontend Dev @ Meta",
    text: "Mock interviews felt so real. I walked into Meta's loop feeling completely prepared.",
    rating: 5,
  },
];

const stats = [
  { value: "200K+", label: "Developers" },
  { value: "5000+", label: "Problems" },
  { value: "94%", label: "Success Rate" },
  { value: "500+", label: "Companies" },
];

export default function LandingPage() {
  return (
    <div className="bg-[#0a0e1a] text-slate-100 min-h-screen">
      <SiteNav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Grid background */}
        <div className="cyber-pattern absolute" />

        {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.07)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" /> */}
        {/* Glow */}
        <div className="absolute w-125 h-125 -top-20 -left-20 bg-indigo-600 opacity-10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute w-96 h-96 bottom-0 right-0 bg-cyan-500 opacity-10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300">
              <Zap className="w-3 h-3" /> #1 Developer Interview Platform
            </span>

            <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              Crack Code.
              <br />
              Build Skills.
              <br />
              <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Land Your Dream Job.
              </span>
            </h1>

            <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
              Your complete platform to practice coding interviews, solve real
              problems, get AI feedback &amp; become a top developer.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-base shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:bg-indigo-500 transition">
                Explore Problems <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-600 text-slate-100 font-semibold text-base hover:border-indigo-500 hover:bg-indigo-500/10 transition">
                View Projects
              </button>
            </div>
          </div>

          {/* Right — Code Window */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/25 bg-[#12151f]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1f2e] border-b border-indigo-500/20">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <div className="flex gap-4 ml-4">
                <span className="text-xs text-indigo-300 border-b border-indigo-400 pb-0.5">
                  App.jsx
                </span>
                <span className="text-xs text-slate-500">index.js</span>
                <span className="text-xs text-slate-500">styles.css</span>
              </div>
            </div>
            {/* Code */}
            <pre className="p-6 text-sm leading-7 overflow-x-auto font-mono">
              <code>
                {`  `}
                <span className="text-purple-400">function</span>
                <span className="text-cyan-300"> CodeInterviewPro</span>
                <span className="text-white">{`() {`}</span>
                {`
  `}
                <span className="text-purple-400">const</span>
                <span className="text-white"> skills </span>
                <span className="text-slate-400">=</span>
                <span className="text-white"> [</span>
                <span className="text-green-400">&apos;React&apos;</span>
                <span className="text-white">, </span>
                <span className="text-green-400">&apos;Next.js&apos;</span>
                <span className="text-white">,</span>
                {`
    `}
                <span className="text-green-400">&apos;Node.js&apos;</span>
                <span className="text-white">, </span>
                <span className="text-green-400">&apos;MongoDB&apos;</span>
                <span className="text-white">];</span>
                {`

  `}
                <span className="text-purple-400">return</span>
                <span className="text-white"> (</span>
                {`
    `}
                <span className="text-slate-400">&lt;</span>
                <span className="text-cyan-300">div</span>
                <span className="text-yellow-300"> className</span>
                <span className="text-slate-400">=&quot;hero&quot;&gt;</span>
                {`
      `}
                <span className="text-slate-400">&lt;</span>
                <span className="text-cyan-300">h1</span>
                <span className="text-slate-400">&gt;</span>
                <span className="text-white">Keep Learning,</span>
                {`
        `}
                <span className="text-white">Keep Growing 🚀</span>
                <span className="text-slate-400">&lt;/</span>
                <span className="text-cyan-300">h1</span>
                <span className="text-slate-400">&gt;</span>
                {`
      `}
                <span className="text-slate-400">&lt;</span>
                <span className="text-cyan-300">p</span>
                <span className="text-slate-400">&gt;</span>
                <span className="text-white">Today. Success Tomorrow.</span>
                <span className="text-slate-400">&lt;/</span>
                <span className="text-cyan-300">p</span>
                <span className="text-slate-400">&gt;</span>
                {`
    `}
                <span className="text-slate-400">&lt;/</span>
                <span className="text-cyan-300">div</span>
                <span className="text-slate-400">&gt;</span>
                {`
  );`}
                {`
}`}
                {`

`}
                <span className="text-purple-400">export default</span>
                <span className="text-cyan-300"> CodeInterviewPro</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

     
     

      {/* ── FEATURES ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300">
            ✦ Platform Features
          </span>
          <h2 className="text-4xl font-extrabold mb-3">
            Everything you need to{" "}
            <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              get hired
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A complete platform built for serious interview prep — from beginner to FAANG.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }, i) => {
            const gradients = [
              "from-indigo-500 to-violet-500",
              "from-violet-500 to-pink-500",
              "from-cyan-500 to-indigo-500",
              "from-orange-500 to-pink-500",
              "from-yellow-500 to-orange-500",
              "from-green-500 to-cyan-500",
            ];
            const glows = [
              "rgba(99,102,241,0.3)",
              "rgba(139,92,246,0.3)",
              "rgba(34,211,238,0.3)",
              "rgba(249,115,22,0.3)",
              "rgba(234,179,8,0.3)",
              "rgba(34,197,94,0.3)",
            ];
            return (
              <div key={title} className="group relative bg-[#131929] border border-indigo-500/15 rounded-2xl p-6 hover:border-indigo-500/40 transition-all duration-300 overflow-hidden cursor-pointer">
                {/* Hover glow bg */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${glows[i]} 0%, transparent 60%)` }} />
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${gradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-linear-to-br ${gradients[i]}`}
                    style={{ boxShadow: `0 0 20px ${glows[i]}` }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-2 text-slate-100 group-hover:text-white transition">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500 group-hover:text-slate-400 transition">{desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how"
        className="relative overflow-hidden bg-[#072f3d] border-t border-b border-indigo-500/15"
      >
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-125 h-125 bg-cyan-400/15 rounded-full blur-[120px]" />
          <div className="absolute -bottom-28 -right-28 w-125 h-125 bg-indigo-500/15 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-slate-200/60">
              STEP
            </div>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight">
              From zero to offer{" "}
              <span className="bg-linear-to-r from-indigo-300 to-cyan-200 bg-clip-text text-transparent">
                in four simple steps.
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-200/70 max-w-2xl">
              Pick a topic, solve in the IDE, get AI feedback, and track progress
              until you land the job.
            </p>
          </div>

          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {steps.map((s, i) => {
              const accents = [
                "from-cyan-300 to-indigo-300",
                "from-indigo-300 to-violet-300",
                "from-violet-300 to-fuchsia-300",
                "from-emerald-300 to-cyan-300",
              ];
              const glow = [
                "rgba(34,211,238,0.22)",
                "rgba(99,102,241,0.22)",
                "rgba(217,70,239,0.22)",
                "rgba(16,185,129,0.22)",
              ];
              const stepNum = String(Number.parseInt(s.step, 10));

              return (
                <li
                  key={s.step}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_24px_60px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 30% 25%, ${glow[i]} 0%, transparent 60%)`,
                    }}
                  />
                  <div className={`pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${accents[i]} opacity-60`} />

                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-8 -left-1 text-[128px] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-br ${accents[i]} opacity-25`}
                  >
                    {stepNum}
                  </div>

                  <div className="relative pt-14">
                    <h3 className="text-lg font-bold text-slate-100 mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-200/70">
                      {s.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-3">
            Simple{" "}
            <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-slate-400">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-[#131929] rounded-2xl p-8 flex flex-col gap-4 transition-all
                ${
                  plan.highlight
                    ? "border border-indigo-500/60 shadow-[0_0_30px_rgba(99,102,241,0.25)] scale-105"
                    : "border border-indigo-500/20"
                }`}
            >
              {plan.highlight && (
                <span className="text-xs font-bold px-3 py-1 rounded-full self-start bg-indigo-500/20 text-indigo-300">
                  Most Popular
                </span>
              )}
              <div>
                <div className="text-lg font-bold">{plan.name}</div>
                <div className="text-4xl font-extrabold mt-1">
                  {plan.highlight ? (
                    <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                  ) : (
                    plan.price
                  )}
                  <span className="text-sm font-normal ml-1 text-slate-400">
                    /{plan.period}
                  </span>
                </div>
              </div>
              <ul className="flex flex-col gap-2 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-slate-400"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0 text-cyan-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-2 font-semibold py-2.5 rounded-xl transition
                ${
                  plan.highlight
                    ? "bg-linear-to-r from-indigo-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:opacity-90"
                    : "border border-indigo-500/20 text-slate-100 hover:border-indigo-500 hover:bg-indigo-500/10"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#0f1629] border-t border-b border-indigo-500/20">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-3">
              Loved by{" "}
              <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                developers
              </span>
            </h2>
            <p className="text-slate-400">
              Real stories from people who landed their dream jobs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-[#131929] border border-indigo-500/20 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-400">
                  &quot;{t.text}&quot;
                </p>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-indigo-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="bg-[#131929] border border-indigo-500/20 rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute w-64 h-64 -top-10 left-1/3 bg-indigo-500 opacity-20 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4">
              Ready to{" "}
              <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                start coding?
              </span>
            </h2>
            <p className="mb-8 text-lg text-slate-400">
              Join 200,000+ developers and start your interview prep today. Free
              forever.
            </p>
            <button className="inline-flex items-center gap-2 text-base px-10 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-cyan-400 text-white font-semibold shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:opacity-90 transition">
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-indigo-500/20">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-cyan-400">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            CodeInterview{" "}
            <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Pro
            </span>
          </div>
          <p className="text-sm text-slate-400">
            © 2025 CodeInterview Pro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
