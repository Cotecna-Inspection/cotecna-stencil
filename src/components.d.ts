/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { DialogAction } from "./enums/dialogAction";
import { Field } from "./models/field";
import { ControlState } from "./models/control-state";
import { UploadedFile } from "./models/uploaded-file";
export namespace Components {
    interface CotecnaDialog {
    }
    interface CotecnaEmailBox {
        "control": any;
        "field": Field;
    }
    interface CotecnaFileUploader {
        "control": any;
        "field": Field;
    }
    interface CotecnaImageViewer {
        "counted": any;
        "image": string;
        "predictions": any;
        "showItemMarks": boolean;
    }
    interface CotecnaMultidropdown {
        "control": any;
        "field": Field;
    }
    interface CotecnaMultidropdownEditable {
        "control": any;
        "field": Field;
    }
    interface CotecnaMultidropdownReadable {
        "field": Field;
    }
    interface CotecnaObjectCounter {
        "control": any;
        "field": Field;
    }
    interface CotecnaOcr {
        "control": any;
        "field": Field;
    }
    interface CotecnaSpinnerLoader {
        "color": string;
        "size": number;
        "text": string;
        "thick": number;
    }
}
export interface CotecnaDialogCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCotecnaDialogElement;
}
export interface CotecnaEmailBoxCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCotecnaEmailBoxElement;
}
export interface CotecnaFileUploaderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCotecnaFileUploaderElement;
}
export interface CotecnaImageViewerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCotecnaImageViewerElement;
}
export interface CotecnaMultidropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCotecnaMultidropdownElement;
}
export interface CotecnaMultidropdownEditableCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCotecnaMultidropdownEditableElement;
}
export interface CotecnaObjectCounterCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCotecnaObjectCounterElement;
}
export interface CotecnaOcrCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCotecnaOcrElement;
}
declare global {
    interface HTMLCotecnaDialogElement extends Components.CotecnaDialog, HTMLStencilElement {
    }
    var HTMLCotecnaDialogElement: {
        prototype: HTMLCotecnaDialogElement;
        new (): HTMLCotecnaDialogElement;
    };
    interface HTMLCotecnaEmailBoxElement extends Components.CotecnaEmailBox, HTMLStencilElement {
    }
    var HTMLCotecnaEmailBoxElement: {
        prototype: HTMLCotecnaEmailBoxElement;
        new (): HTMLCotecnaEmailBoxElement;
    };
    interface HTMLCotecnaFileUploaderElement extends Components.CotecnaFileUploader, HTMLStencilElement {
    }
    var HTMLCotecnaFileUploaderElement: {
        prototype: HTMLCotecnaFileUploaderElement;
        new (): HTMLCotecnaFileUploaderElement;
    };
    interface HTMLCotecnaImageViewerElement extends Components.CotecnaImageViewer, HTMLStencilElement {
    }
    var HTMLCotecnaImageViewerElement: {
        prototype: HTMLCotecnaImageViewerElement;
        new (): HTMLCotecnaImageViewerElement;
    };
    interface HTMLCotecnaMultidropdownElement extends Components.CotecnaMultidropdown, HTMLStencilElement {
    }
    var HTMLCotecnaMultidropdownElement: {
        prototype: HTMLCotecnaMultidropdownElement;
        new (): HTMLCotecnaMultidropdownElement;
    };
    interface HTMLCotecnaMultidropdownEditableElement extends Components.CotecnaMultidropdownEditable, HTMLStencilElement {
    }
    var HTMLCotecnaMultidropdownEditableElement: {
        prototype: HTMLCotecnaMultidropdownEditableElement;
        new (): HTMLCotecnaMultidropdownEditableElement;
    };
    interface HTMLCotecnaMultidropdownReadableElement extends Components.CotecnaMultidropdownReadable, HTMLStencilElement {
    }
    var HTMLCotecnaMultidropdownReadableElement: {
        prototype: HTMLCotecnaMultidropdownReadableElement;
        new (): HTMLCotecnaMultidropdownReadableElement;
    };
    interface HTMLCotecnaObjectCounterElement extends Components.CotecnaObjectCounter, HTMLStencilElement {
    }
    var HTMLCotecnaObjectCounterElement: {
        prototype: HTMLCotecnaObjectCounterElement;
        new (): HTMLCotecnaObjectCounterElement;
    };
    interface HTMLCotecnaOcrElement extends Components.CotecnaOcr, HTMLStencilElement {
    }
    var HTMLCotecnaOcrElement: {
        prototype: HTMLCotecnaOcrElement;
        new (): HTMLCotecnaOcrElement;
    };
    interface HTMLCotecnaSpinnerLoaderElement extends Components.CotecnaSpinnerLoader, HTMLStencilElement {
    }
    var HTMLCotecnaSpinnerLoaderElement: {
        prototype: HTMLCotecnaSpinnerLoaderElement;
        new (): HTMLCotecnaSpinnerLoaderElement;
    };
    interface HTMLElementTagNameMap {
        "cotecna-dialog": HTMLCotecnaDialogElement;
        "cotecna-email-box": HTMLCotecnaEmailBoxElement;
        "cotecna-file-uploader": HTMLCotecnaFileUploaderElement;
        "cotecna-image-viewer": HTMLCotecnaImageViewerElement;
        "cotecna-multidropdown": HTMLCotecnaMultidropdownElement;
        "cotecna-multidropdown-editable": HTMLCotecnaMultidropdownEditableElement;
        "cotecna-multidropdown-readable": HTMLCotecnaMultidropdownReadableElement;
        "cotecna-object-counter": HTMLCotecnaObjectCounterElement;
        "cotecna-ocr": HTMLCotecnaOcrElement;
        "cotecna-spinner-loader": HTMLCotecnaSpinnerLoaderElement;
    }
}
declare namespace LocalJSX {
    interface CotecnaDialog {
        "onClickDialogAction"?: (event: CotecnaDialogCustomEvent<DialogAction>) => void;
    }
    interface CotecnaEmailBox {
        "control": any;
        "field": Field;
        "onFieldChange"?: (event: CotecnaEmailBoxCustomEvent<ControlState>) => void;
    }
    interface CotecnaFileUploader {
        "control"?: any;
        "field": Field;
        "onAddedFile"?: (event: CotecnaFileUploaderCustomEvent<File>) => void;
        "onDeletedFile"?: (event: CotecnaFileUploaderCustomEvent<UploadedFile>) => void;
        "onDownloadedFile"?: (event: CotecnaFileUploaderCustomEvent<UploadedFile>) => void;
        "onFieldChange"?: (event: CotecnaFileUploaderCustomEvent<ControlState>) => void;
    }
    interface CotecnaImageViewer {
        "counted"?: any;
        "image": string;
        "onCloseImageViewer"?: (event: CotecnaImageViewerCustomEvent<boolean>) => void;
        "onConfirmCount"?: (event: CotecnaImageViewerCustomEvent<boolean>) => void;
        "onDeleteImage"?: (event: CotecnaImageViewerCustomEvent<boolean>) => void;
        "onRetakePhoto"?: (event: CotecnaImageViewerCustomEvent<boolean>) => void;
        "predictions"?: any;
        "showItemMarks"?: boolean;
    }
    interface CotecnaMultidropdown {
        "control": any;
        "field": Field;
        "onFieldChange"?: (event: CotecnaMultidropdownCustomEvent<ControlState>) => void;
    }
    interface CotecnaMultidropdownEditable {
        "control": any;
        "field": Field;
        "onEditionFinished"?: (event: CotecnaMultidropdownEditableCustomEvent<{ field: Field, isChanged: boolean}>) => void;
    }
    interface CotecnaMultidropdownReadable {
        "field": Field;
    }
    interface CotecnaObjectCounter {
        "control": any;
        "field": Field;
        "onFieldChange"?: (event: CotecnaObjectCounterCustomEvent<ControlState>) => void;
        "onIsEnlarged"?: (event: CotecnaObjectCounterCustomEvent<boolean>) => void;
    }
    interface CotecnaOcr {
        "control": any;
        "field": Field;
        "onFieldChange"?: (event: CotecnaOcrCustomEvent<ControlState>) => void;
    }
    interface CotecnaSpinnerLoader {
        "color"?: string;
        "size"?: number;
        "text"?: string;
        "thick"?: number;
    }
    interface IntrinsicElements {
        "cotecna-dialog": CotecnaDialog;
        "cotecna-email-box": CotecnaEmailBox;
        "cotecna-file-uploader": CotecnaFileUploader;
        "cotecna-image-viewer": CotecnaImageViewer;
        "cotecna-multidropdown": CotecnaMultidropdown;
        "cotecna-multidropdown-editable": CotecnaMultidropdownEditable;
        "cotecna-multidropdown-readable": CotecnaMultidropdownReadable;
        "cotecna-object-counter": CotecnaObjectCounter;
        "cotecna-ocr": CotecnaOcr;
        "cotecna-spinner-loader": CotecnaSpinnerLoader;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cotecna-dialog": LocalJSX.CotecnaDialog & JSXBase.HTMLAttributes<HTMLCotecnaDialogElement>;
            "cotecna-email-box": LocalJSX.CotecnaEmailBox & JSXBase.HTMLAttributes<HTMLCotecnaEmailBoxElement>;
            "cotecna-file-uploader": LocalJSX.CotecnaFileUploader & JSXBase.HTMLAttributes<HTMLCotecnaFileUploaderElement>;
            "cotecna-image-viewer": LocalJSX.CotecnaImageViewer & JSXBase.HTMLAttributes<HTMLCotecnaImageViewerElement>;
            "cotecna-multidropdown": LocalJSX.CotecnaMultidropdown & JSXBase.HTMLAttributes<HTMLCotecnaMultidropdownElement>;
            "cotecna-multidropdown-editable": LocalJSX.CotecnaMultidropdownEditable & JSXBase.HTMLAttributes<HTMLCotecnaMultidropdownEditableElement>;
            "cotecna-multidropdown-readable": LocalJSX.CotecnaMultidropdownReadable & JSXBase.HTMLAttributes<HTMLCotecnaMultidropdownReadableElement>;
            "cotecna-object-counter": LocalJSX.CotecnaObjectCounter & JSXBase.HTMLAttributes<HTMLCotecnaObjectCounterElement>;
            "cotecna-ocr": LocalJSX.CotecnaOcr & JSXBase.HTMLAttributes<HTMLCotecnaOcrElement>;
            "cotecna-spinner-loader": LocalJSX.CotecnaSpinnerLoader & JSXBase.HTMLAttributes<HTMLCotecnaSpinnerLoaderElement>;
        }
    }
}
