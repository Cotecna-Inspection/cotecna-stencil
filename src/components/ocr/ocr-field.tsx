import { Component, EventEmitter, h, Prop, State, Event } from '@stencil/core';
import { Field } from '../../models/field';
import { getIconPNGPath, getSymbol, isValid } from '../../utils/field-utils';
import { OCRResult } from './models/ocr-result.model';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ControlState } from '../../models/controlState';
declare var mltext;

/** @internal **/
@Component({
  tag: 'cotecna-ocr',
  styleUrl: 'ocr-field.scss',
  shadow: true,
})
export class OcrField {
  @Prop()
  public field!: Field;

  @Prop()
  public control!: any;

  @State()
  private ocrResult: OCRResult = null;

  @State()
  private ocrResultAsString: string = null;

  @Event()
  public fieldChange: EventEmitter<ControlState>;

  render() {
    return (
      <div class="ocr-field-container" part="container">
        { this.getFieldLabel() }
        { this.getFieldContainer() }
      </div>
    );
  }

  private getFieldLabel(): any {
    return (
      <div class="label-container">
          <label part="label">
            {this.field.label}
            {getSymbol(this.field)}
          </label>
        </div>
    )
  }

  private getFieldContainer(): any {
    return (
      <div class={{"field-container": true, 'invalid-field': !isValid(this.field)}}>
        <textarea id={`ocr-result-${this.field.id}`}
          rows={4} cols={50} 
          value={this.field.value}
          onChange={(e) => this.onChangeOcrResult(e)}>
        </textarea>
        <button onClick={() => this.takePictureAndPerformOcr()}><img src={getIconPNGPath('photo_camera')}></img></button>
        <button onClick={() => this.deleteOcrResult()}><img src={getIconPNGPath('delete')}></img></button>
      </div>
    )
  }

  private onChangeOcrResult(event: Event): void {
    const target: any = event.target;
    this.ocrResultAsString = (target.value !== '') ? target.value : null;
    this.onChange();
  }

  private async takePictureAndPerformOcr(): Promise<void> {
    try {
      const image = await Camera.getPhoto({ quality: 100, allowEditing: false, resultType: CameraResultType.Uri });
      this.performOCR(image.path);
    } catch(err) {
      console.error('take picture and perform ocr', err);
      throw err;
    }
  }

  private deleteOcrResult(): void {
    this.ocrResult = null;
    this.ocrResultAsString = null;
    this.onChange();
  }
  
  private performOCR(imageData: any): void {
    const ocrOptions = { imgType: 0, imgSrc: imageData };
    mltext.getText((result: any) => {
      if (result.foundText) {
        this.ocrResult = this.mapToOcrResult(result);
        this.setOcrResultAsString();
        this.onChange();
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

  private setOcrResultAsString(): void {
    this.ocrResultAsString = this.ocrResult?.lines?.lineText.map(text => `${text}\n`)?.toString();
  }

  private onChange(): void {
    this.field.value = this.ocrResultAsString;
    this.fieldChange.emit({
      isValid: isValid(this.field),
      value: this.field.value
    })
  }
}
