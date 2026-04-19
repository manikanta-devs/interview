import { useEffect, useState } from "react";
import {
  Brain,
  Zap,
  TrendingUp,
  Award,
  Flame,
  Target,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
  Upload,
  MessageSquare,
  Video,
  Mic,
  BookOpen,
  DollarSign,
  FileText,
  BarChart3,
  Clock,
  Zap as Lightning,
  GitBranch,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Animated Counter
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count}</span>;
}

// Animated Progress Bar
function ProgressBar({ percentage, label }: any) {
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      setDisplayPercent(Math.floor(progress * percentage));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [percentage]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-300">{label}</span>
        <span className="text-sm font-bold text-cyan-400">{displayPercent}%</span>
      </div>
      <div className="relative h-2 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${displayPercent}%` }}
        />
      </div>
    </div>
  );
}

// Unique Button with gradient and hover effects
function UniqueButton({
  icon: Icon,
  label,
  description,
  emoji,
  onClick,
  gradient = "from-indigo-600 to-cyan-600",
  className = "",
}: any) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl ${className}`}
      style={{
        background: `linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(56, 189, 248, 0.15) 100%)`,
        border: "2px solid rgba(99, 102, 241, 0.3)",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl">{emoji}</span>
        </div>
        <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{label}</h3>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
        <div className="mt-3 flex items-center text-indigo-400 group-hover:text-cyan-300 transition-colors">
          <span className="text-xs font-semibold">Start Practicing</span>
          <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>
    </button>
  );
}

// Stat Card with animated graphics
function StatCard({ label, value, icon: Icon, color, trend }: any) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-105 cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
        border: `2px solid ${color}40`,
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm font-medium">{label}</span>
          <div className="flex items-center gap-1">
            <div className={`p-2 rounded-lg`} style={{ background: `${color}20` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            {trend && (
              <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                <TrendingUp className="w-4 h-4" />
                <span>+{trend}%</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-3xl font-black mb-2" style={{ color }}>
          <AnimatedCounter value={parseInt(value)} />
          {isNaN(parseInt(value)) ? value : ""}
        </p>
        <p className="text-xs text-gray-500">Last 30 days</p>
      </div>
    </div>
  );
}

// User Progress Card with detailed breakdown
function UserProgressCard() {
  const [progressData, setProgressData] = useState({
    profileCompletion: 75,
    resumeOptimization: 60,
    interviewReadiness: 85,
    skillDevelopment: 70,
  });

  return (
    <div className="rounded-3xl p-8 border border-indigo-500/30" style={{
      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
    }}>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            Your Progress Overview
          </h3>
          <p className="text-gray-400">Track your journey to interview mastery</p>
        </div>

        <div className="space-y-4">
          <ProgressBar percentage={progressData.profileCompletion} label="📋 Profile Completion" />
          <ProgressBar percentage={progressData.resumeOptimization} label="📄 Resume Optimization" />
          <ProgressBar percentage={progressData.interviewReadiness} label="🎯 Interview Readiness" />
          <ProgressBar percentage={progressData.skillDevelopment} label="🧠 Skill Development" />
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-indigo-500/20">
          <div className="flex-1 min-w-fit p-3 rounded-lg bg-indigo-600/10 border border-indigo-500/20">
            <p className="text-xs text-gray-400">Overall Progress</p>
            <p className="text-2xl font-bold text-cyan-400 mt-1">
              <AnimatedCounter value={Math.round((progressData.profileCompletion + progressData.resumeOptimization + progressData.interviewReadiness + progressData.skillDevelopment) / 4)} />%
            </p>
          </div>
          <div className="flex-1 min-w-fit p-3 rounded-lg bg-purple-600/10 border border-purple-500/20">
            <p className="text-xs text-gray-400">Next Milestone</p>
            <p className="text-lg font-bold text-purple-400 mt-1">+15% to Mastery 🎉</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Achievement Badges
function AchievementBadges() {
  const badges = [
    { emoji: "🔥", label: "5-Day Streak", earned: true },
    { emoji: "🎯", label: "Perfect Score", earned: true },
    { emoji: "⚡", label: "Speed Master", earned: false },
    { emoji: "🌟", label: "All-Star", earned: false },
    { emoji: "🏆", label: "Champion", earned: false },
    { emoji: "💎", label: "Diamond Member", earned: false },
  ];

  return (
    <div className="rounded-2xl p-6 border border-indigo-500/20" style={{
      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%)",
    }}>
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-yellow-400" />
        Achievements & Badges
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg text-center transition-all duration-300 ${
              badge.earned
                ? "bg-yellow-600/20 border-2 border-yellow-500/50 hover:scale-110"
                : "bg-gray-800/50 border-2 border-gray-700/50 opacity-50"
            }`}
          >
            <p className="text-2xl mb-1">{badge.emoji}</p>
            <p className={`text-xs font-semibold ${badge.earned ? "text-yellow-400" : "text-gray-500"}`}>
              {badge.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Learning Path
function LearningPath() {
  const steps = [
    { number: 1, title: "Complete Profile", icon: "👤", completed: true },
    { number: 2, title: "Upload Resume", icon: "📄", completed: true },
    { number: 3, title: "Practice Interview", icon: "🎤", completed: true },
    { number: 4, title: "Get Feedback", icon: "💬", completed: false },
    { number: 5, title: "Improve & Re-Practice", icon: "🔄", completed: false },
  ];

  return (
    <div className="rounded-2xl p-6 border border-indigo-500/20" style={{
      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%)",
    }}>
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-indigo-400" />
        Your Learning Path
      </h3>
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              step.completed
                ? "bg-green-600/30 border-2 border-green-500 text-green-400"
                : "bg-gray-700/30 border-2 border-gray-600 text-gray-400"
            }`}>
              {step.completed ? "✓" : step.number}
            </div>
            <div className="flex-1">
              <p className={`font-semibold text-sm ${step.completed ? "text-gray-300" : "text-white"}`}>
                {step.title}
              </p>
            </div>
            <span className="text-xl">{step.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EnhancedDashboardPro() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<any[]>([]);
  const [stats, setStats] = useState({
    interviewsPracticed: 0,
    questionsAnswered: 0,
    skillsLearned: 0,
    streakDays: 0,
  });

  useEffect(() => {
    const savedActivities = JSON.parse(localStorage.getItem("activities") || "[]");
    setActivities(savedActivities.slice(0, 6));

    const interviewCount = savedActivities.filter((a: any) => a.type === "interview").length;
    const questionCount = savedActivities.filter((a: any) => a.type === "question").length;
    const skillCount = savedActivities.filter((a: any) => a.type === "skill").length;

    setStats({
      interviewsPracticed: interviewCount,
      questionsAnswered: questionCount,
      skillsLearned: skillCount,
      streakDays: Math.floor(Math.random() * 30) + 1,
    });
  }, []);

  const advancedFeatures = [
    {
      icon: MessageSquare,
      label: "STAR Coach",
      description: "Behavioral interview mastery",
      emoji: "🌟",
      onClick: () => navigate("/star-coach"),
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: FileText,
      label: "Resume Analysis",
      description: "ATS optimization & scoring",
      emoji: "📄",
      onClick: () => navigate("/resume-advanced"),
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      icon: Target,
      label: "JD Matcher",
      description: "Resume vs job fit analysis",
      emoji: "🎯",
      onClick: () => navigate("/jd-matcher"),
      gradient: "from-orange-600 to-red-600",
    },
    {
      icon: BookOpen,
      label: "Cheat Sheet",
      description: "AI-generated study materials",
      emoji: "📚",
      onClick: () => navigate("/cheat-sheet"),
      gradient: "from-green-600 to-emerald-600",
    },
    {
      icon: DollarSign,
      label: "Salary Negotiator",
      description: "Compensation mastery",
      emoji: "💰",
      onClick: () => navigate("/salary-simulator"),
      gradient: "from-yellow-600 to-orange-600",
    },
    {
      icon: Video,
      label: "AI Video Avatar",
      description: "Real-time mock interviews",
      emoji: "🎬",
      onClick: () => navigate("/interview/video"),
      gradient: "from-indigo-600 to-purple-600",
    },
  ];

  const basicFeatures = [
    {
      icon: Mic,
      label: "Voice Practice",
      description: "Real-time speech recognition",
      emoji: "🎤",
      onClick: () => navigate("/interview/voice"),
      gradient: "from-pink-600 to-rose-600",
    },
    {
      icon: Brain,
      label: "AI Mentor",
      description: "Personalized coaching tips",
      emoji: "🧠",
      onClick: () => navigate("/ai-coach"),
      gradient: "from-teal-600 to-cyan-600",
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Interview Mastery Hub
        </h1>
        <p className="text-gray-400 text-base flex items-center gap-2">
          Your personal AI interview coach with real-time feedback
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Interviews Practiced"
          value={stats.interviewsPracticed || 12}
          icon={Video}
          color="#818CF8"
          trend={15}
        />
        <StatCard
          label="Questions Answered"
          value={stats.questionsAnswered || 48}
          icon={MessageSquare}
          color="#06B6D4"
          trend={22}
        />
        <StatCard
          label="Skills Mastered"
          value={stats.skillsLearned || 9}
          icon={Award}
          color="#10B981"
          trend={8}
        />
        <StatCard
          label="Streak 🔥"
          value={stats.streakDays || 7}
          icon={Flame}
          color="#F59E0B"
          trend={3}
        />
      </div>

      {/* User Progress Overview */}
      <UserProgressCard />

      {/* Recent Activities */}
      {activities.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-cyan-400" />
            Recent Activities
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%)",
                }}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-600">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{activity.name || activity.type}</p>
                  <p className="text-sm text-gray-400">{activity.timestamp || "Today"}</p>
                </div>
                <span className="text-sm font-bold text-cyan-400 whitespace-nowrap">{activity.score || 85}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Achievements & Learning Path */}
        <div className="space-y-6">
          <AchievementBadges />
          <LearningPath />
        </div>

        {/* Right: Quick Tips */}
        <div className="rounded-2xl p-6 border border-indigo-500/20" style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%)",
        }}>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Lightning className="w-5 h-5 text-yellow-400" />
            Quick Tips & Insights
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-indigo-600/10 border border-indigo-500/20">
              <p className="text-sm font-semibold text-indigo-300 mb-1">💡 Pro Tip #1</p>
              <p className="text-sm text-gray-300">Practice your STAR responses to behavioral questions daily</p>
            </div>
            <div className="p-4 rounded-lg bg-cyan-600/10 border border-cyan-500/20">
              <p className="text-sm font-semibold text-cyan-300 mb-1">💡 Pro Tip #2</p>
              <p className="text-sm text-gray-300">Optimize your resume for ATS with our analyzer</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-600/10 border border-purple-500/20">
              <p className="text-sm font-semibold text-purple-300 mb-1">💡 Pro Tip #3</p>
              <p className="text-sm text-gray-300">Record yourself answering questions to improve</p>
            </div>
            <div className="p-4 rounded-lg bg-green-600/10 border border-green-500/20">
              <p className="text-sm font-semibold text-green-300 mb-1">💡 Pro Tip #4</p>
              <p className="text-sm text-gray-300">Review your weak spots before interviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          Advanced AI Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advancedFeatures.map((feature, idx) => (
            <UniqueButton key={idx} {...feature} />
          ))}
        </div>
      </div>

      {/* Basic Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">
          Core Training Tools
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {basicFeatures.map((feature, idx) => (
            <UniqueButton key={idx} {...feature} />
          ))}
        </div>
      </div>

      {/* Resume Upload CTA */}
      <div className="rounded-2xl p-8 border border-indigo-500/30" style={{
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%)",
      }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">Upload Your Resume</h3>
            <p className="text-gray-400 text-sm">Get instant AI analysis, ATS scoring, and optimization suggestions to land more interviews</p>
          </div>
          <button
            onClick={() => navigate("/resume-advanced")}
            className="flex-shrink-0 px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold hover:scale-105 transition-transform hover:shadow-lg hover:shadow-indigo-500/40"
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Analyze Resume
          </button>
        </div>
      </div>
    </div>
  );
}
