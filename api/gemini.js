import { callGeminiPrompt } from "../server/services/gemini.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  const {
    prompt,
    systemContext = "",
    imageBase64,
    responseFormat = "text",
    model = "gemini-2.0-flash",
  } = req.body || {};

  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: "Prompt is required",
    });
  }

  try {
    const result = await callGeminiPrompt({
      prompt,
      systemContext,
      imageBase64,
      responseFormat,
      model,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to call Gemini API",
    });
  }
}
