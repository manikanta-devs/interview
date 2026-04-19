import { describe, it, expect, vi, beforeEach } from "vitest";
import { callGeminiClient } from "./geminiClient";

describe("callGeminiClient", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns success with string data on a valid response", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: "Hello from Gemini" }),
    });

    const result = await callGeminiClient({ prompt: "Hello" });

    expect(result.success).toBe(true);
    expect(result.data).toBe("Hello from Gemini");
  });

  it("serializes non-string data field to a JSON string", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: { key: "value" } }),
    });

    const result = await callGeminiClient({ prompt: "test" });

    expect(result.success).toBe(true);
    expect(result.data).toBe(JSON.stringify({ key: "value" }));
  });

  it("returns error when the HTTP response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Unauthorized" }),
    });

    const result = await callGeminiClient({ prompt: "Hello" });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Unauthorized");
  });

  it("returns error when server responds with success:false", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, error: "API key missing" }),
    });

    const result = await callGeminiClient({ prompt: "Hello" });

    expect(result.success).toBe(false);
    expect(result.error).toBe("API key missing");
  });

  it("includes a status-based error message when the body has no error field", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 503,
      json: async () => ({}),
    });

    const result = await callGeminiClient({ prompt: "Hello" });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/503/); // contains HTTP status code
  });

  it("returns error when fetch throws a network error", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network failure"));

    const result = await callGeminiClient({ prompt: "Hello" });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Network failure");
  });

  it("sends a POST request with JSON content-type", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: "ok" }),
    });

    await callGeminiClient({ prompt: "test" });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/gemini"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("includes all payload fields in the request body", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: "ok" }),
    });

    await callGeminiClient({
      prompt: "my prompt",
      systemContext: "be helpful",
      responseFormat: "json",
      model: "gemini-2.0-flash",
    });

    const callArgs = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const body = JSON.parse(callArgs[1].body);

    expect(body.prompt).toBe("my prompt");
    expect(body.systemContext).toBe("be helpful");
    expect(body.responseFormat).toBe("json");
    expect(body.model).toBe("gemini-2.0-flash");
  });

  it("returns a generic error message when fetch rejects without a message", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce({});

    const result = await callGeminiClient({ prompt: "Hello" });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to call Gemini API");
  });
});
