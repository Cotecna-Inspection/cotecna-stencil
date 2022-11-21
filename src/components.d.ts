/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { DialogAction } from "./enums/dialogAction";
import { Field } from "./models/field";
import { ControlState } from "./models/controlState";
export namespace Components {
    interface CotecnaDialog {
    }
    interface CotecnaEmailBox {
        "control": any;
        "field": Field;
    }
    interface CotecnaFileUpload {
        "checkboxText": string;
        "dragAndDropContainerText": string;
        "dragAndDropText": string;
        "fileExtensionAccept": String[];
        "fileViewText": string;
        "templateName": string;
        "wrongFormatErrorText": string;
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
export interface CotecnaFileUploadCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCotecnaFileUploadElement;
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
    interface HTMLCotecnaFileUploadElement extends Components.CotecnaFileUpload, HTMLStencilElement {
    }
    var HTMLCotecnaFileUploadElement: {
        prototype: HTMLCotecnaFileUploadElement;
        new (): HTMLCotecnaFileUploadElement;
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
        "cotecna-file-upload": HTMLCotecnaFileUploadElement;
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
    interface CotecnaFileUpload {
        "checkboxText"?: string;
        "dragAndDropContainerText"?: string;
        "dragAndDropText"?: string;
        "fileExtensionAccept"?: String[];
        "fileViewText"?: string;
        "onDeleteFile"?: (event: CotecnaFileUploadCustomEvent<void>) => void;
        "onDownloadFile"?: (event: CotecnaFileUploadCustomEvent<void>) => void;
        "onOnCheckboxChange"?: (event: CotecnaFileUploadCustomEvent<boolean>) => void;
        "onSelectedFile"?: (event: CotecnaFileUploadCustomEvent<File>) => void;
        "templateName"?: string;
        "wrongFormatErrorText"?: string;
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
        "cotecna-file-upload": CotecnaFileUpload;
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
            "cotecna-file-upload": LocalJSX.CotecnaFileUpload & JSXBase.HTMLAttributes<HTMLCotecnaFileUploadElement>;
            "cotecna-multidropdown": LocalJSX.CotecnaMultidropdown & JSXBase.HTMLAttributes<HTMLCotecnaMultidropdownElement>;
            "cotecna-multidropdown-editable": LocalJSX.CotecnaMultidropdownEditable & JSXBase.HTMLAttributes<HTMLCotecnaMultidropdownEditableElement>;
            "cotecna-multidropdown-readable": LocalJSX.CotecnaMultidropdownReadable & JSXBase.HTMLAttributes<HTMLCotecnaMultidropdownReadableElement>;
            "cotecna-object-counter": LocalJSX.CotecnaObjectCounter & JSXBase.HTMLAttributes<HTMLCotecnaObjectCounterElement>;
            "cotecna-ocr": LocalJSX.CotecnaOcr & JSXBase.HTMLAttributes<HTMLCotecnaOcrElement>;
            "cotecna-spinner-loader": LocalJSX.CotecnaSpinnerLoader & JSXBase.HTMLAttributes<HTMLCotecnaSpinnerLoaderElement>;
        }
    }
}
