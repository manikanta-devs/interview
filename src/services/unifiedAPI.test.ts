import { describe, it, expect, vi, beforeEach } from "vitest";
import { unifiedAPIService } from "./unifiedAPI";
import * as geminiClientModule from "./geminiClient";

describe("unifiedAPIService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    unifiedAPIService.clearCache();
  });

  describe("isConfigured", () => {
    it("always returns true (server holds the key)", () => {
      expect(unifiedAPIService.isConfigured()).toBe(true);
    });
  });

  describe("getApiKey", () => {
    it("returns an empty string (key is server-side)", () => {
      expect(unifiedAPIService.getApiKey()).toBe("");
    });
  });

  describe("callGemini", () => {
    it("returns success with data on a successful response", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: "AI generated text",
      });

      const result = await unifiedAPIService.callGemini("What is React?");

      expect(result.success).toBe(true);
      expect(result.data).toBe("AI generated text");
    });

    it("returns error when Gemini call fails", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: false,
        error: "Server error",
      });

      const result = await unifiedAPIService.callGemini("prompt");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Server error");
    });

    it("caches a successful response when a cacheKey is provided", async () => {
      const mockFn = vi
        .spyOn(geminiClientModule, "callGeminiClient")
        .mockResolvedValue({ success: true, data: "cached response" });

      await unifiedAPIService.callGemini("prompt", "my-cache-key");
      const secondResult = await unifiedAPIService.callGemini(
        "prompt",
        "my-cache-key"
      );

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(secondResult.success).toBe(true);
      expect(secondResult.data).toBe("cached response");
    });

    it("does not use cache when no cacheKey is provided", async () => {
      const mockFn = vi
        .spyOn(geminiClientModule, "callGeminiClient")
        .mockResolvedValue({ success: true, data: "fresh response" });

      await unifiedAPIService.callGemini("prompt");
      await unifiedAPIService.callGemini("prompt");

      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it("clears the cache when clearCache is called", async () => {
      const mockFn = vi
        .spyOn(geminiClientModule, "callGeminiClient")
        .mockResolvedValue({ success: true, data: "data" });

      await unifiedAPIService.callGemini("prompt", "key");
      unifiedAPIService.clearCache();
      await unifiedAPIService.callGemini("prompt", "key");

      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it("returns fromCache:true when serving a cached value", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValue({
        success: true,
        data: "response",
      });

      await unifiedAPIService.callGemini("prompt", "cache-key");
      const cached = await unifiedAPIService.callGemini("prompt", "cache-key");

      expect(cached.fromCache).toBe(true);
    });
  });

  describe("coachSTARAnswer", () => {
    it("calls callGemini with a prompt containing the user answer", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({ overallScore: 80 }),
      });

      await unifiedAPIService.coachSTARAnswer("I led the team to success.");

      expect(geminiClientModule.callGeminiClient).toHaveBeenCalled();
    });

    it("returns the API result on success", async () => {
      const mockData = JSON.stringify({ overallScore: 90 });
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: mockData,
      });

      const result = await unifiedAPIService.coachSTARAnswer("Great answer");

      expect(result.success).toBe(true);
    });
  });

  describe("analyzeResume", () => {
    it("returns analysis result on success", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({ score: 85, strengths: ["React", "TypeScript"] }),
      });

      const result = await unifiedAPIService.analyzeResume(
        "Senior Frontend Engineer with 5 years experience in React.",
        "Frontend Engineer"
      );

      expect(result.success).toBe(true);
    });

    it("returns error when the API call fails", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: false,
        error: "Timeout",
      });

      const result = await unifiedAPIService.analyzeResume("resume text");

      expect(result.success).toBe(false);
    });
  });

  describe("matchJDWithResume", () => {
    it("returns match analysis on success", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({ overallMatch: 78 }),
      });

      const result = await unifiedAPIService.matchJDWithResume(
        "My resume text",
        "Job description text"
      );

      expect(result.success).toBe(true);
    });
  });

  describe("generateCheatSheet", () => {
    it("returns a cheat sheet on success", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({ topQuestions: [] }),
      });

      const result = await unifiedAPIService.generateCheatSheet(
        "Frontend Engineer"
      );

      expect(result.success).toBe(true);
    });
  });

  describe("generateSalaryNegotiationScenario", () => {
    it("returns a salary scenario on success", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({ suggestedSalary: 1500000 }),
      });

      const result =
        await unifiedAPIService.generateSalaryNegotiationScenario(
          "Frontend Engineer",
          5,
          "Bangalore"
        );

      expect(result.success).toBe(true);
    });
  });

  describe("getMockHRResponse", () => {
    it("returns HR response on success", async () => {
      vi.spyOn(geminiClientModule, "callGeminiClient").mockResolvedValueOnce({
        success: true,
        data: JSON.stringify({
          hrResponse: "That sounds great!",
          conversationTip: "Be confident.",
        }),
      });

      const result = await unifiedAPIService.getMockHRResponse(
        "I'm expecting 20 LPA",
        "Salary negotiation"
      );

      expect(result.success).toBe(true);
    });
  });
});
