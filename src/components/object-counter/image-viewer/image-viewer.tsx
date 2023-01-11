import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";
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
    public predictions: any;

    @Prop()
    public counted: any;

    @Prop()
    public showItemMarks: boolean;

    @Event()
    deleteImage: EventEmitter<boolean>;

    @Event()
    closeImageViewer: EventEmitter<boolean>;

    @Event()
    confirmCount: EventEmitter<boolean>;

    @Event()
    retakePhoto: EventEmitter<boolean>;

    render() {
        return (
            <div id="image-viewer-container" class="image-viewer-container">
                <div class="header-container">
                    <button class="close-button" onClick={() => this.closeViewer()}><img src={getIconPNGPath('close')}></img></button>
                    <div class="count-result">Count Result: {this.counted}</div>
                    { this.showItemMarks ? <button class="delete-button" onClick={() => this.retakePicture()}><img src={getIconPNGPath('photo_camera')}></img></button> : 
                        <button class="delete-button" onClick={() => this.delete()}><img src={getIconPNGPath('delete')}></img></button>}
                    
                </div>
                <div id="image-container">
                    <img id="image" src={this.image}></img>
                    { this.showItemMarks ? this.predictions.map((item:any={})=>
                            <div class="zone-dot" style={{["left"]:(item.coordX*1000).toString()+'px',["top"]:(item.coordY*1000).toString()+'px'}}></div>) : null }
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
        this.confirmCount.emit(true);
        this.showItemMarks = false;
    }

    private retakePicture() {
        this.retakePhoto.emit(true);
    }
} 