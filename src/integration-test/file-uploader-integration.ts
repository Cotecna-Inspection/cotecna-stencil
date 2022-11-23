import { ControlType } from "../enums/controlType";
import { Field } from "../models/field";

export function configFileUploader() {
  var fileUploaderField: any = document.querySelector('cotecna-file-uploader');

  fileUploaderField.field = {
    id: 'file-uploader-field',
    type: ControlType.FileUploader,
    label: 'Upload file',
    order: 2,
    propertyName: 'file-uploader-field',
    value: [
      // { id: '1', name: 'my-file-1.pdf' },
      // { id: '2', name: 'my-file-2.pdf' },
      // { id: '3', name: 'my-file-3.pdf' }
    ],
    readableValue: null,
    required: true,
    visible: true,
    valid: false,
    readOnly: false
  } as Field;

  fileUploaderField.control = {
    id: 'file-uploader-field',
    placeholder: 'DRAG FILES OR CLICK TO UPLOAD',
    isMultiple: true,
    acceptedFileExtensions: [
      '.pdf',
      '.png',
      '.jpeg'
    ]
  }
}