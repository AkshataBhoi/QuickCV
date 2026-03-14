import mammoth from "mammoth";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const pdfParse = require("pdf-parse");
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

/**
 * Extracts raw text from a PDF or DOCX buffer.
 * @param {Buffer} buffer - The file buffer.
 * @param {string} mimetype - The file's MIME type.
 * @returns {Promise<string>} - Extracted text.
 */

export const extractTextFromBuffer = async (buffer, mimetype) => {
  if (mimetype === "application/pdf") {
    // 🔥 FIX: Convert Buffer → Uint8Array
    const uint8Array = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(" ");
    }
    return text.trim();
  } else if (
    mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimetype === "application/msword"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  } else if (mimetype === "text/plain") {
    return buffer.toString("utf8").trim();
  } else {
    throw new Error("Unsupported file type. Please upload PDF, DOCX, or TXT.");
  }
};
/**
 * Normalizes text for better keyword matching (lowercase, removes special chars, handles whitespace).
 * @param {string} text - The input text.
 * @returns {string} - Normalized text.
 */
export const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // replace punctuation with spaces
    .replace(/\s+/g, " ") // collapse whitespace
    .trim();
};

/**
 * Extracts common keywords (rough implementation, better to use NLP or a library).
 * @param {string} text - The input text.
 * @returns {string[]} - Array of words.
 */
export const getKeywords = (text) => {
  const normalized = normalizeText(text);
  const stopwords = new Set([
    "a", "an", "the", "and", "or", "but", "if", "then", "else", "when", "at", "from",
    "by", "for", "with", "about", "against", "between", "into", "through", "during",
    "before", "after", "above", "below", "to", "of", "in", "on", "is", "are", "was",
    "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "can",
    "could", "shall", "should", "will", "would", "may", "might", "must", "us", "i",
    "you", "he", "she", "it", "we", "they", "me", "him", "her", "them", "my", "your",
    "his", "its", "our", "their", "this", "that", "these", "those"
  ]);

  return normalized
    .split(" ")
    .filter((word) => word.length > 2 && !stopwords.has(word));
};
