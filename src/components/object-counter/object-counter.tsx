import { Component, h, State, Prop, Event, EventEmitter } from "@stencil/core";
import { ControlState } from "../../models/controlState";
import { Field } from "../../models/field";
import { hasNetworkConnection } from "../../utils/check-network-connection-utils";
import { getIconPNGPath, getSymbol, isValid } from "../../utils/field-utils";
import { convertBase64ToBlob } from "../../utils/image-utils";

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

  @Event()
  public fieldChange: EventEmitter<ControlState>;

  private readonly IMAGE_TYPE: string = "image/jpg";
  private readonly IMAGE_PREFIX: string = "data:image/jpeg;base64";
  private readonly ERROR_MESSAGE: string = `Something went wrong. Please, try it later.`
  
  componentWillLoad() {
    this.createNetworkListeners();
    this.hasConnection = hasNetworkConnection();
  }

  render() {
    return(
    <div class="object-counter-container" part="container">
        <div class="label-container">
            <label part="label">
              {this.field.label}
              {getSymbol(this.field)}
            </label>
        </div>
        {
          this.isLoading
            ? ( <cotecna-loader color="#000087"></cotecna-loader> )
            : (
                <div class={{"field-container": true, 'invalid-field': !isValid(this.field)}}>
                    <div class="input-container">
                        { this.renderImage() }
                        { this.showCountedLabel ? <p>Counted:</p> : null }
                        <input id="countingResult" type="number" required={this.field.required} value={this.counted} onChange={e => this.onChangeCountedValue(e)}/>
                    </div>
                    <div class="camera-button-container">
                        <button class="camera-button" onClick={() => this.takePictureAndPerformCounting()} disabled={!this.hasConnection}><img src={getIconPNGPath('photo_camera')}></img></button>
                    </div>
                    { this.showDeleteButton() }
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

  private showDeleteButton() {
    return this.imageInBase64 ? 
      <div class="delete-button-container" onClick={() => this.deletePhoto()}>
        <button class="delete-button"><img src={getIconPNGPath('delete')}></img></button>
      </div> : null;
  }

  private async takePictureAndPerformCounting(): Promise<void> {
    document.addEventListener("deviceready", () => {
      navigator.camera.getPicture(
        async(imageData) => {
          await this.performCountItems(imageData);
          this.onChange();
        },
        (err) => {
          throw err;
        },
        { quality: 100, correctOrientation: true,
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
      const file = new File([blobImage], 'image', { type: this.IMAGE_TYPE});
      const formData = new FormData();
      formData.append('image', file);
      await this.sendCountRequest(formData);
    } catch(err) {
      this.hasError = true;
      throw err;
    } finally {
      this.isLoading = false;
    }
  }

  private sendCountRequest(formData: FormData) : Promise<any> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('POST', this.control.counterUrl);
      request.send(formData);
      request.onreadystatechange = () => {
        if (request.status === 200) {
          const response = JSON.parse(request.response);
          this.counted = response.totalDetected;
          this.showCountedLabel = true;
          resolve(this.counted);
        };
        reject('Error on the detection API');
      }
    });
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
}

