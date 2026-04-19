/**
 * Advanced Resume Parser
 * Supports PDF, DOCX, and plain text
 * Uses PDF.js and Mammoth.js
 */

import * as mammoth from "mammoth";

/**
 * Extract text from PDF using canvas + PDF.js
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Load PDF.js from CDN
    if (!(window as any).pdfjsLib) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      await new Promise((resolve) => {
        script.onload = resolve;
        document.head.appendChild(script);
      });
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await (window as any).pdfjsLib.getDocument(arrayBuffer).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    return fullText;
  } catch (error) {
    console.error("PDF extraction failed:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

/**
 * Extract text from DOCX using Mammoth
 */
export async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error("DOCX extraction failed:", error);
    throw new Error("Failed to extract text from DOCX");
  }
}

/**
 * Extract text from plain text files
 */
export async function extractTextFromTXT(file: File): Promise<string> {
  try {
    return await file.text();
  } catch (error) {
    console.error("Text extraction failed:", error);
    throw new Error("Failed to extract text from file");
  }
}

/**
 * Main function to extract resume text from any file type
 */
export async function parseResume(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith(".pdf")) {
    return extractTextFromPDF(file);
  } else if (fileName.endsWith(".docx")) {
    return extractTextFromDOCX(file);
  } else if (fileName.endsWith(".txt")) {
    return extractTextFromTXT(file);
  } else {
    throw new Error("Unsupported file type. Please upload PDF, DOCX, or TXT.");
  }
}

/**
 * Clean and normalize resume text
 */
export function normalizeResumeText(text: string): string {
  return text
    .replace(/\s+/g, " ") // Multiple spaces to single
    .replace(/\n{3,}/g, "\n\n") // Multiple newlines to double
    .trim();
}

/**
 * Extract structured data from resume text
 */
export function extractResumeStructure(resumeText: string) {
  const lines = resumeText.split("\n");

  return {
    fullText: resumeText,
    rawLines: lines,
    lineCount: lines.length,
    wordCount: resumeText.split(/\s+/).length,
    hasContact: /(\+91|email|@|phone|mobile)/i.test(resumeText),
    hasLinks: /(github|linkedin|portfolio|website|http)/i.test(resumeText),
    sections: extractSections(resumeText),
  };
}

/**
 * Identify common resume sections
 */
function extractSections(text: string) {
  const sectionPatterns = {
    summary: /summary|objective|profile/i,
    experience: /experience|work history|employment/i,
    education: /education|academic|degree|university/i,
    skills: /skills|technical|competencies|expertise/i,
    projects: /projects|portfolio|achievements|accomplishments/i,
    certifications: /certifications|certificates|courses|training/i,
    languages: /languages|language proficiency/i,
  };

  const detected: Record<string, boolean> = {};

  for (const [section, pattern] of Object.entries(sectionPatterns)) {
    detected[section] = pattern.test(text);
  }

  return detected;
}

export default {
  parseResume,
  normalizeResumeText,
  extractResumeStructure,
};
