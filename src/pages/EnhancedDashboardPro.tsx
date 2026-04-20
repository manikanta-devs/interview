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

// Unique Button with gradient and hover effects - Redesigned
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
      className={`group relative overflow-hidden rounded-xl p-6 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-indigo-500/20 hover:border-indigo-500/50 ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(17, 24, 39, 0.6) 100%)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Animated background on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${gradient} 0%, transparent 70%)`,
          opacity: 0.08,
        }}
      />

      <div className="relative z-10 space-y-3">
        {/* Icon and Emoji Row */}
        <div className="flex items-start justify-between">
          <div className={`inline-block p-2.5 rounded-lg bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-3xl animate-pulse group-hover:animate-bounce">{emoji}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-white text-lg group-hover:text-cyan-300 transition-colors duration-300 leading-tight">
          {label}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
          {description}
        </p>

        {/* CTA Arrow */}
        <div className="pt-2 flex items-center text-indigo-400 group-hover:text-cyan-300 transition-colors duration-300">
          <span className="text-xs font-semibold uppercase tracking-wider">Start Now</span>
          <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Border gradient on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${gradient} 50%, transparent 100%)`,
          pointerEvents: "none",
          padding: "1px",
        }}
      />
    </button>
  );
}

// Stat Card with animated graphics
function StatCard({ label, value, icon: Icon, color }: any) {
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
          </div>
        </div>
        <p className="text-3xl font-black mb-2" style={{ color }}>
          <AnimatedCounter value={parseInt(value)} />
          {isNaN(parseInt(value)) ? value : ""}
        </p>
        <p className="text-xs text-gray-500">Total count</p>
      </div>
    </div>
  );
}

// User Progress Card with real data
function UserProgressCard({ activities }: any) {
  const calculateProgress = () => {
    if (!activities || activities.length === 0) return { overall: 0, interview: 0, resume: 0, skills: 0 };

    const interviews = activities.filter((a: any) => a.type === "interview").length;
    const resumes = activities.filter((a: any) => a.type === "resume").length;
    const skills = activities.filter((a: any) => a.type === "skill").length;
    const questions = activities.filter((a: any) => a.type === "question").length;

    return {
      interview: Math.min(interviews * 10, 100),
      resume: Math.min(resumes * 20, 100),
      skills: Math.min(skills * 15, 100),
      questions: Math.min(questions * 5, 100),
      overall: Math.round(((interviews * 10 + resumes * 20 + skills * 15 + questions * 5) / 4) / 4),
    };
  };

  const progress = calculateProgress();

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
          <p className="text-gray-400">Based on your actual activities</p>
        </div>

        <div className="space-y-4">
          <ProgressBar percentage={progress.interview} label="🎤 Interview Practice" />
          <ProgressBar percentage={progress.resume} label="📄 Resume Work" />
          <ProgressBar percentage={progress.skills} label="🧠 Skills Development" />
          <ProgressBar percentage={progress.questions} label="❓ Questions Answered" />
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-indigo-500/20">
          <div className="flex-1 min-w-fit p-3 rounded-lg bg-indigo-600/10 border border-indigo-500/20">
            <p className="text-xs text-gray-400">Overall Progress</p>
            <p className="text-2xl font-bold text-cyan-400 mt-1">
              <AnimatedCounter value={progress.overall} />%
            </p>
          </div>
          <div className="flex-1 min-w-fit p-3 rounded-lg bg-purple-600/10 border border-purple-500/20">
            <p className="text-xs text-gray-400">Total Activities</p>
            <p className="text-lg font-bold text-purple-400 mt-1">{activities?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Achievement Badges - Based on real user data
function AchievementBadges({ activities }: any) {
  const calculateAchievements = () => {
    if (!activities || activities.length === 0) return [];

    const achievements = [];
    const interviews = activities.filter((a: any) => a.type === "interview").length;
    const questionsAnswered = activities.filter((a: any) => a.type === "question").length;
    const days = new Set(activities.map((a: any) => a.date || new Date().toDateString())).size;

    if (interviews > 0) achievements.push({ emoji: "🎤", label: "First Interview", earned: true });
    if (interviews >= 5) achievements.push({ emoji: "🔥", label: "5-Interview Club", earned: true });
    if (interviews >= 10) achievements.push({ emoji: "⭐", label: "Interview Master", earned: true });
    if (questionsAnswered >= 10) achievements.push({ emoji: "🎯", label: "10 Questions", earned: true });
    if (questionsAnswered >= 50) achievements.push({ emoji: "💯", label: "50 Questions", earned: true });
    if (days >= 5) achievements.push({ emoji: "🔥", label: "5-Day Streak", earned: true });

    return achievements.slice(0, 6);
  };

  const achievements = calculateAchievements();

  return (
    <div className="rounded-2xl p-6 border border-indigo-500/20" style={{
      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%)",
    }}>
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-yellow-400" />
        Achievements & Badges
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {achievements.length > 0 ? (
          achievements.map((badge, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-yellow-600/20 border-2 border-yellow-500/50 hover:scale-110 transition-all text-center"
            >
              <p className="text-2xl mb-1">{badge.emoji}</p>
              <p className="text-xs font-semibold text-yellow-400">{badge.label}</p>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center p-4 text-gray-400">
            <p className="text-sm">Start practicing to earn badges! 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Learning Path - Based on real user activities
function LearningPath({ activities }: any) {
  const hasInterviews = activities?.some((a: any) => a.type === "interview");
  const hasResume = activities?.some((a: any) => a.type === "resume");
  const hasQuestions = activities?.some((a: any) => a.type === "question");
  const hasSkills = activities?.some((a: any) => a.type === "skill");
  const totalActivities = activities?.length || 0;

  const steps = [
    { number: 1, title: "Start Practicing", icon: "🎤", completed: hasInterviews || hasQuestions },
    { number: 2, title: "Upload Resume", icon: "📄", completed: hasResume },
    { number: 3, title: "Learn Skills", icon: "🧠", completed: hasSkills },
    { number: 4, title: "Track Progress", icon: "📊", completed: totalActivities >= 5 },
    { number: 5, title: "Earn Badges", icon: "🏆", completed: totalActivities >= 10 },
  ];

  return (
    <div className="rounded-2xl p-6 border border-indigo-500/20" style={{
      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%)",
    }}>
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-indigo-400" />
        Your Learning Journey
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
    let savedActivities: any[] = [];

    try {
      const rawActivities = localStorage.getItem("activities");
      savedActivities = rawActivities ? JSON.parse(rawActivities) : [];
    } catch {
      savedActivities = [];
    }

    if (!Array.isArray(savedActivities)) {
      savedActivities = [];
    }

    setActivities(savedActivities.slice(0, 6));

    const interviewCount = savedActivities.filter((a: any) => a.type === "interview").length;
    const questionCount = savedActivities.filter((a: any) => a.type === "question").length;
    const skillCount = savedActivities.filter((a: any) => a.type === "skill").length;

    // Calculate real streak from activity dates
    let streakDays = 0;
    if (savedActivities.length > 0) {
      const dates = new Set(savedActivities.map((a: any) => a.date?.split("T")[0] || new Date().toISOString().split("T")[0]));
      streakDays = dates.size;
    }

    setStats({
      interviewsPracticed: interviewCount,
      questionsAnswered: questionCount,
      skillsLearned: skillCount,
      streakDays: streakDays,
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
          value={stats.interviewsPracticed}
          icon={Video}
          color="#818CF8"
        />
        <StatCard
          label="Questions Answered"
          value={stats.questionsAnswered}
          icon={MessageSquare}
          color="#06B6D4"
        />
        <StatCard
          label="Skills Mastered"
          value={stats.skillsLearned}
          icon={Award}
          color="#10B981"
        />
        <StatCard
          label="Streak 🔥"
          value={stats.streakDays}
          icon={Flame}
          color="#F59E0B"
        />
      </div>

      {/* User Progress Overview */}
      <UserProgressCard activities={activities} />

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
          <AchievementBadges activities={activities} />
          <LearningPath activities={activities} />
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
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-3" style={{letterSpacing: '-0.01em'}}>
          <span className="w-1 h-10 rounded-full bg-gradient-to-b from-indigo-600 to-cyan-600"></span>
          Advanced AI Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advancedFeatures.map((feature, idx) => (
            <UniqueButton key={idx} {...feature} />
          ))}
        </div>
      </div>

      {/* Basic Features */}
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-3" style={{letterSpacing: '-0.01em'}}>
          <span className="w-1 h-10 rounded-full bg-gradient-to-b from-cyan-600 to-indigo-600"></span>
          Core Training Tools
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {basicFeatures.map((feature, idx) => (
            <UniqueButton key={idx} {...feature} />
          ))}
        </div>
      </div>

      {/* Resume Upload CTA */}
      <div className="rounded-2xl p-8 border border-indigo-500/30 group hover:border-indigo-500/60 transition-all duration-500" style={{
        background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(56, 189, 248, 0.08) 100%)",
        backdropFilter: "blur(10px)",
      }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-3xl font-display font-bold text-white mb-2" style={{letterSpacing: '-0.01em'}}>Upload Your Resume</h3>
            <p className="text-gray-400 text-base leading-relaxed">Get instant AI analysis, ATS scoring, and optimization suggestions to land more interviews</p>
          </div>
          <button
            onClick={() => navigate("/resume-advanced")}
            className="flex-shrink-0 px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/40 group/btn"
          >
            <Upload className="w-4 h-4 inline mr-2 group-hover/btn:scale-110 transition-transform" />
            Analyze Resume
          </button>
        </div>
      </div>
    </div>
  );
}
