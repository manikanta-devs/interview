const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";
import { callGeminiClient } from "./geminiClient";

const fallback = {
  resume: {
    score: null,
    skills: [],
    missingSkills: [],
    suggestions: ["Connect Gemini or upload a parsed resume source to generate a real analysis."],
  },
  question: "Tell me about a time you improved a product or process with limited information.",
  evaluation: { score: 82, feedback: "Clear structure and relevant examples. Add sharper metrics and explain the decision tradeoffs." },
  quiz: [
    {
      id: 1,
      question: "What is the best way to explain a technical tradeoff in an interview?",
      options: ["State context, options, decision, and result", "Only mention the final decision", "Avoid discussing uncertainty", "Focus on tools first"],
      answer: 0,
      explanation: "Strong answers show judgment by comparing options and outcomes.",
    },
    {
      id: 2,
      question: "Which resume bullet is strongest?",
      options: ["Worked on dashboards", "Improved dashboard load time by 38% for 20k users", "Responsible for UI", "Used React daily"],
      answer: 1,
      explanation: "The strongest bullet includes action, metric, and user/business scope.",
    },
    {
      id: 3,
      question: "What should a candidate do when they do not know an answer?",
      options: ["Guess confidently", "Explain assumptions and reason through it", "Change the topic", "Apologize repeatedly"],
      answer: 1,
      explanation: "Interviewers value structured reasoning and honesty under ambiguity.",
    },
  ],
};

async function callGemini(prompt) {
  const result = await callGeminiClient({
    prompt,
    responseFormat: "text",
    model: GEMINI_MODEL,
  });

  if (!result.success) {
    return null;
  }

  return result.data || null;
}

function parseJson(text, fallbackValue) {
  if (!text) return fallbackValue;
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return fallbackValue;
  }
}

export async function analyzeResumeText(resumeText) {
  const text = await callGemini(`Analyze this resume for interview readiness. Return JSON only with score, skills, missingSkills, suggestions. Resume: ${resumeText}`).catch(() => null);
  return parseJson(text, fallback.resume);
}

export async function generateInterviewQuestion(role = "Frontend Engineer", level = "Mid-level") {
  return (await callGemini(`Create one concise ${level} ${role} interview question. Return plain text only.`).catch(() => null)) || fallback.question;
}

export async function evaluateInterviewAnswer(question, answer) {
  const text = await callGemini(`Evaluate this interview answer. Return JSON only with score and feedback. Question: ${question}. Answer: ${answer}`).catch(() => null);
  return parseJson(text, fallback.evaluation);
}

export async function generateQuizQuestions(topic = "Interview readiness") {
  const text = await callGemini(`Generate 5 MCQ questions for ${topic}. Return JSON array only with id, question, options, answer as zero-based index, explanation.`).catch(() => null);
  return parseJson(text, fallback.quiz);
}
