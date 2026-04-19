import { TrendingUp } from "lucide-react";

export default function PerformanceTracker() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">📊 Performance Tracker</h1>
        <p className="text-[#94A3B8]">Track your interview preparation journey and celebrate your progress</p>
      </section>

      {/* Empty State */}
      <section className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-lg bg-[#382FF6]/20">
            <TrendingUp className="h-12 w-12 text-[#382FF6]" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-white mb-3">No Performance Data Yet</h2>
        <p className="text-[#94A3B8] max-w-md mx-auto mb-8">
          Start practicing with our interviews and quizzes to see detailed performance metrics, progress charts, and improvement trends.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/interview/voice" className="px-6 py-3 rounded-lg bg-[#382FF6] text-white font-bold hover:shadow-[0_12px_30px_rgba(56,47,246,0.34)] transition-all">
            🎤 Start Voice Interview
          </a>
          <a href="/interview/video" className="px-6 py-3 rounded-lg border border-[#382FF6]/40 text-white font-bold hover:bg-[#382FF6]/10 transition-all">
            📹 Start Video Interview
          </a>
        </div>
      </section>

      {/* Info Cards */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <TrendingUp className="h-8 w-8 text-[#3B82F6] mb-3" />
          <h3 className="font-black text-white mb-2">Weekly Progress</h3>
          <p className="text-sm text-[#94A3B8]">Track how your scores improve week after week with detailed metrics.</p>
        </div>
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <TrendingUp className="h-8 w-8 text-[#10B981] mb-3" />
          <h3 className="font-black text-white mb-2">Performance Milestones</h3>
          <p className="text-sm text-[#94A3B8]">Celebrate your achievements as you reach new score thresholds and complete challenges.</p>
        </div>
      </section>
    </div>
  );
}
