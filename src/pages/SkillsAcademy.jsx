import { BookOpen } from "lucide-react";

export default function SkillsAcademy() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">🎓 Skills Academy</h1>
        <p className="text-[#94A3B8]">Structured learning paths to master interview skills</p>
      </section>

      {/* Empty State */}
      <section className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-lg bg-[#382FF6]/20">
            <BookOpen className="h-12 w-12 text-[#382FF6]" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-white mb-3">Skills Academy Coming Soon</h2>
        <p className="text-[#94A3B8] max-w-md mx-auto mb-8">
          Interactive courses and learning paths to master every aspect of interview preparation are coming soon. Check back soon for updates!
        </p>
        <a href="/dashboard" className="inline-block rounded-lg bg-violet-600 px-6 py-3 font-bold text-white transition-all hover:shadow-[0_12px_30px_rgba(56,47,246,0.34)]">
          Back to Dashboard
        </a>
      </section>

      {/* Info Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <BookOpen className="h-8 w-8 text-[#3B82F6] mb-3" />
          <h3 className="font-black text-white mb-2">Structured Courses</h3>
          <p className="text-sm text-[#94A3B8]">Step-by-step learning paths created by interview experts.</p>
        </div>
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <BookOpen className="h-8 w-8 text-[#10B981] mb-3" />
          <h3 className="font-black text-white mb-2">Progress Tracking</h3>
          <p className="text-sm text-[#94A3B8]">Monitor your learning progress across all courses.</p>
        </div>
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a]/60 p-6">
          <BookOpen className="h-8 w-8 text-[#F59E0B] mb-3" />
          <h3 className="font-black text-white mb-2">Certifications</h3>
          <p className="text-sm text-[#94A3B8]">Earn certificates upon completing skill-based learning paths.</p>
        </div>
      </section>
    </div>
  );
}

