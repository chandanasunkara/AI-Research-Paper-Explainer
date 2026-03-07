import { getDocumentProxy, extractText } from "unpdf";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = new Uint8Array(buffer);
    const pdf = await getDocumentProxy(data);
    const { text } = await extractText(pdf, { mergePages: true });
    const normalized = (text ?? "")
      .replace(/\s+/g, " ")
      .trim();
    return normalized.slice(0, 30_000);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`PDF parsing failed: ${message}`);
  }
}
