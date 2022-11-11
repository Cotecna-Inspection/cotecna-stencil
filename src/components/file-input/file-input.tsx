import { Component, h, Prop, State, Watch } from "@stencil/core";

@Component({
    tag: 'cotecna-file-input',
    styleUrl: 'file-input.scss',
    shadow: true,
})
export class FileInput {
    @Prop({mutable: true})
    template: string = null;

    @Prop()
    dragAndDropContainerText = "DRAG FILES OR CLICK TO UPLOAD";

    @State()
    showFileInfo: boolean;

    @Watch('template')
    onTemplateChanged() {
        if (this.template) {
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
                        this.buildFileDragAndDrop()
                }
                {
                    this.buildCheckBoxContainer()
                }
            </div>
        );
    }

    private buildFileView() {
        return(
            <cotecna-file-view
                template = { this.template }
                onDownloadFile = { () => this.downloadFile() }
                onDeleteFile = { () => this.deleteFile() }
            ></cotecna-file-view>
        );
    }

    private buildFileDragAndDrop() {
        return(
            <cotecna-file-drag-and-drop
                onDropFile = { (event) => this.storeFile(event) }
            ></cotecna-file-drag-and-drop>
        );
    }

    private buildCheckBoxContainer() {
        return (
            <div class="checkbox-container">
                <input type="checkbox"
                checked = {this.exportAsPdf}
                onChange={ () => this.exportAsPdf = !this.exportAsPdf }/>
                <label>Set export as PDF as default</label>
            </div>
        );
    }

    private storeFile(event: any): void {
        console.log("new template");
        this.template = event.detail.name;
    }

    private downloadFile(): void {
        console.log("download");
        console.log(this.exportAsPdf);
    }

    private deleteFile(): void {
        console.log("delete")
        this.template = null;
    }
}