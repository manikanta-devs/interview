import { describe, it, expect, vi, beforeEach } from "vitest";
import { aiService } from "./aiService";
import * as geminiClientModule from "./geminiClient";

describe("aiService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("evaluateAnswer", () => {
    it("returns score and feedback on a successful Gemini response", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({ score: 85, feedback: "Great structured answer!" }),
      });

      const result = await aiService.aiEvaluation.evaluateAnswer(
        "What is React?",
        "React is a JavaScript library for building user interfaces."
      );

      expect(result.score).toBe(85);
      expect(result.feedback).toBe("Great structured answer!");
    });

    it("returns fallback when Gemini API call fails", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: false,
        error: "Service unavailable",
      });

      const result = await aiService.aiEvaluation.evaluateAnswer(
        "Tell me about yourself.",
        "I am a software engineer."
      );

      expect(result.score).toBe(75);
      expect(typeof result.feedback).toBe("string");
      expect(result.feedback.length).toBeGreaterThan(0);
    });

    it("returns fallback when response is not valid JSON", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: "not a json response",
      });

      const result = await aiService.aiEvaluation.evaluateAnswer("Q", "A");

      expect(result.score).toBe(75);
    });

    it("clamps score to 100 when Gemini returns a value above 100", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({ score: 150, feedback: "Exceptional answer!" }),
      });

      const result = await aiService.aiEvaluation.evaluateAnswer("Q", "A");

      expect(result.score).toBeLessThanOrEqual(100);
    });

    it("clamps score to 0 when Gemini returns a negative value", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({ score: -10, feedback: "Poor answer." }),
      });

      const result = await aiService.aiEvaluation.evaluateAnswer("Q", "A");

      expect(result.score).toBeGreaterThanOrEqual(0);
    });
  });

  describe("generateQuestions", () => {
    it("returns an array of questions on success", async () => {
      const mockQuestions = ["Question 1?", "Question 2?", "Question 3?"];
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify(mockQuestions),
      });

      const result = await aiService.aiEvaluation.generateQuestions("React", 3);

      expect(result).toEqual(mockQuestions);
    });

    it("respects the count limit", async () => {
      const mockQuestions = ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?"];
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify(mockQuestions),
      });

      const result = await aiService.aiEvaluation.generateQuestions("React", 3);

      expect(result.length).toBeLessThanOrEqual(3);
    });

    it("returns fallback questions when the API fails", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: false,
        error: "Rate limit exceeded",
      });

      const result = await aiService.aiEvaluation.generateQuestions("React");

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it("returns fallback questions when response is not a JSON array", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: "Here are some questions:",
      });

      const result = await aiService.aiEvaluation.generateQuestions("React");

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("analyzeCommunication", () => {
    it("returns communication metrics on a successful response", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({
          clarity: 80,
          engagement: 70,
          structure: 85,
          suggestions: ["Use fewer filler words", "Be more concise"],
        }),
      });

      const result = await aiService.aiEvaluation.analyzeCommunication(
        "I think that, umm, React is really good for building UIs."
      );

      expect(result.clarity).toBe(80);
      expect(result.engagement).toBe(70);
      expect(result.structure).toBe(85);
      expect(result.suggestions).toEqual([
        "Use fewer filler words",
        "Be more concise",
      ]);
    });

    it("returns fallback metrics when the API fails", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: false,
        error: "API error",
      });

      const result = await aiService.aiEvaluation.analyzeCommunication("text");

      expect(result.clarity).toBeGreaterThan(0);
      expect(result.engagement).toBeGreaterThan(0);
      expect(result.structure).toBeGreaterThan(0);
      expect(Array.isArray(result.suggestions)).toBe(true);
    });

    it("clamps metric values within 0-100 range", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({
          clarity: 120,
          engagement: -5,
          structure: 200,
          suggestions: [],
        }),
      });

      const result = await aiService.aiEvaluation.analyzeCommunication("text");

      expect(result.clarity).toBeLessThanOrEqual(100);
      expect(result.engagement).toBeGreaterThanOrEqual(0);
      expect(result.structure).toBeLessThanOrEqual(100);
    });

    it("limits suggestions to 3 items", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({
          clarity: 75,
          engagement: 75,
          structure: 75,
          suggestions: ["tip1", "tip2", "tip3", "tip4", "tip5"],
        }),
      });

      const result = await aiService.aiEvaluation.analyzeCommunication("text");

      expect(result.suggestions.length).toBeLessThanOrEqual(3);
    });
  });
});
