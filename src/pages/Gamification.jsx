import { Zap } from "lucide-react";

export default function Gamification() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          🎮 Level Up Your Skills
        </h1>
        <p className="text-[#94A3B8]">
          Earn XP, unlock badges, and climb the leaderboard!
        </p>
      </section>

      {/* Empty State */}
      <section className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-lg bg-[#382FF6]/20">
            <Zap className="h-12 w-12 text-[#382FF6]" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-white mb-3">
          Start Earning XP
        </h2>
        <p className="text-[#94A3B8] max-w-md mx-auto mb-8">
          Complete interviews, quizzes, and challenges to earn experience
          points, unlock badges, and climb the leaderboard!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/interview/voice"
            className="px-6 py-3 rounded-lg bg-[#382FF6] text-white font-bold hover:shadow-[0_12px_30px_rgba(56,47,246,0.34)] transition-all"
          >
            🎤 Start Interview & Earn XP
          </a>
          <a
            href="/quiz"
            className="px-6 py-3 rounded-lg border border-[#382FF6]/40 text-white font-bold hover:bg-[#382FF6]/10 transition-all"
          >
            📝 Take Quiz
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <Zap className="h-8 w-8 text-yellow-400 mb-3" />
          <h3 className="font-black text-white mb-2">Earn XP Points</h3>
          <p className="text-sm text-[#94A3B8]">
            Gain experience for every interview completed and challenge
            finished.
          </p>
        </div>
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <Zap className="h-8 w-8 text-purple-400 mb-3" />
          <h3 className="font-black text-white mb-2">Unlock Badges</h3>
          <p className="text-sm text-[#94A3B8]">
            Earn special badges by reaching milestones and achievements.
          </p>
        </div>
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <Zap className="h-8 w-8 text-green-400 mb-3" />
          <h3 className="font-black text-white mb-2">Level Up</h3>
          <p className="text-sm text-[#94A3B8]">
            Progress through levels as you accumulate XP and improve your
            skills.
          </p>
        </div>
      </section>
    </div>
  );
}
