const STORAGE_KEY = "nexhire.activity.v1";

export function getActivity() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addActivity(record) {
  const item = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...record,
  };
  const next = [item, ...getActivity()].slice(0, 80);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("nexhire:activity"));
  return item;
}

export function clearActivity() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("nexhire:activity"));
}

export function getInsights(records = getActivity()) {
  const scored = records.filter((item) => Number.isFinite(Number(item.score)));
  const avg = scored.length ? Math.round(scored.reduce((sum, item) => sum + Number(item.score), 0) / scored.length) : 0;
  const interviews = records.filter((item) => item.type === "voice" || item.type === "video");
  const quizzes = records.filter((item) => item.type === "quiz");
  const resume = records.find((item) => item.type === "resume");
  const video = records.find((item) => item.type === "video");
  const voice = records.find((item) => item.type === "voice");

  const skillBreakdown = [
    { skill: "Communication", score: voice?.score || video?.clarity || 0 },
    { skill: "Technical", score: quizAverage(quizzes) || resume?.score || 0 },
    { skill: "Behavioral", score: voice?.score || 0 },
    { skill: "Confidence", score: video?.confidence || voice?.score || 0 },
    { skill: "Resume", score: resume?.score || 0 },
  ];

  const suggestions = buildSuggestions({ avg, resume, voice, video, quizzes });

  return {
    averageScore: avg,
    scoredCount: scored.length,
    interviewsCount: interviews.length,
    quizCount: quizzes.length,
    resumeScore: resume?.score || 0,
    videoScore: video?.score || 0,
    voiceScore: voice?.score || 0,
    skillBreakdown,
    suggestions,
    recent: records.slice(0, 6),
  };
}

function quizAverage(quizzes) {
  if (!quizzes.length) return 0;
  return Math.round(quizzes.reduce((sum, item) => sum + Number(item.score || 0), 0) / quizzes.length);
}

function buildSuggestions({ avg, resume, voice, video, quizzes }) {
  const items = [];
  if (!resume) items.push("Run a resume analysis to unlock resume score and missing skill tracking.");
  if (!voice) items.push("Complete one voice mock interview to generate communication feedback.");
  if (!video) items.push("Record one video answer to measure confidence, clarity, and eye contact.");
  if (!quizzes.length) items.push("Take one quiz to add technical readiness data.");
  if (avg && avg < 75) items.push("Focus on one short daily practice round until your average score reaches 75%.");
  if (resume?.score && resume.score < 80) items.push("Improve resume bullets with measurable outcomes and stronger role keywords.");
  return items.slice(0, 4);
}

export function exportReport(records = getActivity()) {
  const insights = getInsights(records);
  return {
    exportedAt: new Date().toISOString(),
    insights,
    activity: records,
  };
}
