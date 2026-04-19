const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";
import { callGeminiClient } from "./geminiClient";

// Fallback evaluation for when Gemini is not available
const fallbackEvaluation = {
  score: 75,
  feedback:
    "Good response! Focus on including more specific examples and quantifiable results to strengthen your answer.",
};

async function callGemini(prompt: string): Promise<string> {
  const result = await callGeminiClient({
    prompt,
    responseFormat: "text",
    model: GEMINI_MODEL,
  });

  if (!result.success) {
    console.error("Gemini API error:", result.error);
    return "";
  }

  return result.data || "";
}

export const aiService = {
  aiEvaluation: {
    /**
     * Evaluate an interview answer using AI
     * @param question - The interview question
     * @param answer - The candidate's answer
     * @returns Score (0-100) and feedback
     */
    async evaluateAnswer(
      question: string,
      answer: string
    ): Promise<{ score: number; feedback: string }> {
      const prompt = `You are an expert interview coach. Evaluate this interview answer on a scale of 0-100.

Question: "${question}"

Answer: "${answer}"

Provide your evaluation in this exact JSON format:
{
  "score": <number 0-100>,
  "feedback": "<1-2 sentences of constructive feedback>"
}

Only return the JSON, no other text.`;

      try {
        const result = await callGemini(prompt);

        if (!result) {
          return fallbackEvaluation;
        }

        // Parse JSON response
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          return fallbackEvaluation;
        }

        const evaluation = JSON.parse(jsonMatch[0]);
        return {
          score: Math.min(100, Math.max(0, evaluation.score || 75)),
          feedback:
            evaluation.feedback ||
            "Good response! Consider adding more specific examples and quantifiable results.",
        };
      } catch (error) {
        console.error("Error evaluating answer:", error);
        return fallbackEvaluation;
      }
    },

    /**
     * Generate interview questions
     * @param topic - Interview topic (e.g., "React", "System Design")
     * @param count - Number of questions to generate (default 5)
     * @returns Array of generated questions
     */
    async generateQuestions(topic: string, count: number = 5): Promise<string[]> {
      const prompt = `Generate ${count} challenging interview questions for a candidate interviewing for a role focused on: "${topic}".

Format your response as a JSON array of strings with just the questions, no numbering.
Example: ["Question 1?", "Question 2?"]`;

      try {
        const result = await callGemini(prompt);

        if (!result) {
          return [
            "Tell me about yourself and your professional background.",
            "What is your greatest professional strength and why?",
            "Describe a challenging problem you solved recently.",
            "Where do you see yourself in 5 years?",
            "What motivates you in your work?",
          ];
        }

        const questionsMatch = result.match(/\[[\s\S]*\]/);
        if (!questionsMatch) {
          return [
            "Tell me about yourself and your professional background.",
            "What is your greatest professional strength and why?",
            "Describe a challenging problem you solved recently.",
            "Where do you see yourself in 5 years?",
            "What motivates you in your work?",
          ];
        }

        const questions = JSON.parse(questionsMatch[0]);
        return Array.isArray(questions)
          ? questions.slice(0, count)
          : [
              "Tell me about yourself and your professional background.",
              "What is your greatest professional strength and why?",
              "Describe a challenging problem you solved recently.",
              "Where do you see yourself in 5 years?",
              "What motivates you in your work?",
            ];
      } catch (error) {
        console.error("Error generating questions:", error);
        return [
          "Tell me about yourself and your professional background.",
          "What is your greatest professional strength and why?",
          "Describe a challenging problem you solved recently.",
          "Where do you see yourself in 5 years?",
          "What motivates you in your work?",
        ];
      }
    },

    /**
     * Analyze communication quality
     * @param text - Transcript or response to analyze
     * @returns Communication metrics (clarity, engagement, structure)
     */
    async analyzeCommunication(text: string): Promise<{
      clarity: number;
      engagement: number;
      structure: number;
      suggestions: string[];
    }> {
      const prompt = `Analyze this interview response for communication quality:

"${text}"

Evaluate on a scale of 0-100 and provide feedback in this JSON format:
{
  "clarity": <number 0-100>,
  "engagement": <number 0-100>,
  "structure": <number 0-100>,
  "suggestions": ["suggestion 1", "suggestion 2"]
}

Only return the JSON.`;

      try {
        const result = await callGemini(prompt);

        if (!result) {
          return {
            clarity: 70,
            engagement: 65,
            structure: 75,
            suggestions: [
              "Add more specific examples to strengthen your points",
              "Organize your response with clear beginning, middle, and end",
            ],
          };
        }

        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          return {
            clarity: 70,
            engagement: 65,
            structure: 75,
            suggestions: [
              "Add more specific examples to strengthen your points",
              "Organize your response with clear beginning, middle, and end",
            ],
          };
        }

        const analysis = JSON.parse(jsonMatch[0]);
        return {
          clarity: Math.min(100, Math.max(0, analysis.clarity || 70)),
          engagement: Math.min(100, Math.max(0, analysis.engagement || 65)),
          structure: Math.min(100, Math.max(0, analysis.structure || 75)),
          suggestions: Array.isArray(analysis.suggestions)
            ? analysis.suggestions.slice(0, 3)
            : [
                "Add more specific examples to strengthen your points",
                "Organize your response with clear beginning, middle, and end",
              ],
        };
      } catch (error) {
        console.error("Error analyzing communication:", error);
        return {
          clarity: 70,
          engagement: 65,
          structure: 75,
          suggestions: [
            "Add more specific examples to strengthen your points",
            "Organize your response with clear beginning, middle, and end",
          ],
        };
      }
    },
  },
};
