import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";
import { ObjectCounterResponse, Prediction } from "../../../models/object-counter-response";
import { getIconPNGPath } from "../../../utils/field-utils";

/** @internal **/
@Component({
    tag: 'cotecna-image-viewer',
    styleUrl: 'image-viewer.scss',
    shadow: true
  })

export class ImageViewer {
    
    @Prop()
    public image!: string;

    @Prop()
    public countResult: ObjectCounterResponse;

    @Prop()
    public showItemMarks: boolean = true;

    @Event()
    deleteImage: EventEmitter<boolean>;

    @Event()
    closeImageViewer: EventEmitter<boolean>;

    @Event()
    confirmCount: EventEmitter<number>;

    @Event()
    retakePhoto: EventEmitter<boolean>;

    render() {
        return (
            <div id="image-viewer-container" class="image-viewer-container">
                <div class="header-container">
                    <button class="close-button" onClick={() => this.closeViewer()}><img src={getIconPNGPath('close')}></img></button>
                    <div class="count-result">Count Result: {this.countResult.totalDetected}</div>
                    { this.showItemMarks ? <button class="delete-button" onClick={() => this.retakePicture()}><img src={getIconPNGPath('photo_camera')}></img></button> : 
                        <button class="delete-button" onClick={() => this.delete()}><img src={getIconPNGPath('delete')}></img></button>}
                    
                </div>
                <div id="image-container">
                    <img id="image" src={this.image}></img>
                    { this.showItemMarks ? this.countResult.predictions.map((item:Prediction)=>
                            <div class="zone-dot" style={{["left"]:(item.coordX).toString()+'px',["top"]:(item.coordY).toString()+'px'}}></div>) : null }
                </div>
                {
                    this.showItemMarks ? <div class="footer-container">
                            <button class="confirm-button" onClick={() => this.confirm()}><img src={getIconPNGPath('done')}></img><div class="confirm-text">CONFIRM</div></button></div> : null }
            </div>);
    }

    private delete() : void {
        this.deleteImage.emit(true);
        this.showItemMarks = false;
    }

    private closeViewer() : void {
        this.closeImageViewer.emit(true);
        this.showItemMarks = false;
    }

    private confirm(): void {
        this.confirmCount.emit(this.countResult.totalDetected);
        this.showItemMarks = false;
    }

    private retakePicture() {
        this.retakePhoto.emit(true);
    }
} 