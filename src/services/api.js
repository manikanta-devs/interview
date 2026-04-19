const API_BASE = "http://localhost:5000/api" || import.meta.env.VITE_API_URL;

/**
 * Generic API request handler
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

/**
 * Resume API endpoints
 */
export const resumeAPI = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(`${API_BASE}/resumes/upload`, {
      method: "POST",
      body: formData,
    }).then(r => r.json());
  },

  analyze: async (resumeId) => {
    return apiRequest(`/resumes/${resumeId}/analyze`, {
      method: "POST",
    });
  },

  getAnalysis: async (resumeId) => {
    return apiRequest(`/resumes/${resumeId}`, {
      method: "GET",
    });
  },
};

/**
 * Interview API endpoints
 */
export const interviewAPI = {
  start: async (resumeId, type = "voice") => {
    return apiRequest("/interviews/start", {
      method: "POST",
      body: { resumeId, type },
    });
  },

  getQuestions: async (interviewId) => {
    return apiRequest(`/interviews/${interviewId}/questions`, {
      method: "GET",
    });
  },

  submitAnswer: async (interviewId, questionId, answer) => {
    return apiRequest(`/interviews/${interviewId}/answers`, {
      method: "POST",
      body: { questionId, answer },
    });
  },

  complete: async (interviewId) => {
    return apiRequest(`/interviews/${interviewId}/complete`, {
      method: "POST",
    });
  },

  getResults: async (interviewId) => {
    return apiRequest(`/interviews/${interviewId}/results`, {
      method: "GET",
    });
  },
};

/**
 * Quiz API endpoints
 */
export const quizAPI = {
  generate: async (resumeId) => {
    return apiRequest("/quiz/generate", {
      method: "POST",
      body: { resumeId },
    });
  },

  submitQuiz: async (answers) => {
    return apiRequest("/quiz/submit", {
      method: "POST",
      body: { answers },
    });
  },
};

/**
 * Dashboard API endpoints
 */
export const dashboardAPI = {
  getStats: async () => {
    return apiRequest("/dashboard/stats", {
      method: "GET",
    });
  },

  getActivity: async () => {
    return apiRequest("/dashboard/activity", {
      method: "GET",
    });
  },

  getInsights: async () => {
    return apiRequest("/dashboard/insights", {
      method: "GET",
    });
  },
};

/**
 * Results API endpoints
 */
export const resultsAPI = {
  getResults: async (interviewId) => {
    return apiRequest(`/results/${interviewId}`, {
      method: "GET",
    });
  },

  getAllResults: async () => {
    return apiRequest("/results", {
      method: "GET",
    });
  },
};

// Legacy API for backward compatibility
export const api = {
  analyzeResume: async (payload) => {
    try {
      return await apiRequest("/resumes/analyze", { method: "POST", body: payload });
    } catch {
      return { score: null, skills: [], missingSkills: [], suggestions: ["Connect the resume analysis API to generate a real result."] };
    }
  },
  startInterview: async (payload) => {
    try {
      return await apiRequest("/interviews/start", { method: "POST", body: payload });
    } catch {
      return { sessionId: "demo-session", question: "Tell me about yourself" };
    }
  },
  submitAnswer: async (payload) => {
    try {
      return await apiRequest("/interviews/answer", { method: "POST", body: payload });
    } catch {
      return { score: 82, feedback: "Good answer", nextQuestion: "Next question" };
    }
  },
  generateQuiz: async (payload) => {
    try {
      return await apiRequest("/quiz/generate", { method: "POST", body: payload });
    } catch {
      return { questions: [] };
    }
  },
  getResults: async () => {
    try {
      return await apiRequest("/results", { method: "GET" });
    } catch {
      return { overallScore: 84, skillBreakdown: [] };
    }
  },
};
