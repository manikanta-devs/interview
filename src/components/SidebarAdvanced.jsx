import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Mic,
  Video,
  LogOut,
  Settings,
  Zap,
  Brain,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Award,
  Target,
  DollarSign,
  FileCheck,
} from "lucide-react";
import { LogoOption3 } from "./LogoOptions.tsx"; // Dynamic Arrow

const navItems = [
  // CORE FEATURES
  { label: "Dashboard (Basic)", path: "/dashboard", icon: LayoutDashboard, category: "Core" },
  
  // ADVANCED ANALYTICS
  { label: "📊 Advanced Analytics", path: "/dashboard-advanced", icon: TrendingUp, category: "Advanced", badge: "Advanced" },
  
  // RESUME ANALYSIS
  { label: "Resume (Basic)", path: "/resume", icon: FileText, category: "Core" },
  { label: "🧠 Resume Analysis Pro", path: "/resume-advanced", icon: Brain, category: "Advanced", badge: "Advanced" },
  { label: "🎯 JD Matcher", path: "/jd-matcher", icon: Target, category: "Advanced", badge: "Advanced" },
  
  // INTERVIEWS
  { label: "Voice Interview", path: "/interview/voice", icon: Mic, category: "Core" },
  { label: "Video Interview", path: "/interview/video", icon: Video, category: "Core" },
  { label: "Online Quiz", path: "/quiz", icon: ClipboardList, category: "Core" },
  
  // ADVANCED COACHING
  { label: "⭐ STAR Answer Coach", path: "/star-coach", icon: Award, category: "Advanced", badge: "Advanced" },
  { label: "💰 Salary Negotiation", path: "/salary-simulator", icon: DollarSign, category: "Advanced", badge: "Advanced" },
  { label: "📋 Cheat Sheet", path: "/cheat-sheet", icon: FileCheck, category: "Advanced", badge: "Advanced" },
  
  // RESULTS & ANALYTICS
  { label: "Reports", path: "/results", icon: BarChart3, category: "Core" },
  
  // FEATURES
  { label: "Gamification", path: "/gamification", icon: Zap, category: "Features", badge: "New" },
  { label: "AI Coach", path: "/ai-coach", icon: Brain, category: "Features", badge: "New" },
  { label: "Weak Spot Analysis", path: "/weak-spots", icon: AlertCircle, category: "Features", badge: "New" },
  { label: "Performance Tracker", path: "/performance", icon: TrendingUp, category: "Features", badge: "New" },
  { label: "Skills Academy", path: "/skills-academy", icon: BookOpen, category: "Features", badge: "New" },
];

export default function Sidebar() {
  // Group items by category
  const grouped = navItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/8 bg-slate-950/90 px-5 py-6 shadow-[18px_0_50px_rgba(0,0,0,0.35)] lg:flex lg:flex-col overflow-y-auto backdrop-blur-xl">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 flex-shrink-0">
        <div className="logo-mark">
          <LogoOption3 size="md" animated={true} className="rounded-lg" />
        </div>
        <div>
          <p className="text-2xl font-black tracking-tight text-white">
            Nex<span className="text-violet-300">Hire</span>
          </p>
          <p className="text-xs font-semibold text-slate-400">
            AI Interview Intelligence
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-6 flex-1 overflow-y-auto">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="space-y-2">
            {/* Category Label */}
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">
              {category === "Advanced" && "🚀 "}
              {category}
            </p>

            {/* Items */}
            <div className="space-y-1.5">
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={`${item.label}-${index}`}
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        "group flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                        isActive
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_12px_30px_rgba(124,58,237,0.34)]"
                          : "text-slate-400 hover:bg-white/5 hover:text-white",
                      ].join(" ")
                    }
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={[
                        "rounded-full px-2 py-0.5 text-xs font-black whitespace-nowrap flex-shrink-0",
                        item.badge === "Advanced" 
                          ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
                          : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      ].join(" ")}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="space-y-4 border-t border-white/8 pt-4 flex-shrink-0">
        <button className="w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-all">
          <Settings className="h-4 w-4" />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
