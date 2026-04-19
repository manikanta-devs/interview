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
import { UnifiedLogo } from "./UnifiedLogo";

const navItems = [
  // CORE FEATURES
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, category: "Core" },
  
  // ADVANCED FEATURES
  { label: "📊 Advanced Analytics", path: "/dashboard-advanced", icon: TrendingUp, category: "Advanced", badge: "Advanced" },
  { label: "Resume Analysis", path: "/resume-advanced", icon: Brain, category: "Advanced", badge: "Advanced" },
  { label: "🎯 JD Matcher", path: "/jd-matcher", icon: Target, category: "Advanced", badge: "Advanced" },
  
  // INTERVIEWS
  { label: "🎤 Voice Interview", path: "/interview/voice", icon: Mic, category: "Core" },
  { label: "🎥 Video Interview (AI Avatar)", path: "/interview/video", icon: Video, category: "Core", badge: "UPGRADED" },
  { label: "📝 Quiz", path: "/quiz", icon: ClipboardList, category: "Core" },
  
  // COACHING
  { label: "⭐ STAR Coach", path: "/star-coach", icon: Award, category: "Advanced", badge: "Advanced" },
  { label: "💰 Salary Negotiation", path: "/salary-simulator", icon: DollarSign, category: "Advanced", badge: "Advanced" },
  { label: "📋 Cheat Sheet", path: "/cheat-sheet", icon: FileCheck, category: "Advanced", badge: "Advanced" },
  
  // RESULTS
  { label: "Reports", path: "/results", icon: BarChart3, category: "Core" },
];

export default function Sidebar() {
  const grouped = navItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/8 bg-slate-950/90 px-5 py-6 lg:flex lg:flex-col overflow-y-auto backdrop-blur-xl">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2 flex-shrink-0">
        <UnifiedLogo size="md" animated={true} />
        <div>
          <p className="text-lg font-black tracking-tight text-white">
            Nex<span className="text-violet-300">Hire</span>
          </p>
          <p className="text-xs font-semibold text-slate-400">
            Interview Intelligence
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-6 flex-1 overflow-y-auto">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="space-y-2">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">
              {category === "Advanced" && "🚀 "}
              {category}
            </p>
            <div className="space-y-1.5">
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={`${item.label}-${index}`}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all"
                        : "flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                    }
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="rounded-full px-2 py-0.5 text-xs font-black whitespace-nowrap flex-shrink-0 bg-gradient-to-r from-violet-500 to-indigo-500 text-white">
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
