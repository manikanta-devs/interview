import React, { useState } from "react";
import { Loader, AlertCircle, CheckCircle, Lightbulb, Award, Copy, Zap } from "lucide-react";
import unifiedAPIService from "../services/unifiedAPI";

const STAR_QUESTIONS = [
  "Tell me about a time you faced a difficult challenge at work. How did you handle it?",
  "Describe a situation where you had to work with a difficult team member.",
  "Give me an example of when you showed leadership.",
  "Tell me about a time you failed and what you learned from it.",
  "Describe a project where you had to learn something new quickly.",
  "Give an example of when you went above and beyond your job responsibilities.",
  "Tell me about a time you had to meet a tight deadline.",
  "Describe a situation where you had to persuade someone to your point of view.",
];

export default function STARCoach() {
  const [step, setStep] = useState("question");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [targetRole, setTargetRole] = useState("");

  const handleAnalyze = async () => {
    if (!userAnswer.trim()) {
      setError("Please provide an answer");
      return;
    }

    setLoading(true);
    setError("");

    const result = await unifiedAPIService.coachSTARAnswer(userAnswer, targetRole);
    if (result.success) {
      try {
        const data = JSON.parse(result.data);
        setAnalysis(data);
        setStep("analysis");
      } catch (e) {
        setAnalysis({ rawFeedback: result.data });
        setStep("analysis");
      }
    } else {
      setError(result.error || "Analysis failed");
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black gradient-text mb-2">STAR Answer Coach</h1>
        <p className="text-gray-400">Learn to structure perfect behavioral answers</p>
      </div>

      {/* STAR Method Explanation */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { letter: "S", title: "Situation", desc: "Set the scene" },
          { letter: "T", title: "Task", desc: "What was your role?" },
          { letter: "A", title: "Action", desc: "What did you do?" },
          { letter: "R", title: "Result", desc: "What happened?" },
        ].map((item) => (
          <div key={item.letter} className="glass rounded-xl p-4 border border-indigo-500/30 text-center">
            <p className="text-3xl font-black gradient-text mb-2">{item.letter}</p>
            <p className="font-bold text-white text-sm mb-1">{item.title}</p>
            <p className="text-gray-400 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="glass rounded-xl p-4 border border-red-500/30 bg-red-500/5">
          <p className="text-red-300 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </p>
        </div>
      )}

      {/* Question Selection */}
      {step === "question" && (
        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Select a Question</h3>
            <div className="space-y-2">
              {STAR_QUESTIONS.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedQuestion(question);
                    setStep("answer");
                  }}
                  className="w-full p-4 text-left rounded-lg border border-indigo-500/30 hover:bg-indigo-500/10 transition-all text-gray-200 hover:text-white font-medium"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Or Ask Your Own</h3>
            <input
              type="text"
              placeholder="Type a behavioral interview question..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  setSelectedQuestion(e.currentTarget.value);
                  setStep("answer");
                }
              }}
              className="w-full px-4 py-3 bg-slate-900 border border-indigo-500 rounded-lg text-white placeholder-gray-500"
            />
          </div>
        </div>
      )}

      {/* Answer Input */}
      {step === "answer" && selectedQuestion && (
        <div className="space-y-6">
          <div className="glass rounded-xl p-6 border border-cyan-500/30">
            <p className="text-gray-400 text-sm mb-2">Question</p>
            <p className="text-lg font-bold text-white">{selectedQuestion}</p>
          </div>

          <div className="glass rounded-xl p-6">
            <label className="block mb-3">
              <p className="text-white font-bold mb-2">Your Target Role (Optional)</p>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g., Senior Product Manager"
                className="w-full px-4 py-2 bg-slate-900 border border-indigo-500 rounded-lg text-white placeholder-gray-500"
              />
            </label>

            <label className="block">
              <p className="text-white font-bold mb-2">Your Answer</p>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer following the STAR method..."
                className="w-full h-48 p-4 bg-slate-900 border border-indigo-500 rounded-lg text-white placeholder-gray-500 resize-none"
              />
            </label>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setStep("question");
                  setSelectedQuestion("");
                  setUserAnswer("");
                }}
                className="flex-1 px-6 py-3 rounded-lg border border-indigo-500 text-indigo-300 font-bold hover:bg-indigo-500/10 transition-all"
              >
                Change Question
              </button>
              <button
                onClick={handleAnalyze}
                disabled={loading || !userAnswer.trim()}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-5 h-5" />
                    Get Feedback
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {step === "analysis" && analysis && (
        <div className="space-y-6">
          {/* STAR Analysis Breakdown */}
          {analysis.starAnalysis && (
            <div className="grid md:grid-cols-4 gap-4">
              {Object.entries(analysis.starAnalysis).map(([key, data]) => (
                <div key={key} className="glass rounded-xl p-4 border border-indigo-500/30">
                  <p className="text-2xl font-black gradient-text mb-2">{data.score}</p>
                  <p className="font-bold text-white text-sm capitalize mb-3">{key}</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{data.feedback}</p>
                </div>
              ))}
            </div>
          )}

          {/* Overall Score */}
          {analysis.overallScore && (
            <div className="glass rounded-xl p-6 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">STAR Method Score</h3>
                <p className="text-4xl font-black gradient-text">{analysis.overallScore}</p>
              </div>
              <p className="text-gray-300 text-sm">
                {analysis.overallScore >= 85
                  ? "⭐ Excellent! Almost perfect STAR response structure."
                  : analysis.overallScore >= 70
                  ? "✅ Good STAR structure with minor improvements needed."
                  : "📚 Room for improvement - focus on specific examples."}
              </p>
            </div>
          )}

          {/* Perfect Answer Example */}
          {analysis.perfectAnswer && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Perfect STAR Answer Example
              </h3>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-indigo-500/20 mb-4">
                <p className="text-gray-200 leading-relaxed text-sm">{analysis.perfectAnswer}</p>
              </div>
              <button
                onClick={() => copyToClipboard(analysis.perfectAnswer)}
                className="w-full px-4 py-2 rounded-lg border border-indigo-500 text-indigo-300 hover:bg-indigo-500/10 transition-all flex items-center justify-center gap-2 font-bold text-sm"
              >
                <Copy className="w-4 h-4" />
                Copy Example Answer
              </button>
            </div>
          )}

          {/* Keywords */}
          {analysis.keywords && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Strong Action Words to Use</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-sm font-bold">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {analysis.tips && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Pro Tips
              </h3>
              <ul className="space-y-3">
                {analysis.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                    <span className="text-indigo-400 font-bold text-lg">✓</span>
                    <span className="text-gray-200 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Raw Feedback (fallback) */}
          {analysis.rawFeedback && !analysis.overallScore && (
            <div className="glass rounded-xl p-6">
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-sm">{analysis.rawFeedback}</p>
            </div>
          )}

          <button
            onClick={() => {
              setStep("question");
              setSelectedQuestion("");
              setUserAnswer("");
              setAnalysis(null);
            }}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Try Another Question
          </button>
        </div>
      )}
    </div>
  );
}
