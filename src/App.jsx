import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./styles/designSystem.css";
import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.jsx";
import LandingPage from "./pages/PremiumLanding.tsx"; // Premium landing page with 3D animations
import EnhancedDashboard from "./pages/EnhancedDashboardPro.tsx"; // Professional dashboard
import AdvancedDashboard from "./pages/AdvancedDashboard.tsx"; // ADVANCED Analytics
import Dashboard from "./pages/DashboardNew.tsx"; // Professional version
import Resume from "./pages/Resume.jsx";
import AdvancedResumeAnalysis from "./pages/AdvancedResumeAnalysis.tsx"; // ADVANCED Resume
import VoiceInterview from "./pages/VoiceInterviewNew.tsx"; // Professional version
import VideoInterview from "./pages/VideoInterviewNew.tsx"; // Professional version - Now with 2D AI Avatar
import JDMatcher from "./pages/JDMatcher.tsx"; // NEW: JD vs Resume match
import Quiz from "./pages/Quiz.jsx";
import Results from "./pages/ResultsNew.tsx"; // Professional version
import STARCoach from "./pages/STARCoach.tsx"; // NEW: STAR Answer Coach
import SalarySimulator from "./pages/SalarySimulator.tsx"; // NEW: Salary Negotiation
import CheatSheetGenerator from "./pages/CheatSheetGenerator.tsx"; // NEW: Cheat Sheet
import Gamification from "./pages/Gamification.jsx";
import AICoach from "./pages/AICoach.jsx";
import WeakSpotAnalyzer from "./pages/WeakSpotAnalyzer.jsx";
import PerformanceTracker from "./pages/PerformanceTracker.jsx";
import SkillsAcademy from "./pages/SkillsAcademy.jsx";

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen overflow-hidden text-slate-200">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.16),transparent_0_32%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.14),transparent_0_28%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:auto,auto,44px_44px,44px_44px]" />

      {isLanding ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      ) : (
        <>
          <Sidebar />
          <div className="min-h-screen lg:pl-72">
            <Navbar />
            <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-5 sm:px-6 lg:px-8">
              <Routes>
                {/* Landing & Dashboard */}
                <Route path="/dashboard" element={<EnhancedDashboard />} />
                
                {/* Advanced Features */}
                <Route path="/dashboard-advanced" element={<AdvancedDashboard />} />
                <Route path="/resume-advanced" element={<AdvancedResumeAnalysis />} />
                <Route path="/jd-matcher" element={<JDMatcher />} />
                <Route path="/star-coach" element={<STARCoach />} />
                <Route path="/salary-simulator" element={<SalarySimulator />} />
                <Route path="/cheat-sheet" element={<CheatSheetGenerator />} />
                
                {/* Standard Features */}
                <Route path="/resume" element={<Resume />} />
                <Route path="/interview/voice" element={<VoiceInterview />} />
                <Route path="/interview/video" element={<VideoInterview />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/results" element={<Results />} />
                <Route path="/dashboard-classic" element={<Dashboard />} />
                <Route path="/gamification" element={<Gamification />} />
                <Route path="/ai-coach" element={<AICoach />} />
                <Route path="/weak-spots" element={<WeakSpotAnalyzer />} />
                <Route path="/performance" element={<PerformanceTracker />} />
                <Route path="/skills-academy" element={<SkillsAcademy />} />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </main>
          </div>
        </>
      )}
    </div>
  );
}
