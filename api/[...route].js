import crypto from "crypto";
import { callGeminiPrompt } from "../server/services/gemini.js";

function ok(res, payload) {
  return res.status(200).json(payload);
}

function methodNotAllowed(res) {
  return res.status(405).json({ success: false, error: "Method not allowed" });
}

export default async function handler(req, res) {
  const route = req.query.route;
  const parts = Array.isArray(route) ? route : route ? [route] : [];
  const path = `/${parts.join("/")}`;
  const normalizedPath = path.startsWith("/api/") ? path.slice(4) : path;

  if (req.method === "GET" && (path === "/health" || normalizedPath === "/health")) {
    return ok(res, { status: "NexHire API is running ✅" });
  }

  if (req.method === "POST" && path === "/resumes/analyze") {
    return ok(res, {
      score: 86,
      skills: ["React", "Node.js", "REST APIs", "SQL", "Product Thinking"],
      missingSkills: ["System Design", "Cloud Deployment", "Automated Testing"],
      suggestions: [
        "Add quantified impact.",
        "Move strongest skills above experience.",
        "Add one end-to-end SaaS project.",
      ],
    });
  }

  if (req.method === "POST" && path === "/interviews/start") {
    return ok(res, {
      sessionId: crypto.randomUUID(),
      question: "Describe a time you made a technical decision with incomplete information.",
    });
  }

  if (req.method === "POST" && path === "/interviews/answer") {
    return ok(res, {
      score: 82,
      feedback: "Clear answer. Add the options you rejected and the measurable result.",
      nextQuestion: "How do you approach debugging a production issue?",
    });
  }

  if (req.method === "POST" && path === "/quiz/generate") {
    return ok(res, {
      questions: [
        {
          id: 1,
          question: "Which answer structure is strongest for behavioral interviews?",
          options: ["STAR", "FIFO", "MVC", "CRUD"],
          answer: 0,
          explanation: "STAR keeps context, action, and outcome clear.",
        },
      ],
    });
  }

  if (req.method === "GET" && parts[0] === "results" && parts[1]) {
    return ok(res, {
      overallScore: 84,
      skillBreakdown: [
        { skill: "Communication", score: 88 },
        { skill: "Technical", score: 81 },
        { skill: "Behavioral", score: 85 },
        { skill: "Confidence", score: 78 },
        { skill: "Resume", score: 86 },
      ],
      feedback: "Strong structure and calm delivery. Add more quantified impact and clearer tradeoffs.",
      suggestions: [
        "Record one video response daily.",
        "Rewrite resume bullets with metrics.",
        "Practice one system design story.",
      ],
    });
  }

  if (req.method === "GET" && path === "/results") {
    return ok(res, {
      overallScore: 84,
      skillBreakdown: [],
    });
  }

  if (req.method === "GET" && path === "/dashboard/stats") {
    return ok(res, {
      interviewsPracticed: 0,
      questionsAnswered: 0,
      skillsLearned: 0,
      streakDays: 0,
    });
  }

  if (req.method === "GET" && path === "/dashboard/activity") {
    return ok(res, []);
  }

  if (req.method === "GET" && path === "/dashboard/insights") {
    return ok(res, {
      insights: ["Keep practicing voice interviews to improve confidence."],
    });
  }

  if (path === "/gemini") {
    if (req.method !== "POST") {
      return methodNotAllowed(res);
    }

    const {
      prompt,
      systemContext = "",
      imageBase64,
      responseFormat = "text",
      model = "gemini-2.0-flash",
    } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ success: false, error: "Prompt is required" });
    }

    try {
      const result = await callGeminiPrompt({
        prompt,
        systemContext,
        imageBase64,
        responseFormat,
        model,
      });
      return ok(res, result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message || "Failed to call Gemini API",
      });
    }
  }

  return res.status(404).json({ success: false, error: "Route not found" });
}
