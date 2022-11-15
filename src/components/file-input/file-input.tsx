import { Component, h, Prop, State, Watch, Event, EventEmitter } from "@stencil/core";
import { getIconSVGPath } from "../../utils/field-utils";

@Component({
    tag: 'cotecna-file-input',
    styleUrl: 'file-input.scss',
    shadow: true,
})
export class FileInput {

// ========== Public properties ==========

    @Prop({mutable: true})
    public templateName: string = null;

    @Prop()
    public dragAndDropContainerText = "DRAG FILES OR CLICK TO UPLOAD";

    @Prop()
    public wrongFormatErrorText = "FORMAT NOT ALLOWED";

    @Prop()
    public checkboxText = "Set export as PDF as default";

    @Prop()
    public fileViewText = "Template File"

    @Prop()
    public dragAndDropText = "Upload File"

    @Prop()
    public fileExtensionAccept: String[] = [".pdf"]

// ========== Public Events ==========

    @Event()
    downloadFile: EventEmitter<boolean>

    @Event()
    deleteFile: EventEmitter<void>

    @Event()
    selectedFile: EventEmitter<File>

// ========== App State ==========

    @State()
    private showFileInfo: boolean;

    @State()
    private onDragEnter = false;

    @State()
    private showExtensionError = false;

    @Watch('templateName')
    private onTemplateChanged() {
        console.log(this.templateName);
        if (this.templateName) {
            this.showFileInfo = true;
        } else {
            this.showFileInfo = false;
        }
    }

    @Watch('onDragEnter')
    private hideErrors() {
        this.showExtensionError = false;
    }

    private exportAsPdf: boolean = false;

    componentWillLoad() {
        this.onTemplateChanged();
    }

// ========== UI ==========

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
                <div 
                id= "asd"
                class={ this.onDragEnter ? 
                    "drag-and-drop-box-container draggable" : 
                    this.showExtensionError ? 
                        "drag-and-drop-box-container error" : 
                        "drag-and-drop-box-container" }
                    onDragOver = {(evt) => {
                            this.onDragEnter = true;
                            evt.preventDefault();
                        }
                    }
                    onDragLeave = {(evt) => {
                            this.onDragEnter = false;
                            evt.preventDefault();
                        }
                    }
                    onDrop = {(evt) => {
                        this.onDragEnter = false;
                        const file = evt.dataTransfer.files[0]
                        if (this.fileExtensionAccept.includes('.' + file.name.split('.').pop())) {
                            this.onFileSelected(file)
                        } else {
                            this.showExtensionError = true;
                        }
                        evt.preventDefault();
                    }}>
                    <input
                    type = "file"
                    accept = {this.fileExtensionAccept.join()}
                    onChange = {(evt) => {
                        this.onFileSelected((evt.currentTarget as HTMLInputElement).files[0]);
                        evt.preventDefault();
                        }
                    }/>               
                    <h1>
                        { 
                            this.showExtensionError ? 
                                this.wrongFormatErrorText :
                                this.dragAndDropContainerText
                        }
                    </h1>
                </div>
            </div>
        );
    }

    private buildCheckBoxContainer() {
        return (
            <div class="checkbox-container">
                <input type="checkbox"
                checked = { this.exportAsPdf }
                onChange={ () => this.exportAsPdf = !this.exportAsPdf }/>
                <label>{ this.checkboxText }</label>
            </div>
        );
    }

    private onFileSelected(file) {
        this.selectedFile.emit(file);
        this.templateName = file.name;
    }

    private onDownloadFile() {
        this.downloadFile.emit(this.exportAsPdf);
    }

    private onDeleteFile() {
        this.deleteFile.emit();
        this.templateName = null;
    }
}