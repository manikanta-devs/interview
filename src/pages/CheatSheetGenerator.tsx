import React, { useState } from "react";
import { Loader, AlertCircle, Download, Copy, FileText, Zap } from "lucide-react";
import unifiedAPIService from "../services/unifiedAPI";
import jsPDF from "jspdf";

export default function CheatSheetGenerator() {
  const [role, setRole] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [cheatSheet, setCheatSheet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!role.trim()) {
      setError("Please enter a role");
      return;
    }

    setLoading(true);
    setError("");

    const result = await unifiedAPIService.generateCheatSheet(role, interviewDate);
    if (result.success) {
      try {
        const data = JSON.parse(result.data);
        setCheatSheet(data);
      } catch (e) {
        setCheatSheet({ rawContent: result.data });
      }
    } else {
      setError(result.error || "Failed to generate cheat sheet");
    }
    setLoading(false);
  };

  const exportPDF = () => {
    if (!cheatSheet) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 10;

    // Title
    pdf.setFontSize(20);
    pdf.text(`${role} - Interview Cheat Sheet`, pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 15;

    // Content
    if (cheatSheet.topQuestions) {
      pdf.setFontSize(12);
      pdf.setTextColor(79, 70, 229);
      pdf.text("Key Interview Questions:", 10, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      cheatSheet.topQuestions.slice(0, 5).forEach((q, idx) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 10;
        }
        pdf.text(`${idx + 1}. ${q.question}`, 12, yPosition);
        yPosition += 6;
      });
    }

    pdf.save(`${role}-cheat-sheet.pdf`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black gradient-text mb-2">Interview Cheat Sheet</h1>
        <p className="text-gray-400">Generate a 1-page prep sheet for any role</p>
      </div>

      {error && (
        <div className="glass rounded-xl p-4 border border-red-500/30">
          <p className="text-red-300 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </p>
        </div>
      )}

      {!cheatSheet && (
        <div className="glass rounded-xl p-6 space-y-4">
          <label className="block">
            <p className="text-white font-bold mb-2">Target Role</p>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Senior Product Manager"
              className="w-full px-4 py-2 bg-slate-900 border border-indigo-500 rounded-lg text-white placeholder-gray-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGenerate();
              }}
            />
          </label>

          <label className="block">
            <p className="text-white font-bold mb-2">Interview Date (Optional)</p>
            <input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-indigo-500 rounded-lg text-white"
            />
          </label>

          <button
            onClick={handleGenerate}
            disabled={loading || !role.trim()}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Generate Cheat Sheet
              </>
            )}
          </button>
        </div>
      )}

      {cheatSheet && (
        <div className="space-y-6">
          {cheatSheet.topQuestions && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Key Interview Questions</h3>
              <div className="space-y-3">
                {cheatSheet.topQuestions.map((q, idx) => (
                  <div key={idx} className="p-4 bg-slate-900/50 rounded-lg border border-indigo-500/20">
                    <p className="font-bold text-white mb-2">{idx + 1}. {q.question}</p>
                    {q.answerBullets && (
                      <ul className="space-y-1 text-sm text-gray-300">
                        {q.answerBullets.map((bullet, bidx) => (
                          <li key={bidx}>• {bullet}</li>
                        ))}
                      </ul>
                    )}
                    {q.timeLimit && <p className="text-xs text-gray-500 mt-2">Time: {q.timeLimit}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {cheatSheet.technicalConcepts && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Technical Concepts</h3>
              <div className="space-y-4">
                {cheatSheet.technicalConcepts.map((concept, idx) => (
                  <div key={idx}>
                    <p className="font-bold text-indigo-300 mb-2">{concept.topic}</p>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {concept.items.map((item, iidx) => (
                        <li key={iidx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cheatSheet.rawContent && !cheatSheet.topQuestions && (
            <div className="glass rounded-xl p-6">
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-sm">{cheatSheet.rawContent}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={exportPDF}
              className="flex-1 px-6 py-3 rounded-lg border border-indigo-500 text-indigo-300 font-bold hover:bg-indigo-500/10 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export PDF
            </button>
            <button
              onClick={() => {
                setRole("");
                setInterviewDate("");
                setCheatSheet(null);
              }}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all"
            >
              Generate New
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
