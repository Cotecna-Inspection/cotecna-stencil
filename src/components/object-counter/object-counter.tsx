import { Component, h, State, Prop, Event, EventEmitter, Watch } from "@stencil/core";
import { ControlState } from "../../models/control-state";
import { Field } from "../../models/field";
import { hasNetworkConnection } from "../../utils/check-network-connection-utils";
import { getIconPNGPath, getSymbol, isValid } from "../../utils/field-utils";
import { convertBase64ToBlob } from "../../utils/image-utils";
import { isMobileView } from "../../utils/check-is-mobile-utils";
import { postMultipartFormData } from '../../utils/http-utils';

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
  private readonly: boolean = false;

  @Event()
  public fieldChange: EventEmitter<ControlState>;

  @Watch('control')
  public onControlChanged() {}
  
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
    <div class={{"object-counter-container": true, "readonly": this.readonly, "filled": this.isFilled()}} part="container">
        <div class="label-container">
            <label part="label">
              {this.field.label}
              {getSymbol(this.field)}
            </label>
        </div>
        {
          this.isLoading
            ? ( <cotecna-spinner-loader color="#000087"></cotecna-spinner-loader> )
            : (
                <div class={{"field-container": true, 'invalid-field': !isValid(this.field) && !this.readonly}}>
                    <div class="input-container">
                        { this.renderImage() }
                        { this.showCountedLabel ? <p>Counted:</p> : null }
                        <input id="countingResult" type="number" required={this.field.required} value={this.counted} onChange={e => this.onChangeCountedValue(e)}/>
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
    </div>);
  }

  private createNetworkListeners() {
    document.addEventListener('online', _ => {
      this.hasConnection = true;
    }, false);
    document.addEventListener('offline', _ => {
      this.hasConnection = false;
    }, false);
  }

  private renderImage() {
    if (this.field?.value?.image) {
      const myPhoto: string = `${this.IMAGE_PREFIX}, ${this.field.value.image}`;
      return <div class="image-container"><img src={myPhoto}/></div>;
    }
    return null;
  }

  private takePictureAndPerformCounting(): void {
    document.addEventListener("deviceready", () => {
      navigator.camera.getPicture(
        (imageData) => {
          this.imageInBase64 = imageData;
          this.performCountItems(imageData);
        },
        (err) => {
          throw err;
        },
        { 
          quality: 80, 
          correctOrientation: true,
          destinationType: navigator.camera.DestinationType.DATA_URL 
        }
      );
    });
  }

  private deletePhoto() : void {
    this.imageInBase64 = null;
    this.counted = null;
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
      formData.append('image', blobFile);
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
        this.showCountedLabel = true;
        this.counted = result.totalDetected;
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
    this.readonly = this.field?.readOnly;
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

