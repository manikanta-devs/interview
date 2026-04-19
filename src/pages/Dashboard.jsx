import { useEffect, useState } from "react";
import {
  BarChart3,
  Brain,
  Clock,
  ClipboardList,
  FileText,
  Mic,
  Sparkles,
  Target,
  Video,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Flame,
} from "lucide-react";
import ChartCard from "../components/ChartCard.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import StatCard from "../components/StatCard.jsx";
import { getActivity, getInsights } from "../services/activity.js";

function useInsights() {
  const [state, setState] = useState(() => getInsights());
  useEffect(() => {
    const refresh = () => setState(getInsights());
    window.addEventListener("nexhire:activity", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("nexhire:activity", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return state;
}

export default function Dashboard() {
  const insights = useInsights();
  const recent = getActivity().slice(0, 5);

  const stats = [
    {
      label: "Mock Interviews",
      value: String(insights.interviewsCount),
      detail: "Voice and video sessions",
      icon: Mic,
      accent: "blue",
    },
    {
      label: "Average Score",
      value: insights.scoredCount ? `${insights.averageScore}%` : "--",
      detail: `${insights.scoredCount} sessions tracked`,
      icon: TrendingUp,
      accent: "green",
    },
    {
      label: "Mastered Skills",
      value: String(
        insights.skillBreakdown.filter((item) => item.score >= 80).length,
      ),
      detail: "Categories at 80%+",
      icon: Award,
      accent: "purple",
    },
    {
      label: "Study Streak",
      value: `${Math.max(0, insights.interviewsCount)}`,
      detail: "Consistent practice pays off",
      icon: Flame,
      accent: "orange",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="shell-panel bg-gradient-to-r from-slate-950 via-slate-900 to-violet-950 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="section-title mb-2">Welcome Back! 👋</h1>
            <p className="section-copy">
              You're doing great. Keep practicing to ace your interview.
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black tracking-[-0.04em] bg-gradient-to-br from-violet-400 to-sky-300 bg-clip-text text-transparent md:text-5xl">
              {insights.averageScore || 0}%
            </div>
            <p className="mt-1 text-sm text-slate-400">Overall Score</p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* Skills Progress */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 app-card border-white/8 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title flex items-center gap-2">
              <Brain className="h-6 w-6 text-violet-300" />
              Skills Progress
            </h2>
            <span className="shell-pill">Live</span>
          </div>
          <div className="space-y-5">
            {insights.skillBreakdown.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-100">
                    {skill.name}
                  </span>
                  <span
                    className={`text-sm font-bold ${skill.score >= 80 ? "text-emerald-400" : skill.score >= 50 ? "text-amber-300" : "text-rose-300"}`}
                  >
                    {skill.score}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full border border-white/8 bg-white/5">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      skill.score >= 80
                        ? "bg-gradient-to-r from-[#10B981] to-[#34D399]"
                        : skill.score >= 50
                          ? "bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]"
                          : "bg-gradient-to-r from-[#EF4444] to-[#F87171]"
                    }`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="app-card border-white/8 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
          <h2 className="section-title mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
              <div>
                <p className="text-xs text-slate-400">This Week</p>
                <p className="text-2xl font-black text-violet-200">
                  {Math.max(0, insights.interviewsCount % 7)}
                </p>
              </div>
              <Mic className="h-6 w-6 text-violet-300" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4">
              <div>
                <p className="text-xs text-slate-400">Total Hours</p>
                <p className="text-2xl font-black text-sky-300">
                  {(insights.interviewsCount * 0.75).toFixed(1)}
                </p>
              </div>
              <Clock className="h-6 w-6 text-sky-300" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-pink-400/20 bg-pink-500/10 p-4">
              <div>
                <p className="text-xs text-slate-400">Global Rank</p>
                <p className="text-2xl font-black text-pink-300">#1</p>
              </div>
              <Award className="h-6 w-6 text-pink-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Practice Modules */}
      <section>
        <h2 className="section-title mb-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-violet-300" />
          Practice Modules
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            title="Resume Analysis"
            description="Get AI feedback on your resume"
            to="/resume"
            icon={FileText}
            accent="blue"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-slate-800 border-t-violet-500 text-2xl font-black text-white">
              {insights.resumeScore || "--"}
              {insights.resumeScore ? "%" : ""}
            </div>
            <div className="mt-5 border-t border-white/8 pt-4 text-xs text-slate-400">
              Improve your profile
            </div>
          </FeatureCard>
          <FeatureCard
            title="Voice Interview"
            description="Practice with AI in voice mode"
            to="/interview/voice"
            icon={Mic}
            accent="purple"
          >
            <Waveform />
            <div className="mt-5 flex justify-between border-t border-white/8 pt-4 text-xs text-slate-400">
              <span>
                Score{" "}
                <b className="text-white">{insights.voiceScore || "--"}</b>
              </span>
              <span>
                Sessions{" "}
                <b className="text-white">{insights.interviewsCount}</b>
              </span>
            </div>
          </FeatureCard>
          <FeatureCard
            title="Video Interview"
            description="Full video mock interview"
            to="/interview/video"
            icon={Video}
            accent="pink"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 shadow-[0_0_35px_rgba(236,72,153,0.2)]">
              <Video className="h-8 w-8 text-[#F472B6]" />
            </div>
            <div className="mt-5 border-t border-white/8 pt-4 text-xs text-slate-400">
              Most realistic practice
            </div>
          </FeatureCard>
          <FeatureCard
            title="Online Quiz"
            description="Test your knowledge"
            to="/quiz"
            icon={ClipboardList}
            accent="green"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 shadow-[0_0_35px_rgba(16,185,129,0.2)]">
              <ClipboardList className="h-8 w-8 text-[#6EE7B7]" />
            </div>
            <div className="mt-5 border-t border-white/8 pt-4 text-xs text-slate-400">
              Quick knowledge check
            </div>
          </FeatureCard>
        </div>
      </section>

      {/* Recent Activity */}
      {recent.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title flex items-center gap-2">
              <Clock className="h-6 w-6 text-violet-300" />
              Recent Activity
            </h2>
            <a
              href="/results"
              className="flex items-center gap-1 text-sm font-semibold text-violet-300 hover:text-violet-200"
            >
              View All <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-3">
            {recent.map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 p-4 transition-all hover:border-violet-400/50"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-3 w-3 rounded-full bg-[#3B82F6]" />
                  <div>
                    <p className="text-white font-semibold">{activity.type}</p>
                    <p className="text-xs text-[#64748B]">
                      {activity.description || "Practice session"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.score && (
                    <p className="text-lg font-black text-[#3B82F6]">
                      {activity.score}%
                    </p>
                  )}
                  <p className="text-xs text-[#64748B]">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="shell-panel border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-sky-500/10 p-8 text-center">
        <h3 className="section-title mb-3">Ready for Your Next Challenge?</h3>
        <p className="section-copy mb-6">
          Start a mock interview session and get real-time feedback.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/interview/voice"
            className="px-6 py-3 rounded-lg bg-[#382FF6] text-white font-bold hover:shadow-[0_12px_30px_rgba(56,47,246,0.34)] transition-all flex items-center justify-center gap-2"
          >
            <Mic className="h-5 w-5" />
            Practice Voice
          </a>
          <a
            href="/interview/video"
            className="px-6 py-3 rounded-lg border border-[#382FF6] text-white font-bold hover:bg-[#382FF6]/20 transition-all flex items-center justify-center gap-2"
          >
            <Video className="h-5 w-5" />
            Practice Video
          </a>
        </div>
      </section>
    </div>
  );
}

function Waveform() {
  const bars = [
    22, 34, 18, 48, 56, 28, 72, 44, 62, 36, 78, 54, 26, 64, 46, 30, 58, 42,
  ];
  return (
    <div className="flex h-24 items-center justify-center gap-1">
      {bars.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className="w-1.5 rounded-full bg-gradient-to-t from-[#2563EB] to-[#A855F7]"
          style={{ height }}
        />
      ))}
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="rounded-lg border border-dashed border-[#334155] p-4 text-sm leading-6 text-[#64748B]">
      {text}
    </div>
  );
}
