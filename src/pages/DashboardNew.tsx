import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mic,
  Video,
  HelpCircle,
  FileText,
  BarChart2,
  TrendingUp,
  Clock,
} from "lucide-react";
import { interviewTracker } from "../services/interviewTracker";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);

  useEffect(() => {
    try {
      const dashboardMetrics = interviewTracker.getMetrics();
      setMetrics(dashboardMetrics);
      setRecentSessions(interviewTracker.getRecentSessions(5));
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      setMetrics({
        totalInterviews: 0,
        averageScore: 0,
        bestScore: 0,
        totalMinutes: 0,
      });
      setRecentSessions([]);
    }
  }, []);

  const features = [
    {
      icon: FileText,
      label: "Resume Analysis",
      description: "Upload and analyze your resume with AI",
      path: "/resume",
      color: "from-pink-600 to-red-600",
    },
    {
      icon: Mic,
      label: "Voice Interview",
      description: "Practice with AI-generated questions",
      path: "/interview/voice",
      color: "from-indigo-600 to-purple-600",
    },
    {
      icon: Video,
      label: "Video Interview",
      description: "Record and analyze video responses",
      path: "/interview/video",
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: HelpCircle,
      label: "Online Quiz",
      description: "Test your knowledge with quizzes",
      path: "/quiz",
      color: "from-orange-600 to-yellow-600",
    },
  ];

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white">Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Track your interview prep progress
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Mic className="h-6 w-6 text-violet-400" />
            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">
              Active
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Interviews Completed</p>
          <p className="text-3xl font-black text-white">
            {metrics.totalInterviews}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
              Growing
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Average Score</p>
          <p className="text-3xl font-black text-white">
            {metrics.averageScore}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart2 className="h-6 w-6 text-green-400" />
            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">
              Best
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Best Score</p>
          <p className="text-3xl font-black text-white">{metrics.bestScore}</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-6 w-6 text-orange-400" />
            <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">
              Hours
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Total Practice</p>
          <p className="text-3xl font-black text-white">
            {Math.round(metrics.totalMinutes)}m
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Link
              key={idx}
              to={feature.path}
              className="group p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:border-slate-600 transition-all overflow-hidden relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
              <div className="relative z-10">
                <div
                  className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-20 mb-4`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {feature.label}
                </h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentSessions.map((session, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-white/5"
              >
                <div>
                  <p className="text-white text-sm font-bold capitalize">
                    {session.type} Interview
                  </p>
                  <p className="text-slate-400 text-xs">
                    {session.answers.length} questions answered
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{session.overallScore}</p>
                  <p className="text-slate-400 text-xs">
                    {Math.round((session.duration || 0) / 60)}m
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      {metrics.totalInterviews === 0 && (
        <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
          <h3 className="text-white font-bold text-lg mb-2">
            Ready to get started?
          </h3>
          <p className="text-slate-300 mb-4">
            Complete your first interview to begin tracking your progress
          </p>
          <Link
            to="/interview/voice"
            className="inline-block px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Start Voice Interview
          </Link>
        </div>
      )}
    </div>
  );
}
