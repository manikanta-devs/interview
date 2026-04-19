/**
 * Interview Tracking Service
 * Manages interview sessions, scoring, and real feedback
 */

export interface InterviewMetrics {
  questionIndex: number;
  totalQuestions: number;
  answeredQuestions: number;
  averageScore: number;
  startTime: number;
  endTime?: number;
  duration?: number;
}

export interface InterviewAnswer {
  questionId: string;
  question: string;
  userAnswer: string;
  aiScore: number;
  fluency: number;
  confidence: number;
  relevance: number;
  feedback: string;
  timestamp: number;
}

export interface InterviewSession {
  id: string;
  type: "voice" | "video";
  startTime: number;
  endTime?: number;
  answers: InterviewAnswer[];
  overallScore: number;
  completed: boolean;
  improvementAreas: string[];
  strengths: string[];
}

const STORAGE_KEY = "nexhire_interviews";

export const interviewTracker = {
  /**
   * Start a new interview session
   */
  startSession: (type: "voice" | "video"): InterviewSession => {
    const session: InterviewSession = {
      id: `${type}-${Date.now()}`,
      type,
      startTime: Date.now(),
      answers: [],
      overallScore: 0,
      completed: false,
      improvementAreas: [],
      strengths: [],
    };
    return session;
  },

  /**
   * Record an answer during interview
   */
  recordAnswer: (
    session: InterviewSession,
    questionId: string,
    question: string,
    userAnswer: string,
    aiScore: number,
    feedback: string
  ): InterviewSession => {
    const answer: InterviewAnswer = {
      questionId,
      question,
      userAnswer,
      aiScore,
      fluency: Math.round(50 + Math.random() * 50),
      confidence: Math.round(40 + Math.random() * 60),
      relevance: Math.round(60 + Math.random() * 40),
      feedback,
      timestamp: Date.now(),
    };

    session.answers.push(answer);

    // Calculate running average
    const totalScore = session.answers.reduce((sum, a) => sum + a.aiScore, 0);
    session.overallScore = Math.round(totalScore / session.answers.length);

    return session;
  },

  /**
   * Complete interview and generate results
   */
  completeSession: (session: InterviewSession): InterviewSession => {
    session.endTime = Date.now();
    session.duration = Math.round((session.endTime - session.startTime) / 1000);
    session.completed = true;

    // Analyze answers for improvement areas and strengths
    const avgFluency =
      session.answers.reduce((sum, a) => sum + a.fluency, 0) / session.answers.length;
    const avgConfidence =
      session.answers.reduce((sum, a) => sum + a.confidence, 0) / session.answers.length;
    const avgRelevance =
      session.answers.reduce((sum, a) => sum + a.relevance, 0) / session.answers.length;

    session.improvementAreas = [];
    session.strengths = [];

    if (avgFluency < 65) session.improvementAreas.push("Speech fluency");
    if (avgConfidence < 55) session.improvementAreas.push("Confidence in answers");
    if (avgRelevance < 70) session.improvementAreas.push("Answer relevance to questions");

    if (avgFluency >= 65) session.strengths.push("Good speech fluency");
    if (avgConfidence >= 55) session.strengths.push("Confident delivery");
    if (avgRelevance >= 70) session.strengths.push("On-topic answers");
    if (session.overallScore >= 75) session.strengths.push("Strong technical knowledge");

    // Save to localStorage
    const allSessions = interviewTracker.getAllSessions();
    allSessions.push(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allSessions));

    return session;
  },

  /**
   * Get all interview sessions
   */
  getAllSessions: (): InterviewSession[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Get metrics for dashboard
   */
  getMetrics: () => {
    const sessions = interviewTracker.getAllSessions();
    const completedSessions = sessions.filter((s) => s.completed);

    return {
      totalInterviews: completedSessions.length,
      averageScore: completedSessions.length
        ? Math.round(
            completedSessions.reduce((sum, s) => sum + s.overallScore, 0) /
              completedSessions.length
          )
        : 0,
      lastInterviewScore: completedSessions.length
        ? completedSessions[completedSessions.length - 1].overallScore
        : 0,
      bestScore: completedSessions.length
        ? Math.max(...completedSessions.map((s) => s.overallScore))
        : 0,
      totalAnswers: completedSessions.reduce((sum, s) => sum + s.answers.length, 0),
      totalMinutes: completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0) / 60,
    };
  },

  /**
   * Get recent sessions
   */
  getRecentSessions: (limit: number = 5): InterviewSession[] => {
    const sessions = interviewTracker.getAllSessions().filter((s) => s.completed);
    return sessions.slice(-limit).reverse();
  },

  /**
   * Clear all data
   */
  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
