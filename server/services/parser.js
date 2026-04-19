/**
 * Speech-to-text service using Web Speech API (frontend compatible)
 * Backend mock for testing
 */

export async function transcribeAudio(audioBlob) {
  // This is a mock - in production, use Google Speech-to-Text API
  return {
    text: "Transcribed text will appear here when audio is processed",
    confidence: 0.95,
    duration: audioBlob.size / 16000
  };
}

/**
 * Extract text from PDF resume
 */
export async function extractPdfText(pdfPath) {
  // This requires pdf-parse library
  try {
    const pdf = require("pdf-parse");
    const fs = require("fs").promises;
    
    const dataBuffer = await fs.readFile(pdfPath);
    const data = await pdf(dataBuffer);
    
    return data.text;
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error("Failed to extract PDF");
  }
}

/**
 * Extract text from Word document
 */
export async function extractDocxText(docxPath) {
  // This requires mammoth library
  try {
    const mammoth = require("mammoth");
    
    const result = await mammoth.extractRawText({ path: docxPath });
    return result.value;
  } catch (error) {
    console.error("DOCX extraction error:", error);
    throw new Error("Failed to extract DOCX");
  }
}

/**
 * Parse uploaded resume file
 */
export async function parseResumeFile(filePath, mimeType) {
  if (mimeType === "application/pdf") {
    return extractPdfText(filePath);
  } else if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    return extractDocxText(filePath);
  } else if (mimeType === "text/plain") {
    const fs = require("fs").promises;
    return fs.readFile(filePath, "utf-8");
  } else {
    throw new Error("Unsupported file format");
  }
}
