import { Component, h, State, Prop, Event, EventEmitter, Watch, Listen } from "@stencil/core";
import { ControlState } from "../../models/control-state";
import { Field } from "../../models/field";
import { hasNetworkConnection } from "../../utils/check-network-connection-utils";
import { getIconPNGPath, getSymbol, isValid } from "../../utils/field-utils";
import { convertBase64ToBlob } from "../../utils/image-utils";
import { isMobileView } from "../../utils/check-is-mobile-utils";
import { postMultipartFormData } from "../../utils/http-utils";

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

/** TODO: WORAROUND - The DOM can't detect changes in a property of a complex object that is passed as Prop()
 * For this reason, the variables we want to render the UI have been separated into new Props:
 * - readOnly
 * - required
 */
  @Prop()
  public readOnly: boolean;
  
  @Prop()
  public required: boolean;

  @State()
  private imageInBase64: string = null;

  @State()
  private counted: number = null;

  @State() 
  private showCountedLabel: boolean = false;

  @State()
  private isLoading: boolean = false;

  @State()
  private hasConnection: boolean = false;

  @State()
  private hasError: boolean = false;

  @State()
  private showImageDialog: boolean = false;

  @State()
  private showMarks: boolean = false;

  @State()
  private predictions: any = null;

  
  @Event()
  public fieldChange: EventEmitter<ControlState>;

  @Event()
  public isEnlarged: EventEmitter<boolean>;
  
  
  @Watch('control')
  public onControlChanged() {}
  
  @Listen('deleteImage')
  public onDeleteImageFromViewer() {
    this.showImageDialog = false;
    this.deletePhoto();
  }

  @Listen('closeImageViewer')
  public onCloseImageViewer() {
    this.showImageDialog = false;
  }

  @Listen('confirmCount')
  public onConfirmCount() {
    this.showImageDialog = false;
  }

  @Listen('retakePhoto')
  public onRetakePhoto() {
    this.showImageDialog = false;
    this.takePictureAndPerformCounting();
  }
  
  private myPhoto: string = null;
  private readonly IMAGE_TYPE: string = "image/jpg";
  private readonly IMAGE_PREFIX: string = "data:image/jpeg;base64";
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
                        { this.showCountedLabel ? <p>Counted:</p> : null }
                        <input id="countingResult" type="number" required={this.required} value={this.counted} onChange={e => this.onChangeCountedValue(e)}/>
                    </div>
                    <div class={{"actions-container": true, 'disabled': !isMobileView()}}>
                        <button onClick={() => this.takePictureAndPerformCounting()} disabled={!this.hasConnection}><img src={getIconPNGPath('photo_camera')}></img></button>
                        { this.imageInBase64 || this.counted ? <button onClick={() => this.deletePhoto()}><img src={getIconPNGPath('delete')}></img></button> : null }
                    </div>  
                </div>
            )
        }
        { this.hasError ? <p class="error-message">{this.ERROR_MESSAGE}</p> : null }
        { !this.hasConnection ? <p class="no-connection-message">No connection. Please fill manually.</p> : null }
        { this.showImageDialog ? <cotecna-image-viewer image={this.myPhoto} predictions={this.predictions} counted={this.counted} showItemMarks={this.showMarks}></cotecna-image-viewer> : null}
    </div>
   );
  }

  private showThumbnail() {
    if (this.field?.value?.image) {
      return <div class="image-container">
        <img onClick={() => this.enlargeImage()} src={this.myPhoto}/>
        </div>;
    }
    return null;
  }

  private enlargeImage() {
    this.showImageDialog = true;
    this.showMarks = false;
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
          this.myPhoto = `${this.IMAGE_PREFIX}, ${this.imageInBase64}`;
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
    this.counted = null;
    this.myPhoto = null;
    this.showCountedLabel = false;
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
      this.onChange();
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
        const result = JSON.parse(response);
        this.predictions = result.predictions;
        this.showCountedLabel = true;
        this.counted = result.totalDetected;
        this.showImageDialog = true;
        this.showMarks = true;
      }
    }
    catch(err) {
      throw `Error on the detection API: status ${err}`;
    }
  }

  private onChangeCountedValue(event: Event) {
    const target: any = event.target;
    this.counted = (target.value != '') ? +target.value : null;
    this.onChange();
  }

  private onChange() {
    this.updateFieldValue();
    this.fieldChange.emit({
      isValid: isValid(this.field),
      value: this.field.value
    });
  }

  private updateFieldValue(): void {
    this.field.value = { counted: this.counted, image: this.imageInBase64 };
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
  }

  private isFilled(): boolean {
    return (this.field.value) 
      ? this.field.value?.counted !== null || this.field.value?.image
      : false;
  }
}

