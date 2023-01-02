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

    @Event()
    closeImage: EventEmitter<boolean>;


    render() {
        return (
            <div id="image-viewer-container" class="image-viewer-container">
                <div class="header-container">
                    <button class="close-button" onClick={() => this.closeImageViewer()}><img src={getIconPNGPath('delete')}></img></button>
                </div>
                <div id="image-container">
                    <img id="image" src={this.image}></img>
                    {this.predictions.map((item:any={})=>
                            // {this.drawObjectMarks(item.coordX, item.coordY)}
                            <div class="zone-dot" style={{["left"]:item.coordX.toString()+'px',["top"]:item.coordY.toString()+'px'}}></div>
                        )}
                </div>
            </div>);
    }

    private closeImageViewer() : void {
        this.closeImage.emit(true);
    }

    // private drawObjectMarks(coordX: number, coordY: number) {  
    //     debugger
    //         return 
    // }
} 