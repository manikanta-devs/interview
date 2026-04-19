import React, { useState } from "react";
import { Loader, AlertCircle, Check, X, Target, Zap } from "lucide-react";
import unifiedAPIService from "../services/unifiedAPI";
import { parseResume, normalizeResumeText } from "../services/resumeParser";

export default function JDMatcher() {
  const [step, setStep] = useState("setup");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const text = await parseResume(file);
      setResumeText(normalizeResumeText(text));
      setStep("upload");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleAnalyze = async () => {
    if (!resumeText || !jdText) {
      setError("Please provide both resume and job description");
      return;
    }

    setLoading(true);
    setError("");
    
    const result = await unifiedAPIService.matchJDWithResume(resumeText, jdText);
    if (result.success) {
      try {
        const data = JSON.parse(result.data);
        setResults(data);
        setStep("results");
      } catch (e) {
        setResults({ rawFeedback: result.data });
        setStep("results");
      }
    } else {
      setError(result.error || "Analysis failed");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black gradient-text mb-2">JD Matcher</h1>
        <p className="text-gray-400">Match your resume with job descriptions</p>
      </div>

      {error && (
        <div className="glass rounded-xl p-4 border border-red-500/30">
          <p className="text-red-300 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </p>
        </div>
      )}

      {/* Resume Upload */}
      {(step === "setup" || step === "upload") && (
        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">1. Upload Your Resume</h3>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleResumeUpload}
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-900 border border-indigo-500 rounded-lg text-white"
            />
            {resumeText && <p className="text-green-400 text-sm mt-2">✓ Resume uploaded</p>}
          </div>

          {resumeText && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">2. Paste Job Description</h3>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Copy and paste the full job description here..."
                className="w-full h-48 p-4 bg-slate-900 border border-indigo-500 rounded-lg text-white placeholder-gray-500 resize-none"
              />

              <button
                onClick={handleAnalyze}
                disabled={loading || !jdText.trim()}
                className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    Match & Analyze
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {step === "results" && results && (
        <div className="space-y-6">
          {/* Overall Match Score */}
          {results.overallMatch && (
            <div className="glass rounded-xl p-6 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Overall Match</h3>
                <p className="text-5xl font-black gradient-text">{results.overallMatch}%</p>
              </div>
              <p className="text-gray-300">
                {results.overallMatch >= 80
                  ? "Excellent match! You meet most requirements."
                  : results.overallMatch >= 60
                  ? "Good match. Consider learning the missing skills."
                  : "Room for improvement. Focus on key skills."}
              </p>
            </div>
          )}

          {/* Score Breakdown */}
          {results.breakdown && (
            <div className="grid md:grid-cols-4 gap-4">
              {Object.entries(results.breakdown).map(([key, value]) => (
                <div key={key} className="glass rounded-xl p-4 border border-indigo-500/30 text-center">
                  <p className="text-2xl font-black gradient-text mb-2">{value}</p>
                  <p className="font-bold text-white text-sm capitalize">{key.replace(/Match/, "")}</p>
                </div>
              ))}
            </div>
          )}

          {/* Matched Skills */}
          {results.matchedSkills && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Your Matching Skills</h3>
              <div className="space-y-2">
                {results.matchedSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <span className="text-green-300">{skill.skill}</span>
                    <span className="text-green-400 font-bold">{skill.match}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {results.missingSkills && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Skills to Develop</h3>
              <div className="space-y-2">
                {results.missingSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <span className="text-orange-300">{skill.skill}</span>
                    <span className={skill.canLearn ? "text-amber-400 text-sm" : "text-red-400 text-sm"}>
                      {skill.canLearn ? "Learnable" : "Required"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {results.recommendations && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Interview Focus Areas</h3>
              <ul className="space-y-3">
                {results.interviewFocusAreas?.map((area, idx) => (
                  <li key={idx} className="flex gap-3 p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                    <Zap className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <span className="text-gray-200">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Raw Feedback */}
          {results.rawFeedback && !results.overallMatch && (
            <div className="glass rounded-xl p-6">
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-sm">{results.rawFeedback}</p>
            </div>
          )}

          <button
            onClick={() => {
              setResumeText("");
              setJdText("");
              setResults(null);
              setStep("setup");
              setError("");
            }}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all"
          >
            Try Another Job Description
          </button>
        </div>
      )}
    </div>
  );
}
