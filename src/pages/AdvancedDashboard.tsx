import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Brain,
  Zap,
  Award,
  Target,
  Download,
  Share2,
  BarChart3,
} from "lucide-react";
import { interviewTracker } from "../services/interviewTracker";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function AdvancedDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [radarData, setRadarData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const dashboardMetrics = interviewTracker.getMetrics();
    const allSessions = interviewTracker.getAllSessions().filter((s) => s.completed);
    setMetrics(dashboardMetrics);
    setSessions(allSessions);

    // Prepare radar chart data (latest session)
    if (allSessions.length > 0) {
      const latest = allSessions[allSessions.length - 1];
      const avgAnswerScore =
        latest.answers.length > 0
          ? latest.answers.reduce((sum: number, a: any) => sum + a.aiScore, 0) /
            latest.answers.length
          : 0;

      setRadarData([
        {
          category: "Overall Score",
          value: latest.overallScore,
          fullMark: 100,
        },
        {
          category: "Fluency",
          value: latest.answers[0]?.fluency || 70,
          fullMark: 100,
        },
        {
          category: "Confidence",
          value: latest.answers[0]?.confidence || 70,
          fullMark: 100,
        },
        {
          category: "Relevance",
          value: latest.answers[0]?.relevance || 70,
          fullMark: 100,
        },
        {
          category: "Structure",
          value: Math.round(avgAnswerScore),
          fullMark: 100,
        },
      ]);
    }

    // Prepare trend data (last 10 sessions)
    const trend = allSessions.slice(-10).map((session: any, idx: number) => ({
      sessionNum: idx + 1,
      score: session.overallScore,
      type: session.type.charAt(0).toUpperCase() + session.type.slice(1),
      date: new Date(session.startTime).toLocaleDateString(),
    }));
    setTrendData(trend);

    setLoading(false);
  };

  const exportToPDF = async () => {
    const dashboardElement = document.getElementById("dashboard-content");
    if (!dashboardElement) return;

    try {
      const canvas = await html2canvas(dashboardElement, { scale: 2 });
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      if (imgHeight > pageHeight) {
        let heightLeft = imgHeight - pageHeight;
        let position = 0;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      }
      pdf.save("nexhire-analytics.pdf");
    } catch (error) {
      console.error("PDF export failed:", error);
    }
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: "My NexHire Interview Analytics",
        text: `I've completed ${sessions.length} interviews with an average score of ${Math.round(metrics?.averageScore)}!`,
        url: window.location.href,
      });
    }
  };

  if (loading || !metrics)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Zap className="w-12 h-12 text-indigo-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );

  return (
    <div id="dashboard-content" className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black gradient-text mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Your comprehensive interview performance analysis</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Brain className="w-8 h-8 text-blue-400" />
            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">
              +5%
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Interviews Completed</p>
          <p className="text-3xl font-black text-white">{metrics.totalInterviews}</p>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">
              Growing
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Average Score</p>
          <p className="text-3xl font-black text-white">{metrics.averageScore}</p>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-yellow-400" />
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
              Best
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Best Score</p>
          <p className="text-3xl font-black text-white">{metrics.bestScore}</p>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">
              Hours
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Practice Time</p>
          <p className="text-3xl font-black text-white">{Math.round(metrics.totalMinutes)}m</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Radar Chart - Performance Metrics */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Performance Profile</h3>
          {radarData.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#4f46e5" strokeDasharray="5 5" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#06b6d4"
                  fill="#5b6fff"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Line Chart - Score Trend */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Score Trend</h3>
          {trendData.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid stroke="#4f46e5" strokeDasharray="5 5" />
                <XAxis dataKey="sessionNum" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #4f46e5",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#5b6fff", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Session Breakdown */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          Recent Sessions
        </h3>
        <div className="space-y-3">
          {sessions.slice(-5).map((session, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-indigo-500/20"
            >
              <div>
                <p className="font-bold text-white capitalize">
                  {session.type} Interview · {session.answers.length} Questions
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(session.startTime).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black gradient-text">{session.overallScore}</p>
                <p className="text-xs text-gray-400">
                  {Math.round((session.duration || 0) / 60)}m
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={exportToPDF}
          className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export PDF
        </button>
        <button
          onClick={shareResults}
          className="flex-1 px-6 py-3 rounded-lg border border-indigo-500 text-indigo-300 font-bold hover:bg-indigo-500/10 transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          Share Results
        </button>
      </div>

      {/* Improvement Areas */}
      {sessions.length > 0 && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recommended Focus Areas</h3>
          <div className="space-y-3">
            {sessions[sessions.length - 1]?.improvementAreas?.map(
              (area: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <span className="text-orange-400 font-bold mt-1">•</span>
                  <p className="text-gray-200">{area}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
