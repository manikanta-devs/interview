import { Link } from "react-router-dom";
import { ArrowRight, Brain, Zap, BarChart3, Mic, Video, Shield } from "lucide-react";
import { LogoOption3 } from "../components/LogoOptions.tsx"; // Dynamic Arrow

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-transparent text-slate-100">
      {/* Notification Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-center font-bold text-white shadow-[0_12px_30px_rgba(124,58,237,0.24)]">
        ✨ New premium NexHire studio experience is live.
      </div>

      {/* Grid background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(226,232,240,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(226,232,240,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />
      
      {/* Gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <nav className="shell-panel sticky top-0 z-10 mx-4 mt-4 px-5 py-4 sm:mx-6 lg:mx-auto lg:max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="logo-mark">
              <LogoOption3 size="md" animated={true} className="rounded-lg" />
            </div>
            <div>
              <p className="text-xl font-black text-white">Nex<span className="text-violet-300">Hire</span></p>
              <p className="text-xs text-slate-400">AI Interview Intelligence</p>
            </div>
          </div>
          <Link to="/dashboard">
            <button className="app-button px-6 py-2.5">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="animate-slide-up text-center lg:text-left">
          <span className="shell-pill inline-flex items-center gap-2 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Built with free tools, designed like a premium product
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
            Master Your <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-sky-300 bg-clip-text text-transparent">Interview Skills</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 lg:mx-0 md:text-lg">
            Practice with AI-powered mock interviews, voice and video feedback, resume intelligence, and a polished analytics system that feels like a $40k product.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Link to="/dashboard">
              <button className="app-button px-8 py-4 group">
                Start Practicing <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
            </Link>
            <a href="#features">
              <button className="app-button-secondary px-8 py-4">
                Explore Features
              </button>
            </a>
          </div>
        </div>

        <div className="shell-panel p-5 md:p-6 lg:justify-self-end lg:max-w-xl">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/8 bg-white/5 p-5 md:p-6">
              <p className="soft-label">Launch status</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <h3 className="section-title">Premium interview studio</h3>
                  <p className="section-copy mt-2">Unified design, free tools, and a clean workflow for interview prep.</p>
                </div>
                <div className="logo-mark shrink-0">
                  <Mic className="h-5 w-5 text-violet-200" />
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-4">
                <p className="soft-label">Workflow</p>
                <p className="mt-3 text-lg font-black tracking-[-0.03em] text-white">Practice, review, improve</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">A simple sequence that keeps the product calm and focused.</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-4">
                <p className="soft-label">Coverage</p>
                <p className="mt-3 text-lg font-black tracking-[-0.03em] text-white">Voice, video, resume</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Three practice modes in one interface without visual clutter.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="section-copy mx-auto max-w-2xl">
            Comprehensive tools to identify weaknesses and build confidence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Mic,
              title: "Voice Analysis",
              description: "Detect filler words, measure speaking pace, and track fluency patterns in real-time"
            },
            {
              icon: Video,
              title: "Video Feedback",
              description: "Get insights on body language, eye contact, and facial expressions during practice"
            },
            {
              icon: Brain,
              title: "AI Coaching",
              description: "Receive personalized feedback and suggestions for improvement after each session"
            },
            {
              icon: Zap,
              title: "Mock Interviews",
              description: "Practice with curated behavioral questions and receive instant scoring"
            },
            {
              icon: BarChart3,
              title: "Performance Tracking",
              description: "Monitor your progress over time with detailed analytics and insights"
            },
            {
              icon: Shield,
              title: "100% Private",
              description: "Everything runs in your browser. Your data never leaves your device"
            }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/8 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-[0_24px_70px_rgba(124,58,237,0.14)]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-sky-500">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-bold tracking-[-0.02em] text-white mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="shell-panel border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-sky-500/10 p-12 text-center md:p-16">
          <h2 className="section-title mb-6">
            Ready to Ace Your Interview?
          </h2>
          <p className="section-copy mx-auto mb-8 max-w-2xl">
            Start practicing now with our AI-powered platform. No signup required. It only takes a few minutes to see improvement.
          </p>
          <Link to="/dashboard">
            <button className="app-button mx-auto px-8 py-4 group">
              Get Started Free <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/8 bg-slate-950/80 py-8 mt-20">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
          <p>© 2024 NexHire. All rights reserved. Built for your browser. Your data stays with you.</p>
        </div>
      </footer>
    </div>
  );
}
