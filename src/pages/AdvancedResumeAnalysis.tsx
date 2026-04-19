import React, { useState } from "react";
import { Upload, Loader, AlertCircle, CheckCircle } from "lucide-react";
import unifiedAPIService from "../services/unifiedAPI";
import { parseResume, normalizeResumeText } from "../services/resumeParser";

export default function AdvancedResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const processFile = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);
    setError("");

    try {
      const text = await parseResume(selectedFile);
      const normalized = normalizeResumeText(text);
      setResumeText(normalized);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files?.[0];
    processFile(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    processFile(droppedFile);
  };

  const handleAnalyze = async () => {
    if (!resumeText) {
      setError("Please upload a resume first");
      return;
    }

    setLoading(true);
    setError("");

    const result = await unifiedAPIService.analyzeResume(resumeText, targetRole);
    if (result.success) {
      try {
        const data = JSON.parse(result.data);
        setAnalysis(data);
      } catch (e) {
        setAnalysis({ rawFeedback: result.data });
      }
    } else {
      setError(result.error || "Analysis failed");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black gradient-text mb-2">Resume Analysis Pro</h1>
        <p className="text-gray-400">AI-powered resume optimization and ATS scoring</p>
      </div>

      {error && (
        <div className="glass rounded-xl p-4 border border-red-500/30">
          <p className="text-red-300 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </p>
        </div>
      )}

      {/* File Upload - Drag Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-2xl p-8 border-2 border-dashed transition-all ${
          dragActive
            ? "border-cyan-400 bg-cyan-500/10"
            : resumeText
            ? "border-green-500/50 bg-green-500/5"
            : "border-indigo-500/50 bg-indigo-500/5 hover:border-indigo-400"
        }`}
      >
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.docx,.txt"
          onChange={handleFileUpload}
          disabled={loading}
          className="hidden"
        />
        <label htmlFor="resume-upload" className="block cursor-pointer">
          <div className="text-center">
            <div className="mb-4">
              <Upload className="w-12 h-12 mx-auto text-indigo-400" />
            </div>
            <p className="text-white font-bold text-lg mb-1">
              {resumeText ? "✓ Resume Ready" : "Upload Your Resume"}
            </p>
            <p className="text-gray-400 text-sm">
              {resumeText
                ? `File: ${file?.name || "Selected"}`
                : "Drag and drop or click to select PDF, DOCX, or TXT"}
            </p>
            {!resumeText && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("resume-upload").click();
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-sm font-semibold hover:shadow-lg transition-all"
              >
                Choose File
              </button>
            )}
          </div>
        </label>
      </div>

      {/* Target Role (Optional) */}
      {resumeText && (
        <div className="glass rounded-xl p-6">
          <label className="block">
            <p className="text-white font-bold mb-2">2. Target Role (Optional)</p>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g., Senior Product Manager"
              className="w-full px-4 py-2 bg-slate-900 border border-indigo-500 rounded-lg text-white placeholder-gray-500 mb-4"
            />
          </label>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Analyze Resume
              </>
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Overall Scores */}
          {(analysis.score || analysis.atsScore) && (
            <div className="grid md:grid-cols-2 gap-4">
              {analysis.score && (
                <div className="glass rounded-xl p-6 border border-cyan-500/30">
                  <p className="text-gray-400 text-sm mb-2">Overall Score</p>
                  <p className="text-4xl font-black gradient-text">{analysis.score}</p>
                </div>
              )}
              {analysis.atsScore && (
                <div className="glass rounded-xl p-6 border border-emerald-500/30">
                  <p className="text-gray-400 text-sm mb-2">ATS Score</p>
                  <p className="text-4xl font-black text-emerald-400">{analysis.atsScore}</p>
                </div>
              )}
            </div>
          )}

          {/* Strengths */}
          {analysis.strengths && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Strengths</h3>
              <ul className="space-y-2">
                {analysis.strengths.map((s, idx) => (
                  <li key={idx} className="flex gap-3 p-2 text-green-300">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Areas to Improve */}
          {analysis.weaknesses && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Areas to Improve</h3>
              <ul className="space-y-2">
                {analysis.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex gap-3 p-2 text-orange-300">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {analysis.suggestions && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Suggestions</h3>
              <ul className="space-y-2">
                {analysis.suggestions.map((sugg, idx) => (
                  <li key={idx} className="flex gap-3 p-2 text-indigo-300">
                    <span className="font-bold">{idx + 1}.</span>
                    <span>{sugg}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Raw Feedback */}
          {analysis.rawFeedback && !analysis.score && (
            <div className="glass rounded-xl p-6">
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-sm">{analysis.rawFeedback}</p>
            </div>
          )}

          <button
            onClick={() => {
              setFile(null);
              setResumeText("");
              setTargetRole("");
              setAnalysis(null);
              setError("");
            }}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all"
          >
            Analyze Another Resume
          </button>
        </div>
      )}
    </div>
  );
}
