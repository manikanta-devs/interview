/**
 * Advanced Gemini 2.0 Flash API Gateway
 * Unified interface for all AI operations
 * Free tier: 1M tokens/day, 15 RPM
 */

const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_VISION_MODEL = "gemini-2.0-flash";
import { callGeminiClient } from "./geminiClient";

interface GeminiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Get or set API key in localStorage
 */
export const apiKeyManager = {
  get: (): string => localStorage.getItem("nexhire_gemini_key") || "",
  set: (key: string): void => {
    if (!key.startsWith("AIza")) throw new Error("Invalid Gemini API key format");
    localStorage.setItem("nexhire_gemini_key", key);
  },
  clear: (): void => localStorage.removeItem("nexhire_gemini_key"),
  isSet: (): boolean => !!localStorage.getItem("nexhire_gemini_key"),
};

/**
 * Core Gemini API call wrapper
 */
async function callGemini(
  prompt: string,
  systemContext: string = "",
  imageBase64?: string,
  responseFormat: "json" | "text" = "json"
): Promise<GeminiResponse> {
  try {
    const result = await callGeminiClient({
      prompt,
      systemContext,
      imageBase64,
      responseFormat,
      model: GEMINI_MODEL,
    });

    if (!result.success) {
      return { success: false, error: result.error || "Gemini API error" };
    }

    const content = result.data;

    if (!content) {
      throw new Error("Empty response from Gemini");
    }

    if (responseFormat === "json") {
      try {
        return { success: true, data: JSON.parse(content) };
      } catch {
        return { success: true, data: content };
      }
    }

    return { success: true, data: content };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * AI Services - All feature-specific Gemini interactions
 */
export const geminiServices = {
  /**
   * Resume Analysis - ATS Score, Skills Gap, Recommendations
   */
  async analyzeResume(resumeText: string, targetRole?: string) {
    const prompt = `Analyze this resume and provide detailed insights. Format response as JSON.

Resume:
${resumeText}

${targetRole ? `Target Role: ${targetRole}` : ""}

Respond with ONLY valid JSON (no markdown, no explanation):
{
  "atsScore": <0-100>,
  "keywordMatches": [<important keywords found>],
  "missingKeywords": [<critical missing keywords for role>],
  "topSkills": [<3 strongest skills shown>],
  "weakAreas": [<3 areas needing improvement>],
  "suggestedRoles": [<top 3 roles this resume fits>],
  "improvementPriorities": [<top 3 actions to improve ATS score>],
  "strengths": "<2-3 sentence positive assessment>",
  "actionItems": [<specific improvements>]
}`;

    const system = "You are an expert ATS (Applicant Tracking System) specialist and recruiter. Provide data-driven resume analysis.";
    const result = await callGemini(prompt, system, undefined, "json");
    return result;
  },

  /**
   * JD Matcher - Resume vs Job Description Analysis
   */
  async matchJDWithResume(resumeText: string, jobDescription: string) {
    const prompt = `Compare this resume against a job description and analyze the match.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Respond with ONLY valid JSON:
{
  "overallMatchScore": <0-100>,
  "roleMatch": <0-100>,
  "skillsMatch": <0-100>,
  "experienceMatch": <0-100>,
  "matchedRequirements": [<requirements you meet>],
  "missingRequirements": [<critical missing skills/experience>],
  "niceToHaveMatch": [<nice-to-have items you have>],
  "tailoredCoverLetterdraft": "<2-3 sentences of a tailored cover letter>",
  "recommendedSkillsToHighlight": [<skills to emphasize in this role>],
  "interviewFocusAreas": [<topics to prepare for>],
  "overallRecommendation": "<assessment: Strong Fit / Good Fit / Stretch Position>"
}`;

    const system =
      "You are an expert recruiter analyzing job fit. Provide actionable matching insights.";
    return await callGemini(prompt, system, undefined, "json");
  },

  /**
   * Interview Question Generator
   */
  async generateInterviewQuestions(role: string, round: "hr" | "technical" | "system-design", count: number = 5) {
    const roundDescriptions = {
      hr: "HR/Behavioral/Culture Fit",
      technical: "Technical/DSA/Concepts",
      "system-design": "System Design/Architecture",
    };

    const prompt = `Generate ${count} ${roundDescriptions[round]} interview questions for a "${role}" position.

Respond with ONLY valid JSON:
{
  "questions": [
    {
      "question": "<question text>",
      "difficulty": "<Easy|Medium|Hard>",
      "expectedDuration": "<2-3 minutes|5-7 minutes|10-15 minutes>",
      "scoringCriteria": [<key points to score on>],
      "commonMistakes": [<pitfalls to avoid>]
    }
  ]
}`;

    const system = `You are an expert ${roundDescriptions[round]} interviewer. Generate realistic, insightful questions that assess key competencies.`;
    return await callGemini(prompt, system, undefined, "json");
  },

  /**
   * Answer Evaluation - Score and Feedback
   */
  async evaluateAnswer(
    question: string,
    userAnswer: string,
    role?: string,
    round?: string
  ) {
    const prompt = `Evaluate this interview answer and provide structured feedback.

Question: ${question}
${role ? `Role: ${role}` : ""}
${round ? `Round: ${round}` : ""}

Answer: ${userAnswer}

Respond with ONLY valid JSON:
{
  "overallScore": <0-100>,
  "categoryScores": {
    "relevance": <0-100>,
    "completeness": <0-100>,
    "clarity": <0-100>,
    "confidence": <0-100>,
    "structure": <0-100>
  },
  "strengths": [<3 positive aspects>],
  "improvementAreas": [<3 areas to improve>],
  "feedback": "<2-3 sentences of constructive feedback>",
  "suggestions": [<specific ways to strengthen the answer>],
  "idealAnswerBullets": [<key points that should be in a great answer>]
}`;

    const system =
      "You are an expert interviewer evaluating candidate responses. Provide fair, constructive feedback with actionable improvements.";
    return await callGemini(prompt, system, undefined, "json");
  },

  /**
   * STAR Answer Coach
   */
  async coachSTARAnswer(userAnswer: string, role?: string) {
    const prompt = `Analyze if this answer follows the STAR method and coach the candidate.

Answer: ${userAnswer}
${role ? `Context: ${role} interview` : ""}

Respond with ONLY valid JSON:
{
  "starMethodAnalysis": {
    "hasSituation": <true|false>,
    "hasTask": <true|false>,
    "hasAction": <true|false>,
    "hasResult": <true|false>
  },
  "missingElements": [<which STAR parts are missing>],
  "overallScore": <0-100>,
  "improvedSTARAnswer": "<rewritten answer that perfectly follows STAR>",
  "keyImprovements": [<specific enhancements made>],
  "quantifiableMetrics": [<metrics they should highlight if applicable>]
}`;

    const system =
      "You are a professional interview coach specializing in STAR method responses. Provide expert coaching and rewrites.";
    return await callGemini(prompt, system, undefined, "json");
  },

  /**
   * Salary Negotiation Simulation
   */
  async generateSalaryNegotiationScenario(
    role: string,
    experience: number,
    city: string = "India"
  ) {
    const prompt = `Create a salary negotiation scenario and opening offer.

Role: ${role}
Years of Experience: ${experience}
Location: ${city}

Respond with ONLY valid JSON:
{
  "marketSalaryRange": {
    "min": <number>,
    "mid": <number>,
    "max": <number>,
    "currency": "INR"
  },
  "companyOpeningOffer": <number>,
  "negotiationTips": [<5 specific tips for this candidate>],
  "counterOfferStrategies": [<3 negotiation approaches>],
  "benefits": [<5 benefits to negotiate besides salary>],
  "firstHRMessage": "<HR's opening statement for the conversation>",
  "benchmarkContext": "<industry context for this role in this city>"
}`;

    const system =
      "You are an expert in salary negotiation and compensation strategy in India tech industry. Provide realistic market data and expert guidance.";
    return await callGemini(prompt, system, undefined, "json");
  },

  /**
   * Cheat Sheet Generator
   */
  async generateCheatSheet(role: string, interviewDate?: string) {
    const daysUntilInterview = interviewDate
      ? Math.ceil(
          (new Date(interviewDate).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 7;

    const prompt = `Generate a focused, one-page cheat sheet for interview preparation.

Role: ${role}
Days until interview: ${daysUntilInterview}

Respond with ONLY valid JSON:
{
  "topQuestionsLikely": [
    {
      "question": "<question>",
      "answerBullets": [<key points to cover>]
    }
  ],
  "technicalConcepts": [
    {
      "concept": "<name>",
      "explanation": "<1-2 sentence simple explanation>",
      "example": "<quick example>"
    }
  ],
  "companyCulturePoints": [<3 things about this company/role culture>],
  "systemDesignOutline": {
    "approach": "<step-by-step approach>",
    "keyComponents": [<components to mention>]
  },
  "fillerWordsToAvoid": [<common filler words and replacements>],
  "lastMinuteFocusAreas": [<top 3 things to review before interview>]
}`;

    const system =
      "Create a practical, focused cheat sheet that fits on one page. Prioritize based on likelihood and importance.";
    return await callGemini(prompt, system, undefined, "json");
  },

  /**
   * Mock HR Conversation
   */
  async getMockHRResponse(userMessage: string, context: string = "") {
    const prompt = `You are an HR interviewer. The candidate just said: "${userMessage}"

${context ? `Context: ${context}` : ""}

Respond with ONLY valid JSON:
{
  "hrResponse": "<HR's response - 1-2 sentences>",
  "nextQuestion": "<Follow-up question if this was an answer, or acknowledgment if it was a question>",
  "scoringFeedback": {
    "communicationScore": <0-100>,
    "answerRelevance": <0-100>,
    "cultureFit": <0-100>,
    "notes": "<brief observation>"
  },
  "conversationTip": "<advice for the candidate>"
}`;

    const system =
      "You are a realistic, fair HR interviewer for a tech company. Respond naturally but professionally.";
    return await callGemini(prompt, system, undefined, "json");
  },

  /**
   * Video Frame Analysis (Posture, Eye Contact)
   */
  async analyzeVideoFrame(frameBase64: string) {
    const prompt = `Analyze this video frame of an interview candidate. Assess non-verbal communication.

Respond with ONLY valid JSON:
{
  "eyeContact": {
    "score": <0-100>,
    "assessment": "<brief description>"
  },
  "posture": {
    "score": <0-100>,
    "assessment": "<brief description>"
  },
  "backgroundQuality": {
    "score": <0-100>,
    "suggestions": [<improvements>]
  },
  "lighting": {
    "score": <0-100>,
    "suggestion": "<if poor, how to fix>"
  },
  "overallNonVerbalScore": <0-100>,
  "strengths": [<positive observations>],
  "improvements": [<areas to work on>],
  "tips": [<3 actionable tips for next time>]
}`;

    const system =
      "You are an expert in non-verbal communication and interview etiquette. Provide constructive, specific feedback.";
    return await callGemini(prompt, system, frameBase64, "json");
  },

  /**
   * Filler Word & Clarity Analysis
   */
  async analyzeSpeechQuality(transcript: string) {
    const prompt = `Analyze this interview response transcript for speech quality.

Transcript: "${transcript}"

Respond with ONLY valid JSON:
{
  "fillerWordCount": <number>,
  "fillerWords": [<list found in transcript>],
  "fillerWordPercentage": <percentage of response>,
  "clarity": <0-100>,
  "pacing": {
    "assessment": "<too fast|moderate|too slow>",
    "score": <0-100>
  },
  "coherence": <0-100>,
  "technicalAccuracy": <0-100>,
  "overallScore": <0-100>,
  "strengths": [<positive aspects>],
  "improvementAreas": [<things to work on>],
  "suggestions": [<specific techniques to improve>]
}`;

    const system =
      "You are a speech and communication expert analyzing interview responses.";
    return await callGemini(prompt, system, undefined, "json");
  },
};

export default geminiServices;
