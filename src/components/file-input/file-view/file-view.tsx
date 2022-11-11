import { Component, h, Prop, EventEmitter, Event } from "@stencil/core";
import { getIconSVGPath } from "../../../utils/field-utils";

/** @internal **/
@Component({
    tag: 'cotecna-file-view',
    styleUrl: 'file-view.scss',
    shadow: true,
})
export class FileView {
    @Prop({mutable: true})
    template: string = null;

    @Event()
    downloadFile: EventEmitter<void>

    @Event()
    deleteFile: EventEmitter<void>

    render() {
        return (
            <div>
            <p class="title">Template File</p>
            <div class="file-box-container">
                <p>{ this.template }</p>
                <img src={ getIconSVGPath('download_file') }
                onClick={ () => this.downloadFile.emit() }></img>
                <img src={ getIconSVGPath('delete_file') }
                onClick={ () => this.deleteFile.emit() }></img>
            </div>
        </div> 
        );
    }
}