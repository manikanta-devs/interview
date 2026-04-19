import { useEffect, useState } from "react";
import { ChevronRight, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import { interviewTracker, InterviewSession } from "../services/interviewTracker";

export default function ResultsPage() {
  const [lastSession, setLastSession] = useState<InterviewSession | null>(null);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const sessions = interviewTracker.getAllSessions().filter((s) => s.completed);
    if (sessions.length > 0) {
      setLastSession(sessions[sessions.length - 1]);
    }
    setMetrics(interviewTracker.getMetrics());
  }, []);

  if (!lastSession || !metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">No interview data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-2">Interview Results</h1>
          <p className="text-slate-400">Here's how you performed in this interview</p>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-2xl p-12 mb-8 text-center">
          <p className="text-slate-400 mb-4 uppercase tracking-wider text-sm">Overall Score</p>
          <p className="text-7xl font-black text-violet-400 mb-4">{lastSession.overallScore}</p>
          <p className="text-slate-300">
            {lastSession.overallScore >= 80
              ? "Excellent performance! Great job!"
              : lastSession.overallScore >= 70
              ? "Good performance. Keep practicing!"
              : lastSession.overallScore >= 60
              ? "Average performance. Focus on improvement areas."
              : "Below average. More practice needed."}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Questions Answered</p>
            <p className="text-3xl font-black text-blue-400">{lastSession.answers.length}</p>
          </div>
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Interview Duration</p>
            <p className="text-3xl font-black text-green-400">{Math.round((lastSession.duration || 0) / 60)}m</p>
          </div>
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Interview Type</p>
            <p className="text-3xl font-black text-purple-400 capitalize">{lastSession.type}</p>
          </div>
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Interviews Completed</p>
            <p className="text-3xl font-black text-violet-400">{metrics.totalInterviews}</p>
          </div>
        </div>

        {/* Answer Breakdown */}
        <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-white font-bold text-lg mb-6">Answer Breakdown</h2>
          <div className="space-y-4">
            {lastSession.answers.map((answer, idx) => (
              <div key={idx} className="bg-slate-950/50 rounded-lg p-4 border border-white/5">
                <p className="text-white font-bold mb-2">Q{idx + 1}: {answer.question}</p>
                <p className="text-slate-400 text-sm mb-3">{answer.userAnswer}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Score</p>
                    <p className="text-lg font-black text-blue-400">{Math.round(answer.aiScore)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Fluency</p>
                    <p className="text-lg font-black text-cyan-400">{Math.round(answer.fluency)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Confidence</p>
                    <p className="text-lg font-black text-green-400">{Math.round(answer.confidence)}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mt-3 italic">{answer.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        {lastSession.strengths.length > 0 && (
          <div className="bg-green-600/10 border border-green-500/30 rounded-2xl p-8 mb-8">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              Your Strengths
            </h2>
            <div className="space-y-2">
              {lastSession.strengths.map((strength, idx) => (
                <p key={idx} className="text-green-300 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  {strength}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Improvement Areas */}
        {lastSession.improvementAreas.length > 0 && (
          <div className="bg-orange-600/10 border border-orange-500/30 rounded-2xl p-8 mb-8">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-orange-400" />
              Areas to Improve
            </h2>
            <div className="space-y-2">
              {lastSession.improvementAreas.map((area, idx) => (
                <p key={idx} className="text-orange-300 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-400" />
                  {area}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Session Stats */}
        <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-violet-400" />
            Your Progress
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Average Score</p>
              <p className="text-2xl font-black text-violet-400">{metrics.averageScore}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Best Score</p>
              <p className="text-2xl font-black text-green-400">{metrics.bestScore}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Practice Time</p>
              <p className="text-2xl font-black text-cyan-400">{Math.round(metrics.totalMinutes)}m</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Answers</p>
              <p className="text-2xl font-black text-blue-400">{metrics.totalAnswers}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => window.location.href = "/dashboard"}
            className="px-6 py-4 rounded-lg border border-white/20 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => window.location.href = "/interview/voice"}
            className="px-6 py-4 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Practice Again
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
