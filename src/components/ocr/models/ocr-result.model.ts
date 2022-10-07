export interface OCRResult {
  foundText: boolean;
  lines: {
    lineText: string[]
  },
  words: {
    wordText: string[];
  }
}