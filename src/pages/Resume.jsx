import { useState } from "react";
import { FileUp, Loader2, ShieldCheck } from "lucide-react";
import { analyzeResumeText } from "../services/gemini.js";
import { addActivity } from "../services/activity.js";

export default function Resume() {
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setIsLoading(true);
    const nextAnalysis = await analyzeResumeText(`Uploaded PDF: ${file.name}. Parse this resume and return only a real analysis based on the uploaded document.`);
    setAnalysis(nextAnalysis);
    addActivity({
      type: "resume",
      title: `Resume Analysis - ${file.name}`,
      score: Number(nextAnalysis?.score || 0),
      skills: nextAnalysis?.skills || [],
      missingSkills: nextAnalysis?.missingSkills || [],
      suggestions: nextAnalysis?.suggestions || [],
    });
    setIsLoading(false);
  }

  const hasAnalysis = Boolean(analysis);

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Resume intelligence</p>
          <h2 className="mt-2 text-3xl font-black text-white">Resume Analysis</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8]">Upload a PDF resume and review role fit, missing skills, and content strength.</p>
        </div>
        <label className="app-button cursor-pointer">
          <input type="file" accept="application/pdf" onChange={handleUpload} className="sr-only" />
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="mr-2 h-4 w-4" />}
          Upload Resume
        </label>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="app-card p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="soft-label">Current file</p>
              <h3 className="mt-2 text-xl font-black text-white">{fileName || "No resume uploaded yet"}</h3>
              <p className="mt-2 text-sm leading-6 text-[#94A3B8]">Upload a resume to generate a real analysis from the document you selected.</p>
            </div>
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-[#172033] border-t-[#2563EB] text-center text-sm font-bold leading-6 text-[#94A3B8]">
              {hasAnalysis ? `${analysis.score || 0}%` : "Waiting for a real analysis"}
            </div>
          </div>
          {hasAnalysis ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <InfoList title="Skills Extracted" items={analysis.skills || []} tone="blue" />
              <InfoList title="Missing Skills" items={analysis.missingSkills || []} tone="orange" />
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-[#243047] bg-[#0b1120] p-6 text-sm leading-7 text-[#94A3B8]">
              No analysis is shown yet. Upload a PDF resume to generate a document-based report.
            </div>
          )}
        </div>

        <div className="app-card p-6">
          <h3 className="flex items-center gap-2 text-xl font-black text-white"><ShieldCheck className="h-5 w-5 text-[#22C55E]" />Analysis Notes</h3>
          {hasAnalysis ? (
            <>
              <p className="mt-4 text-sm leading-7 text-[#CBD5E1]">These notes are generated from the uploaded resume file and are not prefilled demo content.</p>
              <div className="mt-5 space-y-3">
                {(analysis.suggestions || []).map((item) => <p key={item} className="rounded-lg border border-[#1e293b] bg-[#0b1120] px-4 py-3 text-sm text-[#CBD5E1]">{item}</p>)}
              </div>
            </>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-[#243047] bg-[#0b1120] p-6 text-sm leading-7 text-[#94A3B8]">
              This panel stays empty until a real resume is uploaded and analyzed.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function InfoList({ title, items, tone }) {
  const color = tone === "orange" ? "border-[#F97316]/25 bg-[#F97316]/10 text-[#FDBA74]" : "border-[#2563EB]/25 bg-[#2563EB]/10 text-[#93C5FD]";
  return (
    <div>
      <h3 className="soft-label">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => <span key={item} className={`rounded-lg border px-3 py-2 text-sm font-bold ${color}`}>{item}</span>)}
      </div>
    </div>
  );
}
