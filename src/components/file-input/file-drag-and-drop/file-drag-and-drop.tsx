import { Component, EventEmitter, h, Prop, Event } from "@stencil/core";

/** @internal **/
@Component({
    tag: 'cotecna-file-drag-and-drop',
    styleUrl: 'file-drag-and-drop.scss',
    shadow: true,
})
export class FileDragAndDrop {
    @Event()
    dropFile: EventEmitter<File>

    @Prop()
    dragAndDropContainerText = "DRAG FILES OR CLICK TO UPLOAD";
    
    render() {
        return(
            <div>
            <p class="title">Update File</p>
            <div
            class="drag-and-drop-box-container"
            onDragOver = {(evt) => evt.preventDefault()}
            onDragEnter = {(evt) => evt.preventDefault()}
            onDrop = {(evt) => {
                this.dropFile.emit(evt.dataTransfer.files[0]);
                evt.preventDefault();
            }}>
                <input type="file" style={{opacity: "0.0", position: "absolute", top: "0", left: "0", bottom: "0", right: "0", width: "100%", height:"100%"}}></input>
                <p>{ this.dragAndDropContainerText }</p>
            </div>
        </div>
        );
    }
}