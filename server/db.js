import { v4 as uuidv4 } from "uuid";

/**
 * In-memory database storage
 * In production, replace with MongoDB or PostgreSQL
 */

class Database {
  constructor() {
    this.users = [];
    this.resumes = [];
    this.interviews = [];
    this.questions = [];
    this.responses = [];
    this.results = [];
  }

  // User operations
  createUser(userData) {
    const user = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  getUser(id) {
    return this.users.find(u => u.id === id);
  }

  getUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  // Resume operations
  createResume(resumeData) {
    const resume = {
      id: uuidv4(),
      ...resumeData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.resumes.push(resume);
    return resume;
  }

  getResume(id) {
    return this.resumes.find(r => r.id === id);
  }

  getResumesByUserId(userId) {
    return this.resumes.filter(r => r.userId === userId);
  }

  // Interview operations
  createInterview(interviewData) {
    const interview = {
      id: uuidv4(),
      ...interviewData,
      createdAt: new Date(),
      updatedAt: new Date(),
      questionsAnswered: 0,
      responses: []
    };
    this.interviews.push(interview);
    return interview;
  }

  getInterview(id) {
    return this.interviews.find(i => i.id === id);
  }

  getInterviewsByUserId(userId) {
    return this.interviews.filter(i => i.userId === userId);
  }

  updateInterview(id, data) {
    const interview = this.getInterview(id);
    if (!interview) throw new Error("Interview not found");
    
    Object.assign(interview, data, { updatedAt: new Date() });
    return interview;
  }

  // Question operations
  createQuestion(questionData) {
    const question = {
      id: uuidv4(),
      ...questionData,
      createdAt: new Date()
    };
    this.questions.push(question);
    return question;
  }

  getQuestion(id) {
    return this.questions.find(q => q.id === id);
  }

  getQuestionsByInterviewId(interviewId) {
    return this.questions.filter(q => q.interviewId === interviewId);
  }

  // Response operations
  createResponse(responseData) {
    const response = {
      id: uuidv4(),
      ...responseData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.responses.push(response);
    return response;
  }

  getResponse(id) {
    return this.responses.find(r => r.id === id);
  }

  getResponsesByQuestionId(questionId) {
    return this.responses.filter(r => r.questionId === questionId);
  }

  getResponsesByInterviewId(interviewId) {
    return this.responses.filter(r => r.interviewId === interviewId);
  }

  // Results operations
  createResult(resultData) {
    const result = {
      id: uuidv4(),
      ...resultData,
      createdAt: new Date()
    };
    this.results.push(result);
    return result;
  }

  getResult(id) {
    return this.results.find(r => r.id === id);
  }

  getResultsByInterviewId(interviewId) {
    return this.results.filter(r => r.interviewId === interviewId);
  }

  getResultsByUserId(userId) {
    return this.results.filter(r => r.userId === userId);
  }

  // Clear all data (for testing)
  clear() {
    this.users = [];
    this.resumes = [];
    this.interviews = [];
    this.questions = [];
    this.responses = [];
    this.results = [];
  }

  // Get dashboard statistics
  getUserStats(userId) {
    const resumes = this.getResumesByUserId(userId);
    const interviews = this.getInterviewsByUserId(userId);
    const results = this.getResultsByUserId(userId);
    
    const totalScore = results.reduce((sum, r) => sum + (r.overallScore || 0), 0);
    const averageScore = results.length > 0 ? Math.round(totalScore / results.length) : 0;
    
    return {
      resumesCount: resumes.length,
      interviewsCount: interviews.length,
      completedInterviews: results.length,
      averageScore,
      totalSkills: resumes.reduce((sum, r) => sum + (r.parsedData?.skills?.length || 0), 0),
      recentActivity: [...interviews, ...results].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10)
    };
  }
}

// Export singleton instance
export const db = new Database();

// For testing - export the class
export default Database;
