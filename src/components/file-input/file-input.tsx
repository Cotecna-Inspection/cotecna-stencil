import { Component, h, Prop, State, Watch, Event, EventEmitter } from "@stencil/core";
import { getIconSVGPath } from "../../utils/field-utils";

@Component({
    tag: 'cotecna-file-input',
    styleUrl: 'file-input.scss',
    shadow: true,
})
export class FileInput {
    @Prop({mutable: true})
    templateName: string = null;

    @Prop()
    dragAndDropContainerText = "DRAG FILES OR CLICK TO UPLOAD";

    @Prop()
    checkboxText = "Set export as PDF as default";

    @Prop()
    fileViewText = "Template File"

    @Prop()
    dragAndDropText = "Upload File"

    @State()
    showFileInfo: boolean;

    @Event()
    downloadFile: EventEmitter<boolean>

    @Event()
    deleteFile: EventEmitter<void>

    @Event()
    dropFile: EventEmitter<File>

    @Watch('templateName')
    onTemplateChanged() {
        console.log(this.templateName);
        if (this.templateName) {
            this.showFileInfo = true;
        } else {
            this.showFileInfo = false;
        }
    }

    private exportAsPdf: boolean = false;

    componentWillLoad() {
        this.onTemplateChanged();
    }

    render() {
        return(
            <div class = "container">
                {
                    this.showFileInfo ? 
                        this.buildFileView()
                        : 
                        this.buildDragAndDrop()
                }
                {
                    this.buildCheckBoxContainer()
                }
            </div>
        );
    }

    private buildFileView() {
        return (
            <div>
            <p class="title">{ this.fileViewText }</p>
            <div class="file-box-container">
                <p>{ this.templateName }</p>
                <img src={ getIconSVGPath('download_file') }
                onClick={ () => this.onDownloadFile() }></img>
                <img src={ getIconSVGPath('delete_file') }
                onClick={ () => this.onDeleteFile() }></img>
            </div>
        </div> 
        );
    }

    private buildDragAndDrop() {
        return(
            <div>
            <p class="title">{ this.dragAndDropText }</p>
            {/* <div
            class="drag-and-drop-box-container"
            onDragOver = {(evt) => evt.preventDefault()}
            onDragEnter = {(evt) => evt.preventDefault()}
            onDrop = {(evt) => {
                console.log(evt)
                this.dropFile.emit(evt.dataTransfer.files[0]);
                this.templateName = evt.dataTransfer.files[0].name;
                evt.preventDefault();
            }}>               
             <input type="file" style={{opacity: "0.0", position: "absolute", top: "0", left: "0", bottom: "0", right: "0", width: "100%", height:"100%"}}></input>
                <h1>{ this.dragAndDropContainerText }</h1>
            </div> */}
            <input
            type="file"
            class="drag-and-drop-box-container"
            onDragOver = {(evt) => evt.preventDefault()}
            onDragEnter = {(evt) => evt.preventDefault()}
            onDrop = {(evt) => {
                console.log(evt)
                this.dropFile.emit(evt.dataTransfer.files[0]);
                this.templateName = evt.dataTransfer.files[0].name;
                evt.preventDefault();
            }}>               
                <h1>{ this.dragAndDropContainerText }</h1>
            </input>
        </div>
        );
    }

    private buildCheckBoxContainer() {
        return (
            <div class="checkbox-container">
                <input type="checkbox"
                checked = {this.exportAsPdf}
                onChange={ () => this.exportAsPdf = !this.exportAsPdf }/>
                <label>{ this.checkboxText }</label>
            </div>
        );
    }

    private onDownloadFile() {
        this.downloadFile.emit(this.exportAsPdf);
    }

    private onDeleteFile() {
        this.deleteFile.emit();
        this.templateName = null;
    }
}