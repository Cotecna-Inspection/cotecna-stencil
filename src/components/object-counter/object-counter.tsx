import { Component, h, State, Prop } from "@stencil/core";
import { Field } from "../../models/field";
import { getIconPNGPath } from "../../utils/field-utils";
declare var navigator;

/** @internal **/
@Component({
  tag: 'cotecna-object-counter',
  styleUrl: 'object-counter.scss',
  shadow: true
})
export class ObjectCounter {

  @Prop()
  field!: Field;
  
  @Prop()
  hasConnection: boolean; 

  @Prop()
  control!: any;

  @State()
  imageSrc: string;

  @State() 
  showCountedLabel = false;

  @State() 
  counted: number;
  

  render() {
    return(
    <div class="object-counter-container">
        <div class="label-container">
            <label>{this.field.label}</label>
        </div>
        <div class="field-container">
            <div class="input-container">
                {
                    this.renderImage()
                }
                {this.showCountedLabel ? <p>Counted:</p> : null}
                <input id="countingResult" type="number" required={this.field.required} value={this.counted}/>
            </div>
            <div class="camera-button-container">
                <button class="camera-button" onClick={() => this.takePhoto()}><img src={getIconPNGPath('photo_camera')}></img></button>
            </div>
            {this.showDeleteButton()}
        </div>
        {
          this.hasConnection ? <p class="no-connection-message">No connection. Please fill manually.</p> : null
        }
    </div>);
  }

  private renderImage() {
    if (this.imageSrc) {
      let myPhoto: string = `data:image/jpeg;base64, ${this.imageSrc}`;
      return <div class="image-container"><img src={myPhoto}/></div>;
    }

    return null;
  }

  private showDeleteButton() {
    return this.imageSrc ? 
      <div class="delete-button-container" onClick={() => this.deletePhoto()}>
        <button class="delete-button"><img src={getIconPNGPath('delete')}></img></button>
      </div> : null;
  }

  private takePhoto() {
      document.addEventListener("deviceready", () => {
          navigator.camera.getPicture(
            (imageData) => {
              this.imageSrc = imageData;
              this.countItems();
            },
            (err) => {
              console.error('err', err);
            },
            { quality: 100, correctOrientation: true,
              destinationType: navigator.camera.DestinationType.DATA_URL });
        });
  }

  private deletePhoto() {
    this.imageSrc = "";
    this.counted = null;
    this.showCountedLabel = false;
  }

  private async countItems(): Promise<void> {
    const blobImage = this.convertBase64ToBlob(this.imageSrc, "image/jpg");
    const file = new File([blobImage], 'image', { type: 'image/jpg'});
    let formData = new FormData();
    formData.append('image', file);
    await this.sendCountRequest(formData);
  }

  private sendCountRequest(formData: FormData) : Promise<any> {
    return new Promise(() => {
      let request = new XMLHttpRequest();
      request.open('POST', this.control.counterUrl);
      request.send(formData);
      request.onreadystatechange = () => {
        
        if (request.response) {
          const response = JSON.parse(request.response);
          this.counted = response.totalDetected;
          this.showCountedLabel = true;
        };
      }
    });
  }

  private convertBase64ToBlob(data, type): Blob {
    let byteString = atob(data);
    const ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type });
  }
}

