/**
 * Unified API Service
 * Uses single Gemini API key from environment
 * Handles all advanced features with rate limiting and caching
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Simple cache to reduce API calls
const responseCache = new Map();

export const unifiedAPIService = {
  /**
   * Check if API key is configured
   */
  isConfigured: () => {
    return Boolean(API_KEY && API_KEY.length > 0);
  },

  /**
   * Get API key from env
   */
  getApiKey: () => API_KEY,

  /**
   * Call Gemini API with caching
   */
  callGemini: async (prompt: string, cacheKey?: string) => {
    try {
      if (!API_KEY) {
        return {
          success: false,
          error: "Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file",
          data: null,
        };
      }

      // Check cache first
      if (cacheKey && responseCache.has(cacheKey)) {
        return {
          success: true,
          data: responseCache.get(cacheKey),
          fromCache: true,
        };
      }

      // Add delay to respect rate limits
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.7,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error:
            error.error?.message ||
            `API Error: ${response.status}. Ensure your API key is valid and has Gemini 2.0 enabled.`,
          data: null,
        };
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Cache successful response
      if (cacheKey) {
        responseCache.set(cacheKey, content);
      }

      return {
        success: true,
        data: content,
        fromCache: false,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to call Gemini API",
        data: null,
      };
    }
  },

  /**
   * STAR Answer Coaching
   */
  coachSTARAnswer: async (userAnswer: string, targetRole?: string) => {
    const prompt = `
      Analyze this STAR method answer for a ${targetRole || "job"} interview:
      
      "${userAnswer}"
      
      Provide analysis in this exact JSON format:
      {
        "starAnalysis": {
          "situation": {"score": NUMBER, "feedback": "TEXT"},
          "task": {"score": NUMBER, "feedback": "TEXT"},
          "action": {"score": NUMBER, "feedback": "TEXT"},
          "result": {"score": NUMBER, "feedback": "TEXT"}
        },
        "overallScore": NUMBER,
        "perfectAnswer": "IMPROVED ANSWER TEXT",
        "keywords": ["KEYWORD1", "KEYWORD2"],
        "tips": ["TIP1", "TIP2", "TIP3"]
      }
    `;

    const cacheKey = `star_${userAnswer.slice(0, 50)}`;
    return unifiedAPIService.callGemini(prompt, cacheKey);
  },

  /**
   * Resume Analysis
   */
  analyzeResume: async (resumeText: string, targetRole?: string) => {
    const prompt = `
      Analyze this resume for a ${targetRole || "job search"}:
      
      RESUME:
      ${resumeText}
      
      Provide analysis in JSON format:
      {
        "score": NUMBER (0-100),
        "atsScore": NUMBER,
        "strengths": ["STRENGTH1", "STRENGTH2"],
        "weaknesses": ["WEAKNESS1", "WEAKNESS2"],
        "suggestions": ["SUGGESTION1", "SUGGESTION2"],
        "keywords": {"technical": ["TECH1"], "soft": ["SOFT1"], "industry": ["IND1"]},
        "improvementAreas": [{"area": "AREA", "score": NUMBER}]
      }
    `;

    const cacheKey = `resume_${resumeText.slice(0, 50)}`;
    return unifiedAPIService.callGemini(prompt, cacheKey);
  },

  /**
   * JD Matcher
   */
  matchJDWithResume: async (resumeText: string, jdText: string) => {
    const prompt = `
      Match this resume with this job description:
      
      RESUME:
      ${resumeText.slice(0, 1000)}
      
      JOB DESCRIPTION:
      ${jdText.slice(0, 1000)}
      
      Provide match analysis in JSON format:
      {
        "overallMatch": NUMBER (0-100),
        "breakdown": {"skillsMatch": NUMBER, "experienceMatch": NUMBER, "educationMatch": NUMBER, "industryMatch": NUMBER},
        "matchedSkills": [{"skill": "SKILL", "match": "PERCENT"}],
        "missingSkills": [{"skill": "SKILL", "importance": "HIGH/MEDIUM", "canLearn": boolean}],
        "recommendations": ["REC1", "REC2"],
        "interviewFocusAreas": ["AREA1", "AREA2"]
      }
    `;

    const cacheKey = `jd_${resumeText.slice(0, 30)}_${jdText.slice(0, 30)}`;
    return unifiedAPIService.callGemini(prompt, cacheKey);
  },

  /**
   * Cheat Sheet Generation
   */
  generateCheatSheet: async (role: string, interviewDate?: string) => {
    const prompt = `
      Generate a 1-page interview cheat sheet for a ${role} role${
        interviewDate ? ` interview on ${interviewDate}` : ""
      }:
      
      Provide in JSON format:
      {
        "topQuestions": [
          {"question": "Q", "answerBullets": ["BULLET1"], "timeLimit": "TIME"}
        ],
        "technicalConcepts": [
          {"topic": "TOPIC", "items": ["ITEM1", "ITEM2"]}
        ],
        "salaryRange": {"junior": "RANGE", "mid": "RANGE", "senior": "RANGE"},
        "redFlags": ["FLAG1", "FLAG2"],
        "greenFlags": ["FLAG1", "FLAG2"]
      }
    `;

    const cacheKey = `cheatsheet_${role}`;
    return unifiedAPIService.callGemini(prompt, cacheKey);
  },

  /**
   * Salary Negotiation Scenario
   */
  generateSalaryNegotiationScenario: async (
    role: string,
    experience: number,
    city: string
  ) => {
    const prompt = `
      Generate a salary negotiation scenario for a ${role} with ${experience} years experience in ${city}:
      
      Return JSON:
      {
        "suggestedSalary": NUMBER,
        "marketRate": "RANGE",
        "negotiationTips": ["TIP1"],
        "benefits": ["BEN1"],
        "firstHRMessage": "MESSAGE",
        "conversationStarters": ["STARTER1"]
      }
    `;

    const cacheKey = `salary_${role}_${experience}`;
    return unifiedAPIService.callGemini(prompt, cacheKey);
  },

  /**
   * Mock HR Response
   */
  getMockHRResponse: async (userMessage: string, context: string) => {
    const prompt = `
      You are an HR manager in a salary negotiation. Respond naturally to this:
      
      Context: ${context}
      User said: "${userMessage}"
      
      Respond with JSON:
      {
        "hrResponse": "YOUR RESPONSE",
        "conversationTip": "TIP FOR USER"
      }
    `;

    return unifiedAPIService.callGemini(prompt);
  },

  /**
   * Clear cache (useful for testing)
   */
  clearCache: () => {
    responseCache.clear();
  },
};

export default unifiedAPIService;
