type GeminiRequest = {
  prompt: string;
  systemContext?: string;
  imageBase64?: string;
  responseFormat?: "json" | "text";
  model?: string;
};

type GeminiResponse = {
  success: boolean;
  data?: string;
  error?: string;
};

const GEMINI_ENDPOINT = import.meta.env.DEV
  ? "http://localhost:5000/api/gemini"
  : "/api/gemini";

export async function callGeminiClient(payload: GeminiRequest): Promise<GeminiResponse> {
  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      return {
        success: false,
        error: data.error || `Gemini request failed with ${response.status}`,
      };
    }

    return {
      success: true,
      data: typeof data.data === "string" ? data.data : JSON.stringify(data.data || ""),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to call Gemini API",
    };
  }
}
