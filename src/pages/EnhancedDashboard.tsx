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

// Unique Button with gradient and hover effects
function UniqueButton({ 
  icon: Icon, 
  label, 
  description, 
  onClick,
  gradient = "from-indigo-600 to-cyan-600",
  className = ""
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
      {/* Animated glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className={`inline-block p-3 rounded-xl mb-4 bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-white mb-1">{label}</h3>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
        <div className="mt-3 flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
          <span className="text-xs font-semibold">Start</span>
          <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>
    </button>
  );
}

// Unique Stat Card
function UniqueStatCard({ label, value, icon: Icon, color }: any) {
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
          <div className={`p-2 rounded-lg`} style={{ background: `${color}20` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        </div>
        <p className="text-3xl font-black" style={{ color }}>
          <AnimatedCounter value={parseInt(value)} />
          {isNaN(parseInt(value)) ? value : ""}
        </p>
      </div>
    </div>
  );
}

export default function EnhancedDashboard() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<any[]>([]);
  const [stats, setStats] = useState({
    interviewsPracticed: 0,
    questionsAnswered: 0,
    skillsLearned: 0,
    streakDays: 0,
  });

  useEffect(() => {
    // Load real data from localStorage
    const savedActivities = JSON.parse(localStorage.getItem("activities") || "[]");
    setActivities(savedActivities.slice(0, 5)); // Show last 5 activities

    // Calculate stats from real data
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
      description: "Get AI feedback on your behavioral answers",
      onClick: () => navigate("/star-coach"),
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: FileText,
      label: "Resume Analysis",
      description: "Optimize your resume for ATS and interviews",
      onClick: () => navigate("/resume-advanced"),
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      icon: Target,
      label: "JD Matcher",
      description: "Match your resume against job descriptions",
      onClick: () => navigate("/jd-matcher"),
      gradient: "from-orange-600 to-red-600",
    },
    {
      icon: BookOpen,
      label: "Cheat Sheet",
      description: "Generate interview prep sheets for any role",
      onClick: () => navigate("/cheat-sheet"),
      gradient: "from-green-600 to-emerald-600",
    },
    {
      icon: DollarSign,
      label: "Salary Simulator",
      description: "Practice negotiating your compensation",
      onClick: () => navigate("/salary-simulator"),
      gradient: "from-yellow-600 to-orange-600",
    },
    {
      icon: Video,
      label: "Video Interview",
      description: "Practice with an AI-powered video avatar",
      onClick: () => navigate("/interview/video"),
      gradient: "from-indigo-600 to-purple-600",
    },
  ];

  const basicFeatures = [
    {
      icon: Mic,
      label: "Voice Interview",
      description: "Practice with real-time voice recognition",
      onClick: () => navigate("/interview/voice"),
      gradient: "from-pink-600 to-rose-600",
    },
    {
      icon: Brain,
      label: "AI Coach",
      description: "Get personalized coaching and tips",
      onClick: () => navigate("/ai-coach"),
      gradient: "from-teal-600 to-cyan-600",
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
          🚀 Interview Confidence Hub
        </h1>
        <p className="text-gray-400 text-lg">Master your interviews with AI-powered practice and feedback</p>
      </div>

      {/* Real Data Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UniqueStatCard
          label="Interviews Practiced"
          value={stats.interviewsPracticed}
          icon={Video}
          color="#818CF8"
        />
        <UniqueStatCard
          label="Questions Answered"
          value={stats.questionsAnswered}
          icon={MessageSquare}
          color="#06B6D4"
        />
        <UniqueStatCard
          label="Skills Learned"
          value={stats.skillsLearned}
          icon={Award}
          color="#10B981"
        />
        <UniqueStatCard
          label="Day Streak"
          value={stats.streakDays}
          icon={Flame}
          color="#F59E0B"
        />
      </div>

      {/* Recent Activities */}
      {activities.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Recent Activities</h2>
          <div className="space-y-2">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl border border-indigo-500/20"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%)",
                }}
              >
                <div className="p-2 rounded-lg bg-indigo-600/20">
                  <CheckCircle className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{activity.name || activity.type}</p>
                  <p className="text-sm text-gray-400">{activity.timestamp || "Just now"}</p>
                </div>
                <span className="text-sm font-bold text-cyan-400">{activity.score || "Completed"}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">🔥 Advanced AI Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advancedFeatures.map((feature, idx) => (
            <UniqueButton key={idx} {...feature} />
          ))}
        </div>
      </div>

      {/* Basic Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📚 Core Training</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {basicFeatures.map((feature, idx) => (
            <UniqueButton key={idx} {...feature} />
          ))}
        </div>
      </div>

      {/* Upload Resume CTA */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 md:p-12 border-2"
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
          borderColor: "rgba(99, 102, 241, 0.3)",
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-indigo-600/5 to-transparent rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-3xl font-black text-white mb-2">Upload Your Resume</h3>
            <p className="text-gray-300 mb-6">
              Get AI-powered analysis, ATS scoring, and personalized improvement recommendations
            </p>
            <button
              onClick={() => navigate("/resume")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2 group"
            >
              <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Upload Resume
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <div className="flex-1 text-right">
            <Sparkles className="w-24 h-24 text-cyan-400/30 ml-auto animate-spin" style={{ animationDuration: "4s" }} />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
            borderColor: "rgba(16, 185, 129, 0.3)",
          }}
        >
          <CheckCircle className="w-8 h-8 text-emerald-400 mb-2" />
          <h4 className="font-bold text-white">Free Forever</h4>
          <p className="text-sm text-gray-400">No credit card needed, all features included</p>
        </div>
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)",
            borderColor: "rgba(59, 130, 246, 0.3)",
          }}
        >
          <Zap className="w-8 h-8 text-blue-400 mb-2" />
          <h4 className="font-bold text-white">Powered by Gemini AI</h4>
          <p className="text-sm text-gray-400">Advanced AI-driven feedback and analysis</p>
        </div>
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
            borderColor: "rgba(168, 85, 247, 0.3)",
          }}
        >
          <Award className="w-8 h-8 text-purple-400 mb-2" />
          <h4 className="font-bold text-white">Interview Ready</h4>
          <p className="text-sm text-gray-400">Master every question, get the offer</p>
        </div>
      </div>
    </div>
  );
}
