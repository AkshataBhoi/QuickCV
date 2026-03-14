import * as pdf from "pdf-parse";
import mammoth from "mammoth";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const uploadAndParseFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json(new ApiError(400, "No file uploaded"));
        }

        const buffer = req.file.buffer;
        const mimetype = req.file.mimetype;
        let extractedText = "";

        if (mimetype === "application/pdf") {
            const data = await pdf(buffer);
            extractedText = data.text;
        } else if (
            mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            mimetype === "application/msword"
        ) {
            const result = await mammoth.extractRawText({ buffer });
            extractedText = result.value;
        } else {
            return res.status(400).json(new ApiError(400, "Unsupported file type. Please upload PDF or DOCX."));
        }

        if (!extractedText || extractedText.trim().length === 0) {
            return res.status(422).json(new ApiError(422, "Could not extract text from the file."));
        }

        return res.status(200).json(
            new ApiResponse(200, { text: extractedText }, "File parsed successfully")
        );
    } catch (error) {
        console.error("File Parse Error:", error);
        return res.status(500).json(new ApiError(500, error.message || "Failed to parse file"));
    }
};
