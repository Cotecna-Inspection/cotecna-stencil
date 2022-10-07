import { Component, h, State } from '@stencil/core';
import { OCRResult } from './models/ocr-result.model';
declare var mltext;
declare var navigator;

@Component({
  tag: 'cotecna-ocr',
  styleUrl: 'ocr-field.scss',
  shadow: true,
})
export class OcrField {
  @State()
  private ocrResult: OCRResult = null;

  render() {
    return (
      <div class="ocr-field-container">
        { this.ocrResult?.foundText ? this.getOcrResult() : '' }
        <button onClick={() => this.handleGeneration()}>OCR</button>
      </div>
    );
  }

  private getOcrResult(): void {
    return (
      <div>
        { this.ocrResult?.lines?.lineText.map(text => <p>{text}</p>) }
      </div>
    );
  }

  private handleGeneration(): void {
    document.addEventListener("deviceready", () => {
      navigator.camera.getPicture(
        (imageData) => {
          this.performOCR(imageData);
        },
        (err) => {
          console.error('err', err);
        },
        { quality: 100, correctOrientation: true });
    });
  }
  
  private performOCR(imageData: any): void {
    const ocrOptions = { imgType: 0, imgSrc: imageData };
    mltext.getText((result: any) => {
      if (result.foundText) {
        this.ocrResult = this.mapToOcrResult(result);
      }
    }, (err) => {
      console.error('error', err);
    }, ocrOptions);
  }

  private mapToOcrResult(result): OCRResult {
    return {
      foundText: result.foundText,
      lines: { lineText: result.lines.linetext },
      words: { wordText: result.words.wordtext }
    } as OCRResult;
  }
}
