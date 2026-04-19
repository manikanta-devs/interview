import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "express-async-errors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "NexHire API is running ✅" });
});

// Temporary mock routes - these will be replaced with real routes
app.post("/api/resumes/analyze", async (req, res) => {
  res.json({
    score: 86,
    skills: ["React", "Node.js", "REST APIs", "SQL", "Product Thinking"],
    missingSkills: ["System Design", "Cloud Deployment", "Automated Testing"],
    suggestions: ["Add quantified impact.", "Move strongest skills above experience.", "Add one end-to-end SaaS project."],
  });
});

app.post("/api/interviews/start", async (req, res) => {
  res.json({
    sessionId: crypto.randomUUID(),
    question: "Describe a time you made a technical decision with incomplete information.",
  });
});

app.post("/api/interviews/answer", async (req, res) => {
  res.json({
    score: 82,
    feedback: "Clear answer. Add the options you rejected and the measurable result.",
    nextQuestion: "How do you approach debugging a production issue?",
  });
});

app.post("/api/quiz/generate", async (req, res) => {
  res.json({
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
});

app.get("/api/results/:sessionId", async (req, res) => {
  res.json({
    overallScore: 84,
    skillBreakdown: [
      { skill: "Communication", score: 88 },
      { skill: "Technical", score: 81 },
      { skill: "Behavioral", score: 85 },
      { skill: "Confidence", score: 78 },
      { skill: "Resume", score: 86 },
    ],
    feedback: "Strong structure and calm delivery. Add more quantified impact and clearer tradeoffs.",
    suggestions: ["Record one video response daily.", "Rewrite resume bullets with metrics.", "Practice one system design story."],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║    🚀 NexHire API Server Starting     ║
║════════════════════════════════════════║
║  URL: http://localhost:${PORT}        ║
║  Env: ${process.env.NODE_ENV || "development"}              ║
╚════════════════════════════════════════╝
  `);
});

export default app;

