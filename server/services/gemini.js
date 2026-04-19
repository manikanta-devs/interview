import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy-key");

/**
 * Parse resume and extract skills, experience, education
 */
export async function parseResume(resumeText) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
You are an expert resume parser and job analyst. Analyze the following resume and extract structured information.

Resume:
${resumeText}

Return a JSON object with this exact structure (no markdown, pure JSON):
{
  "skills": ["skill1", "skill2", ...],
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "duration": "X years",
      "description": "Brief description"
    }
  ],
  "education": [
    {
      "degree": "Degree Type",
      "field": "Field of Study",
      "school": "School Name",
      "year": 2020
    }
  ],
  "summary": "2-3 line summary of the candidate",
  "score": 85,
  "strengthAreas": ["Area 1", "Area 2"],
  "improvementAreas": ["Area 1", "Area 2"]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      skills: [],
      experience: [],
      education: [],
      summary: "Resume analysis in progress",
      score: 0,
      strengthAreas: [],
      improvementAreas: []
    };
  } catch (error) {
    console.error("Resume parsing error:", error);
    throw new Error("Failed to parse resume");
  }
}

/**
 * Generate interview questions based on resume and role
 */
export async function generateInterviewQuestions(resumeData, jobRole, count = 5) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
You are an expert interview coach. Generate ${count} interview questions for a ${jobRole} position based on this candidate's profile.

Resume Summary: ${resumeData.summary}
Key Skills: ${resumeData.skills.join(", ")}
Experience: ${resumeData.experience.map(e => `${e.title} at ${e.company}`).join(", ")}

Generate questions that:
1. Are relevant to their experience
2. Probe for deeper technical knowledge
3. Assess behavioral skills
4. Challenge their weaknesses
5. Follow STAR method framework

Return a JSON array with this structure (no markdown, pure JSON):
[
  {
    "id": 1,
    "category": "technical|behavioral|resume",
    "difficulty": "easy|medium|hard",
    "question": "Full question text",
    "topic": "The topic this question covers"
  },
  ...
]
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return [];
  } catch (error) {
    console.error("Question generation error:", error);
    throw new Error("Failed to generate questions");
  }
}

/**
 * Evaluate interview answer
 */
export async function evaluateAnswer(question, answer) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
You are an expert interview evaluator. Evaluate this interview answer objectively.

Question: ${question}
Answer: ${answer}

Evaluate on:
1. Relevance (0-100)
2. Clarity (0-100)
3. Confidence (0-100)
4. Structure (0-100)
5. Impact (0-100)

Return a JSON object (no markdown, pure JSON):
{
  "score": 0-100,
  "relevance": 0-100,
  "clarity": 0-100,
  "confidence": 0-100,
  "structure": 0-100,
  "impact": 0-100,
  "feedback": "Constructive feedback (2-3 sentences)",
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "suggestedAnswer": "Brief example of a better answer structure"
}
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      score: 0,
      feedback: "Unable to evaluate answer",
      strengths: [],
      improvements: []
    };
  } catch (error) {
    console.error("Answer evaluation error:", error);
    throw new Error("Failed to evaluate answer");
  }
}

/**
 * Generate comprehensive feedback and improvement roadmap
 */
export async function generateFeedback(interviewData, resumeData) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
You are a career coach and interview expert. Create a comprehensive feedback report.

Interview Results:
- Overall Score: ${interviewData.overallScore}
- Questions Answered: ${interviewData.questionsAnswered || 0}
- Average Response Score: ${interviewData.averageScore || 0}

Resume Profile:
- Strengths: ${resumeData.strengthAreas.join(", ")}
- Areas to Improve: ${resumeData.improvementAreas.join(", ")}

Generate a JSON object (no markdown, pure JSON):
{
  "overallFeedback": "2-3 sentence summary",
  "topStrengths": ["strength1", "strength2", "strength3"],
  "criticalImprovements": ["area1", "area2"],
  "actionPlan": [
    {
      "priority": "high|medium|low",
      "action": "Specific action to take",
      "timeline": "1 week|2 weeks|1 month",
      "expectedImpact": "What will improve"
    }
  ],
  "readinessScore": 0-100,
  "estimatedTimeToReady": "X weeks",
  "recommendedPractice": ["Practice area 1", "Practice area 2"]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      overallFeedback: "Feedback generation pending",
      topStrengths: [],
      criticalImprovements: [],
      actionPlan: []
    };
  } catch (error) {
    console.error("Feedback generation error:", error);
    throw new Error("Failed to generate feedback");
  }
}
