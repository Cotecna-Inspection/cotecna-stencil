import { Component, h, Prop, State, Event, EventEmitter, Watch } from "@stencil/core";
import { Field } from "../../models/field";
import { getIconSVGPath, getSymbol, isValid } from "../../utils/field-utils";
import { UploadedFile } from '../../models/uploaded-file';
import { ControlState } from "../../models/control-state";
import { newGuid } from '../../utils/guid.utils';

const enum DragType { LEAVE, OVER }

/** @internal **/
@Component({
    tag: 'cotecna-file-uploader',
    styleUrl: 'file-uploader.scss',
    shadow: true,
})
export class FileUploader {

    @Prop()
    public field!: Field;

    @Prop()
    public control: any = [];

    @Event()
    public downloadedFile: EventEmitter<UploadedFile>;

    @Event()
    public deletedFile: EventEmitter<UploadedFile>;

    @Event()
    public addedFile: EventEmitter<File>;

    @Event()
    fieldChange: EventEmitter<ControlState>;

    @State()
    private isMultiple: boolean = false;

    @State()
    private placeholder: string = null;

    @State()
    private uploadedFiles: UploadedFile[] = [];

    @State()
    private acceptedFileExtensions: string[] = [];

    @State()
    private onDragEnter: boolean = false;

    @State()
    private showExtensionError: boolean = false;

    @Watch('field')
    public onFieldChanged(): void {
        this.initValues();
    }

    @Watch('control')
    public onControlChanged(): void {
        this.initValues();
    }

    private readonly FORMAT_ERROR: string = 'Format not allowed';
    private readonly DEFAULT_PLACEHOLDER: string = 'Drag files or click to upload';
    

    componentWillLoad() {
        this.initValues();
    }

    render() {
        return (
            <div class="file-uploader-container" part="container">
                <label part="label">
                    { this.field.label }
                    { getSymbol(this.field) }
                </label>
                { this.renderDragAndDrop() }
                { this.uploadedFiles?.length ? this.renderFilesInfo() : null }
            </div>
        );
    }

    private renderDragAndDrop(): any {
        return (
            <div class={this.getDragAndDropContainerClass()}
                onDragOver={ e => this.handleDragEvent(e, DragType.OVER) }
                onDragLeave={ e => this.handleDragEvent(e, DragType.LEAVE) }
                onDrop={(e) => this.handleDropEvent(e) }>
                <input type="file"
                    accept={this.acceptedFileExtensions.join(',')}
                    onChange={ e => this.handleFileInputChangeEvent(e) } 
                    multiple={this.isMultiple}/>
                <div class="placeholder">
                    <img src={getIconSVGPath("add_document")}></img>
                    <h1> { this.showExtensionError ? this.FORMAT_ERROR : this.placeholder }</h1>
                </div>
            </div>
        );
    }

    private renderFilesInfo(): any {
        return (
            <div class="files-container">
                {
                    this.uploadedFiles?.map((file: UploadedFile) => {
                        return (
                            <div id={file.id} class="file-item">
                                <p>{file.name}</p>
                                <div class="file-item-actions">
                                    <img src={getIconSVGPath('download_file')} onClick={() => this.fileToDownload(file)}></img>
                                    <img src={getIconSVGPath('delete_file')} onClick={() => this.fileToDelete(file)}></img>
                                </div>   
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    private getDragAndDropContainerClass(): string {
        const defaultClass: string = 'drag-and-drop-box-container';
        if (this.onDragEnter) return `${defaultClass} draggable`;
        else if (this.showExtensionError) return `${defaultClass} error`;
        return defaultClass;
    }

    private handleDragEvent(event: DragEvent, type: DragType): void {
        this.onDragEnter = type === DragType.OVER;
        event.preventDefault();
    }

    private handleDropEvent(event: DragEvent): void {
        const files = Array.from(event.dataTransfer.files);
        this.onDragEnter = false;
        for (let file of files) {
            const fileExtension = this.getFileExtension(file);
            if (this.acceptedFileExtensions.length == 0 || 
                this.acceptedFileExtensions.includes(`.${fileExtension}`)) {
                this.showExtensionError = false;
                this.fileToAdd(file);
            } 
            else {
                this.showExtensionError = true;
                break;
            }
        }
        event.preventDefault();
    }

    private handleFileInputChangeEvent(event: Event): void {
        const target: any = event.target;
        const files: File[] = Array.from(target.files);
        for (let file of files) {
            this.fileToAdd(file);
        }
        event.preventDefault();
    }

    private getFileExtension(file: File): string {    
        return file?.name?.split('.')?.pop();
    }

    private fileToAdd(file: File): void {
        const fileToAdd = { id: newGuid(), name: file.name };
        this.uploadedFiles = this.isMultiple
            ? [...this.uploadedFiles, fileToAdd]
            : [ fileToAdd ];
        this.addedFile.emit(file);
        this.updateAndTriggerOnChange();
    }

    private fileToDownload(file: UploadedFile): void {
        this.downloadedFile.emit(file);
    }

    private fileToDelete(fileToDelete: UploadedFile): void {
        this.uploadedFiles = this.uploadedFiles.filter(file => file.id != fileToDelete.id);
        this.deletedFile.emit(fileToDelete);
        this.updateAndTriggerOnChange();
    }

    private initValues(): void {
        this.isMultiple = this.control['isMultiple'] ?? false;
        this.placeholder = this.control['placeholder'] ?? this.DEFAULT_PLACEHOLDER;
        this.acceptedFileExtensions = this.control['acceptedFileExtensions'] ?? [];
        this.uploadedFiles = [...this.field.value] ?? [];
    }

    private updateAndTriggerOnChange(): void {
        this.field.value = [...this.uploadedFiles];
        this.onChange();
    }

    private onChange(): void {
        this.fieldChange.emit({
            isValid: isValid(this.field),
            value: this.field.value
        })
    }
}