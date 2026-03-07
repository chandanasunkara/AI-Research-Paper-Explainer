import pdf from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    const text = data.text
      .replace(/\s+/g, " ")
      .trim();
    return text.slice(0, 30_000);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`PDF parsing failed: ${message}`);
  }
}
