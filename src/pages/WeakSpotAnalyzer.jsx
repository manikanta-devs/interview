import { AlertCircle, Zap, Target } from "lucide-react";

export default function WeakSpotAnalyzer() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">🔍 Weak Spot Analyzer</h1>
        <p className="text-[#94A3B8]">AI-powered insights to identify and fix your interview weaknesses</p>
      </section>

      {/* Empty State */}
      <section className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-lg bg-[#382FF6]/20">
            <AlertCircle className="h-12 w-12 text-[#382FF6]" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-white mb-3">No Analysis Data Yet</h2>
        <p className="text-[#94A3B8] max-w-md mx-auto mb-8">
          Complete voice interviews, video interviews, or quizzes to generate detailed analysis of your weak spots and areas for improvement.
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
      <section className="grid md:grid-cols-3 gap-6">
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <Target className="h-8 w-8 text-[#3B82F6] mb-3" />
          <h3 className="font-black text-white mb-2">Communication Skills</h3>
          <p className="text-sm text-[#94A3B8]">Analyze filler words, pacing, tone, and clarity from your interviews.</p>
        </div>
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <AlertCircle className="h-8 w-8 text-[#F59E0B] mb-3" />
          <h3 className="font-black text-white mb-2">Content Quality</h3>
          <p className="text-sm text-[#94A3B8]">Get insights on answer completeness, examples, and depth of responses.</p>
        </div>
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <Zap className="h-8 w-8 text-[#10B981] mb-3" />
          <h3 className="font-black text-white mb-2">Confidence Metrics</h3>
          <p className="text-sm text-[#94A3B8]">Track body language, eye contact, and confidence levels over time.</p>
        </div>
      </section>
    </div>
  );
}
