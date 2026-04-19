import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { clearActivity, exportReport, getActivity, getInsights } from "../services/activity.js";

export default function Results() {
  const [records, setRecords] = useState(() => getActivity());
  const insights = getInsights(records);

  useEffect(() => {
    const refresh = () => setRecords(getActivity());
    window.addEventListener("nexhire:activity", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("nexhire:activity", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  function downloadReport() {
    const blob = new Blob([JSON.stringify(exportReport(records), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nexhire-report-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Reports dashboard</p>
          <h2 className="mt-2 text-3xl font-black text-white">Results & Analytics</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8]">This report is generated from your actual activity in this browser.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={downloadReport} disabled={!records.length} className="app-button">Export Report</button>
          <button onClick={clearActivity} disabled={!records.length} className="app-button-secondary">Reset Data</button>
        </div>
      </section>

      {!records.length ? (
        <section className="app-card p-8 text-center">
          <h3 className="text-2xl font-black text-white">No real report yet</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#94A3B8]">Complete a resume analysis, voice interview, video interview, or quiz. NexHire will build this analytics page from your saved activity instead of showing fake numbers.</p>
        </section>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-4">
            {[
              ["Overall", insights.averageScore],
              ["Communication", insights.skillBreakdown[0].score],
              ["Technical", insights.skillBreakdown[1].score],
              ["Confidence", insights.skillBreakdown[3].score],
            ].map(([label, score]) => (
              <div key={label} className="app-card p-5">
                <p className="soft-label">{label}</p>
                <p className="mt-3 text-3xl font-black text-white">{score || "--"}{score ? "%" : ""}</p>
                <div className="metric-bar mt-4"><div className="metric-fill" style={{ width: `${score || 0}%` }} /></div>
              </div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
            <div className="app-card p-6">
              <h3 className="text-xl font-black text-white">Overall Progress</h3>
              <div className="mt-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={insights.skillBreakdown}>
                    <PolarGrid stroke="#1E293B" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                    <Radar dataKey="score" stroke="#2563EB" fill="#2563EB" fillOpacity={0.28} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="app-card p-6">
              <h3 className="text-xl font-black text-white">Skill Breakdown</h3>
              <div className="mt-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={insights.skillBreakdown}>
                    <CartesianGrid stroke="#1E293B" strokeDasharray="4 4" />
                    <XAxis dataKey="skill" stroke="#64748B" tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "#0B1120", border: "1px solid #2563EB55", borderRadius: "8px", color: "#E2E8F0" }} />
                    <Bar dataKey="score" fill="#2563EB" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <Panel title="AI Feedback" text={insights.averageScore >= 80 ? "You are trending well. Keep answers specific and close with measurable outcomes." : "Build more data first, then focus on the weakest score category shown above."} />
            <Panel title="Next Actions" text={insights.suggestions.join(" ")} />
            <Panel title="Activity Count" text={`${records.length} saved activity records are powering this report.`} />
          </section>
        </>
      )}
    </div>
  );
}

function Panel({ title, text }) {
  return (
    <div className="app-card p-6">
      <h3 className="text-xl font-black text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#94A3B8]">{text}</p>
    </div>
  );
}
