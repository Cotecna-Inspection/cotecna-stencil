import { Component, EventEmitter, h, Prop, State, Event } from '@stencil/core';
import { Field } from '../../models/field';
import { getIconPNGPath, isValid } from '../../utils/field-utils';
import { OCRResult } from './models/ocr-result.model';
import { ControlState } from '../../models/control-state';
import { isMobileView } from '../../utils/check-is-mobile-utils';
import { App } from '@capacitor/app';
import { AppLauncher } from '@capacitor/app-launcher';
import { OcrByDeeplinkConfig } from './models/ocr-by-deeplink-config.model';

declare var navigator;
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

/** TODO: WORKAROUND - The DOM can't detect changes in a property of a complex object that is passed as Prop()
 * For this reason, the variables we want to render the UI have been separated into new Props:
 * - readOnly
 * - required
 */
  @Prop()
  public readOnly: boolean;

  @Prop()
  public required: boolean;

  @Prop()
  public ocrByDeeplinkConfig?: OcrByDeeplinkConfig;

  @State()
  private ocrResult: OCRResult = null;

  @State()
  private ocrResultAsString: string = null;

  @State()
  private hasError: boolean = false;

  @State()
  private textFound: boolean = true;

  @Event()
  public fieldChange: EventEmitter<ControlState>;

  private readonly ERROR_MESSAGE: string = `Something went wrong. Please, try it later.`;
  private readonly NO_TEXT_FOUND_MESSAGE: string = `No text found. Try again with another photo or fill it manually.`;

  componentDidLoad() {
    this.setInitialValues();
    if (this.ocrByDeeplinkConfig?.isEnabled) {
      this.connectDeeplinkCallback();
    }
  }

  connectDeeplinkCallback() {
    App.addListener('appUrlOpen', (data: any) => {
      const url = new URL(data.url);
      const path = url.pathname;
      const result = url.searchParams.get(this.ocrByDeeplinkConfig.deeplinkParamToListen);

      if (path === this.ocrByDeeplinkConfig.deeplinkPathToListen && result) {
        this.ocrResultAsString = result;
        this.onChange();
      }
    });
  }

  render() {
    return (
      <div class={{"ocr-field-container": true, "readonly": this.readOnly, "filled": this.field?.value}} part="container">
        { this.getFieldLabel() }
        { this.getFieldContainer() }
        { this.showFieldMessages() }
      </div>
    );
  }

  private getFieldLabel(): any {
    return (
      <div class="label-container">
          <label part="label">
            {this.field.label}
            {this.required ? <span class="mandatory-symbol">*</span> : null}
          </label>
        </div>
    )
  }

  private getFieldContainer(): any {
    return (
      <div class={{"field-container": true, 'invalid-field': !isValid(this.field) && !this.readOnly}}>
        <textarea id={`ocr-result-${this.field.id}`}
          rows={4} cols={50} 
          value={this.field.value}
          onChange={(e) => this.onChangeOcrResult(e)}>
        </textarea>
        {}
        <div class={{"actions-container": true, 'disabled': !isMobileView()}}>
          <button onClick={() => this.takePictureAndPerformOcr()}><img src={getIconPNGPath('photo_camera')}></img></button>
          { this.ocrResultAsString ? <button onClick={() => this.deleteOcrResult()}><img src={getIconPNGPath('delete')}></img></button> : null }
        </div>
      </div>
    )
  }

  private showFieldMessages(): any {
    return (
      <div>
        { this.hasError ? <p class="error-message">{ this.ERROR_MESSAGE }</p> : null }
        { !this.textFound ? <p class="info-message">{ this.NO_TEXT_FOUND_MESSAGE }</p> : null }
      </div>
    )
  }

  private onChangeOcrResult(event: Event): void {
    const target: any = event.target;
    this.ocrResultAsString = (target.value !== '') ? target.value : null;
    this.onChange();
  }

  private async takePictureAndPerformOcr(): Promise<void> {
    if (this.ocrByDeeplinkConfig?.isEnabled) {
      AppLauncher.openUrl({
        url: this.ocrByDeeplinkConfig.deeplinkToOpen
      });
    } else {
      document.addEventListener("deviceready", () => {
        navigator.camera.getPicture(
          (imagePath) => {
            this.performOCR(imagePath);
          },
          (err) => {
            throw err;
          },
          {
            quality: 100,
            correctOrientation: true,
            destinationType: navigator.camera.DestinationType.FILE_URI 
          }
        )
      });
    }
  }

  private deleteOcrResult(): void {
    this.ocrResult = null;
    this.ocrResultAsString = null;
    this.onChange();
  }
  
  private performOCR(imageData: any): void {
    this.hasError = false;
    const ocrOptions = { imgType: 0, imgSrc: imageData };
    mltext.getText((result: any) => {
      this.textFound = result.foundText;
      if (result.foundText) {
        this.ocrResult = this.mapToOcrResult(result);
        this.setOcrResultAsString();
        this.onChange();
      }
    }, (err) => {
      this.hasError = true;
      throw err;
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
    this.textFound = true;
    this.fieldChange.emit({
      isValid: isValid(this.field),
      value: this.field.value
    })
  }

  private setInitialValues(): void {
    if (!this.readOnly) {
      this.readOnly = this.field.readOnly;
    }
    if (!this.required) {
      this.required = this.field.required;
    }
    this.ocrResultAsString = this.field?.value;
  }
}
