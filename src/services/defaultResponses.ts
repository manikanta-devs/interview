/**
 * Default Mock Responses
 * Provides professional default responses for all features when API key is not available
 * All responses are based on industry best practices
 */

export const defaultResponses = {
  // ============ RESUME ANALYSIS ============
  analyzeResume: () => ({
    score: 78,
    atsScore: 82,
    strengths: [
      "Clear professional summary",
      "Strong action verbs used",
      "Quantifiable achievements",
      "Relevant skills highlighted",
    ],
    weaknesses: [
      "Consider adding metrics to achievements",
      "Add soft skills section",
      "Include certifications if available",
      "Improve keyword density for ATS",
    ],
    suggestions: [
      "Reorder experience by relevance to target role",
      "Add specific tools/technologies used",
      "Include volunteer work or projects",
      "Optimize for Applicant Tracking Systems (ATS)",
    ],
    keywords: {
      technical: ["Python", "JavaScript", "React", "AWS", "SQL", "Git"],
      soft: ["Leadership", "Communication", "Problem Solving", "Teamwork"],
      industry: ["Agile", "Sprint", "Kanban", "DevOps", "CI/CD"],
    },
    improvementAreas: [
      { area: "Format & Structure", score: 85 },
      { area: "Content Quality", score: 78 },
      { area: "Keyword Optimization", score: 72 },
      { area: "Achievement Quantification", score: 68 },
    ],
  }),

  // ============ JD MATCHER ============
  matchJDWithResume: () => ({
    overallMatch: 76,
    breakdown: {
      skillsMatch: 82,
      experienceMatch: 78,
      educationMatch: 65,
      industryMatch: 75,
    },
    matchedSkills: [
      { skill: "JavaScript", match: "95%" },
      { skill: "React", match: "92%" },
      { skill: "Team Leadership", match: "88%" },
      { skill: "Agile Methodology", match: "85%" },
    ],
    missingSkills: [
      { skill: "TypeScript", importance: "High", canLearn: true },
      { skill: "Docker", importance: "Medium", canLearn: true },
      { skill: "Kubernetes", importance: "Medium", canLearn: true },
    ],
    recommendations: [
      "Highlight JavaScript and React projects prominently",
      "Add specific Agile sprint experience",
      "Mention any team leadership examples",
      "Consider learning TypeScript to strengthen candidacy",
    ],
    coverLetterSuggestion: `
      Opening: Reference the company's recent projects in {industry}
      Body: Highlight 3 specific achievements matching JD requirements
      Closing: Express enthusiasm for the specific role and company mission
    `,
    interviewFocusAreas: [
      "Your experience with React in production environments",
      "Examples of leading teams or mentoring junior developers",
      "How you've handled technical challenges",
      "Your approach to code quality and testing",
    ],
  }),

  // ============ STAR COACH ============
  coachSTARAnswer: (userAnswer: string) => ({
    starAnalysis: {
      situation: {
        score: 72,
        feedback:
          "You set up the context well. Consider being more specific about the business context.",
        example: "The company had 500 employees, and our team handled 40% of revenue-generating projects.",
      },
      task: {
        score: 85,
        feedback: "Clear definition of your role and responsibilities.",
        example: "As the senior developer, I was responsible for architecting the solution and guiding the team.",
      },
      action: {
        score: 78,
        feedback: "Good specific actions mentioned. Add more measurable details.",
        example:
          "I led daily standups, implemented code review process, and mentored 3 junior developers.",
      },
      result: {
        score: 88,
        feedback: "Excellent quantifiable results with business impact.",
        example:
          "Delivered 30% faster than projected, reduced bugs by 45%, and team productivity increased by 60%.",
      },
    },
    overallScore: 81,
    perfectAnswer: `
      SITUATION: "At TechCorp, a 500-person company, our 8-person team was responsible for the mobile platform serving 100K users. The system was experiencing 20% monthly user churn due to performance issues."
      
      TASK: "As the tech lead, I was tasked with diagnosing the problem and implementing a solution within 6 weeks before peak season."
      
      ACTION: "I conducted a performance audit, identified database bottlenecks, led a 2-week redesign sprint, implemented caching layer, and established monitoring. I also mentored 2 junior developers on optimization techniques."
      
      RESULT: "We achieved 70% faster load times, reduced database queries by 60%, increased user retention to 95%, and saved the company $2M in potential lost revenue during peak season. The solution became our template for all future projects."
    `,
    keywords: [
      "Led",
      "Improved",
      "Implemented",
      "Achieved",
      "Collaborated",
      "Mentored",
      "Delivered",
    ],
    tips: [
      "Quantify everything - use numbers and percentages",
      "Mention team involvement and leadership",
      "Show business impact, not just technical excellence",
      "Practice telling this story in 2-3 minutes",
    ],
  }),

  // ============ CHEAT SHEET ============
  generateCheatSheet: (role: string) => ({
    role: role,
    topQuestions: [
      {
        question: "Tell me about yourself and your relevant experience.",
        answerBullets: [
          "Start with 2-3 sentence overview of career",
          `Highlight ${role} specific achievements`,
          "End with why interested in this role",
        ],
        timeLimit: "2-3 minutes",
      },
      {
        question: "Why are you interested in this position?",
        answerBullets: [
          "Research company thoroughly",
          "Align personal values with company mission",
          "Highlight specific role aspects that excite you",
        ],
        timeLimit: "1-2 minutes",
      },
      {
        question: "What are your key strengths?",
        answerBullets: [
          "Pick 3-4 relevant strengths",
          "Back each with a specific example",
          "Link to job requirements",
        ],
        timeLimit: "2 minutes",
      },
      {
        question: "Describe a challenge you overcame.",
        answerBullets: [
          "Use STAR method (Situation, Task, Action, Result)",
          `Make it relevant to ${role} role`,
          "Quantify the impact",
        ],
        timeLimit: "2-3 minutes",
      },
    ],
    technicalConcepts: [
      {
        topic: "Core Industry Terms",
        items: [
          "Understand current industry trends",
          "Know company's main competitors",
          "Familiarize with industry challenges",
        ],
      },
      {
        topic: "Company Information",
        items: [
          "Recent funding or acquisitions",
          "Product roadmap/recent launches",
          "Company culture and values",
          "Recent news and announcements",
        ],
      },
      {
        topic: "Role-Specific Knowledge",
        items: [
          `${role} responsibilities and expectations`,
          "Team structure and reporting lines",
          "Success metrics for the role",
        ],
      },
    ],
    salaryRange: {
      junior: "$50K - $70K",
      mid: "$80K - $120K",
      senior: "$130K - $200K",
    },
    redFlags: [
      "Not asking questions about role/team",
      "Appearing desperate or too eager",
      "Criticizing previous employers",
      "Not making eye contact or poor body language",
    ],
    greenFlags: [
      "Asking thoughtful questions",
      "Showing genuine enthusiasm",
      "Providing specific examples",
      "Demonstrating research about company",
    ],
  }),

  // ============ SALARY SIMULATOR ============
  generateSalaryNegotiationScenario: (role: string, experience: number) => {
    const baseSalary = 80000 + experience * 15000;
    return {
      role: role,
      experience: experience,
      marketRate: {
        junior: "$50K - $70K",
        mid: "$80K - $120K",
        senior: "$130K - $200K+",
      },
      suggestedSalary: baseSalary,
      negotiationTips: [
        "Research market rate before negotiation",
        "Come with 3 salary anchor points",
        "Negotiate total compensation, not just base",
        "Don't reveal previous salary",
        "Be prepared to walk away",
      ],
      benefits: [
        "Health Insurance (medical, dental, vision)",
        "401(k) with company match",
        "PTO: 20 days minimum",
        "Remote work flexibility",
        "Professional development budget",
        "Stock options/equity",
      ],
      firstHRMessage: `Thanks for making it through our interview process! We'd like to move forward with an offer. Before we finalize, let's discuss compensation. We're thinking in the range of $${Math.round(baseSalary * 0.85) / 1000}K - $${Math.round(baseSalary * 0.95) / 1000}K for this ${role} position. What are your salary expectations?`,
      conversationStarters: [
        "I appreciate the offer. Based on my research and experience, I was expecting around $X.",
        "Thank you. I'm excited about the role. I'd like to discuss a range of $X-$Y.",
        "I'm very interested. Can you share the full compensation package including benefits?",
      ],
      responses: {
        positive: [
          "That's in line with our budget. Let's finalize the offer.",
          "We can work with that. Let's also discuss equity options.",
          "Good. We can also offer additional PTO and remote flexibility.",
        ],
        negotiate: [
          "That's higher than our initial range. Can we discuss other benefits?",
          "That's outside our current budget, but we can offer X months signing bonus.",
          "Let's look at total compensation including equity and benefits.",
        ],
      },
    };
  },

  // ============ ADVANCED DASHBOARD ============
  generateDashboardMetrics: () => ({
    performanceMetrics: {
      overallScore: 82,
      consistency: 78,
      improvement: 12,
      trainingHours: 45,
    },
    categoryScores: [
      { category: "Communication", score: 88 },
      { category: "Technical Knowledge", score: 82 },
      { category: "Problem Solving", score: 75 },
      { category: "Confidence", score: 80 },
      { category: "Eye Contact", score: 76 },
    ],
    trends: [
      { week: "Week 1", score: 65 },
      { week: "Week 2", score: 70 },
      { week: "Week 3", score: 76 },
      { week: "Week 4", score: 82 },
      { week: "Week 5", score: 85 },
    ],
    recommendations: [
      "Continue practicing mock interviews weekly",
      "Focus on technical depth in your domain",
      "Record yourself to improve eye contact",
      "Join interview groups for peer feedback",
      "Consider industry certifications",
    ],
    insights: [
      "Your communication skills are excellent and improving",
      "Focus on technical questions to boost confidence",
      "Practice body language and eye contact",
      "You're on track for your interview goals",
    ],
  }),
};

/**
 * Helper to get default response based on feature
 */
export function getDefaultResponse(feature: string, params?: any) {
  switch (feature) {
    case "resume":
      return defaultResponses.analyzeResume();
    case "jd-matcher":
      return defaultResponses.matchJDWithResume();
    case "star-coach":
      return defaultResponses.coachSTARAnswer(params?.answer || "");
    case "cheat-sheet":
      return defaultResponses.generateCheatSheet(params?.role || "Target Role");
    case "salary":
      return defaultResponses.generateSalaryNegotiationScenario(
        params?.role || "Your Role",
        params?.experience || 3
      );
    case "dashboard":
      return defaultResponses.generateDashboardMetrics();
    default:
      return {};
  }
}
