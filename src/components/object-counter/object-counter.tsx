import { Component, h, State, Prop, Event, EventEmitter, Watch, Listen, Element } from "@stencil/core";
import { ControlState } from "../../models/control-state";
import { Field } from "../../models/field";
import { hasNetworkConnection } from "../../utils/check-network-connection-utils";
import { getIconPNGPath, getSymbol, isValid } from "../../utils/field-utils";
import { convertBase64ToBlob } from "../../utils/image-utils";
import { isMobileView } from "../../utils/check-is-mobile-utils";
import { postMultipartFormData } from "../../utils/http-utils";
import { ObjectCounterResponse } from "../../models/object-counter-response";

declare var navigator;

/** @internal **/
@Component({
  tag: 'cotecna-object-counter',
  styleUrl: 'object-counter.scss',
  shadow: true
})
export class ObjectCounter {

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

  @State()
  private previousImageInBase64: string = null;

  @State()
  private imageInBase64: string = null;

  @State()
  private counted: number = null;

  @State()
  private countResult: ObjectCounterResponse;

  @State() 
  private showCountedLabel: boolean = false;

  @State()
  private isLoading: boolean = false;

  @State()
  private hasConnection: boolean = false;

  @State()
  private hasError: boolean = false;

  @State()
  private thumbnailVisible: boolean = false;

  @State()
  private showImageDialog: boolean = false;

  @State()
  private showMarks: boolean = false;

  @State()
  private isDeleting: boolean = false;
  
  @Event()
  public fieldChange: EventEmitter<ControlState>;

  @Event()
  public isEnlarged: EventEmitter<boolean>;
  
  
  @Watch('control')
  public onControlChanged() {}
  
  @Listen('deleteImage')
  public onDeleteImageFromViewer() {
    this.showImageDialog = false;
    this.isDeleting = true;
    this.deletePhoto();
  }

  @Listen('closeImageViewer')
  public onCloseImageViewer() {
    this.showImageDialog = false;
    // this.onChangeCountedValue();
  }

  @Listen('confirmCount')
  public onConfirmCount(event: any) {
    this.previousImageInBase64 = this.imageInBase64;
    this.counted = event.detail;
    this.showImageDialog = false;
    this.thumbnailVisible = true;
    this.countedPhoto = this.currentPhoto;
    this.onChangeCountedValue();
  }

  @Listen('retakePhoto')
  public onRetakePhoto() {
    this.showImageDialog = false;
    this.takePictureAndPerformCounting();
  }

  @Element()
  private element: HTMLElement;
  
  private countedPhoto: string = null;
  private currentPhoto: string = null;

  private readonly IMAGE_TYPE: string = "image/jpg";
  private readonly DATA_IMAGE_PREFIX: string = 'data:image/';
  private readonly IMAGE_PREFIX: string = "data:image/jpeg;base64";
  private readonly DATA_IMAGE_PNG_BASE64_PREFIX: string = 'data:image/png;base64,';
  private readonly DATA_IMAGE_JPEG_BASE64_PREFIX: string = 'data:image/jpeg;base64,';


  private readonly ERROR_MESSAGE: string = `Something went wrong. Please, try it later.`
  
  componentWillLoad() {
    this.createNetworkListeners();
    this.hasConnection = hasNetworkConnection();
    this.setInitialValues();
  }

  render() {
    return(
    <div class={{"object-counter-container": true, "readonly": this.readOnly, "filled": this.isFilled()}} part="container">
        <div class="label-container">
            <label part="label">
              {this.field.label}
              {getSymbol(this.field)}
            </label>
        </div>
        {
          this.isLoading
            ? (<cotecna-spinner-loader color="#000087"></cotecna-spinner-loader>): (
                <div class={{"field-container": true, 'invalid-field': !isValid(this.field) && !this.readOnly}}>
                    <div class="input-container">
                        { this.showThumbnail() }
                        { this.counted != null && this.showCountedLabel ? <p>Counted:</p> : null }
                        <input id="countingResult" type="number" required={this.required}/>

                    </div>
                    <div class={{"actions-container": true, 'disabled': !isMobileView()}}>
                        <button onClick={() => this.takePictureAndPerformCounting()} disabled={!this.hasConnection}><img src={getIconPNGPath('photo_camera')}></img></button>
                        { this.imageInBase64 && this.counted != null ? <button onClick={() => this.deletePhoto()}><img src={getIconPNGPath('delete')}></img></button> : null }
                    </div>  
                </div>
            )
        }
        { this.hasError ? <p class="error-message">{this.ERROR_MESSAGE}</p> : null }
        { !this.hasConnection ? <p class="no-connection-message">No connection. Please fill manually.</p> : null }
        { this.showImageDialog ? <cotecna-image-viewer image={this.currentPhoto} countResult={this.countResult} showItemMarks={this.showMarks}></cotecna-image-viewer> : null}
    </div>
   );
  }

  private showThumbnail() {
    if (this.thumbnailVisible && this.counted >= 0 && this.showCountedLabel) {
      return <div class="image-container">
        <img onClick={() => this.enlargeImage()} src={this.countedPhoto}/>
        </div>;
    }
    return null;
  }

  private enlargeImage() {
    this.showImageDialog = true;
    this.showMarks = false;
    this.currentPhoto = this.countedPhoto;
    this.isEnlarged.emit(true);
  }

  private createNetworkListeners() {
    document.addEventListener('online', _ => {
      this.hasConnection = true;
    }, false);
    document.addEventListener('offline', _ => {
      this.hasConnection = false;
    }, false);
  }

  private takePictureAndPerformCounting(): void {
    document.addEventListener("deviceready", () => {
      navigator.camera.getPicture(
        (imageData) => {
          this.imageInBase64 = imageData; 
          this.currentPhoto = `${this.IMAGE_PREFIX}, ${this.imageInBase64}`;
          this.performCountItems(imageData);
        },
        (err) => {
          throw err; 
        },
        { 
          quality: 80, 
          correctOrientation: false,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          targetWidth: window.innerWidth,
          targetHeight: window.innerHeight
        }
      );
    });
  }

  private deletePhoto() : void {
    this.imageInBase64 = null;
    this.previousImageInBase64 = null;
    this.counted = null;
    this.countedPhoto = null;
    this.currentPhoto = null;
    this.showCountedLabel = false;
    var inputElement = this.element.shadowRoot.querySelector('#countingResult') as HTMLInputElement;
    inputElement.value = null;
    this.isDeleting = true;
    this.onChange();
  }

  private async performCountItems(image: string): Promise<void> {
    try {
      this.isLoading = true;
      this.hasError = false;
      const blobImage = convertBase64ToBlob(image, this.IMAGE_TYPE);
      const blobFile = new Blob([blobImage], { type: this.IMAGE_TYPE });
      const formData = new FormData();
      formData.append('image', blobFile, "objectCount.jpg");
      await this.sendCountRequest(formData);
    } catch(err) {
      this.hasError = true;
      this.deletePhoto();
      throw err;
    } finally {
      this.isLoading = false;
    }
  }

  private async sendCountRequest(formData: FormData) {
    try {
      const response = await postMultipartFormData(this.control.counterUrl, formData);
      if (response) {
        const result: ObjectCounterResponse = JSON.parse(response);
        this.showCountedLabel = true;
        this.countResult = result;
        this.showImageDialog = true;
        this.showMarks = true;
      }
    }
    catch(err) {
      throw `Error on the detection API: status ${err}`;
    }
  }

  private onChangeCountedValue() {
    var inputElement = this.element.shadowRoot.querySelector('#countingResult') as HTMLInputElement;
    inputElement.valueAsNumber = this.counted;
    this.onChange();
  }

  private async onChange() {
    await this.updateFieldValue();
    this.fieldChange.emit({
      isValid: isValid(this.field),
      value: this.field.value
    });
  }

  private async updateFieldValue(): Promise<void> {
    if (!this.isDeleting) {
      const thumbnailPhoto = await this.thumbnailFromBase64(this.previousImageInBase64);
      this.field.value = { counted: this.counted, image: this.previousImageInBase64, thumbnail: this.removeDataPrefixFromBase64(thumbnailPhoto)};
    }
    else {
      this.field.value = { counted: null, image: null, thumbnail: null};
      this.isDeleting = false;
    }
  }

  private setInitialValues(): void {
    if (!this.readOnly) {
      this.readOnly = this.field.readOnly;
    }
    if (!this.required) {
      this.required = this.field.required;
    }
    this.imageInBase64 = this.field?.value?.image;
    this.counted = this.field?.value?.counted;
    this.showCountedLabel = this.counted != null;
    this.countedPhoto = `${this.IMAGE_PREFIX}, ${this.imageInBase64}`;
  }

  private isFilled(): boolean {
    return (this.field.value) 
      ? this.field.value?.counted !== null || this.field.value?.image
      : false;
  }

  private async thumbnailFromBase64(base64Image: string): Promise<string> {
    const staticSize = 250;
    const fullImage = await this.getImageFromBase64(base64Image);        

    let canvas = document.createElement('canvas');
    let aspectRatio = fullImage.width/fullImage.height;
    canvas.width = staticSize;
    canvas.height = staticSize/aspectRatio;
    canvas?.getContext("2d")?.drawImage(fullImage, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.5);
  }

  private getImageFromBase64(base64: string):Promise<any> {
    return new Promise<any>(resolve => {
      var imgData;
      if (base64.includes(this.DATA_IMAGE_PREFIX)) {
        imgData = base64;
      }
      else {
        imgData = this.DATA_IMAGE_PNG_BASE64_PREFIX + base64;
      }
      var img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.src = imgData;
    })
  }

  private removeDataPrefixFromBase64(base64image: string): string {
    base64image = base64image.replace(this.DATA_IMAGE_PNG_BASE64_PREFIX, '');
    base64image = base64image.replace(this.DATA_IMAGE_JPEG_BASE64_PREFIX, '');
    return base64image;
  }
}

