# Cotecna File Uploader
This StencilJS component allows you to render a file uploader field as standalone component, it is possible add, delete and download single or multiple files according to a configuration passed as control.

## Properties
| Name | Description     | Type     | Mandatory     |
| -------- | --------------- | -------- | ----------- |
| `field`  | The field definition that will be rendered  | `Field` | `true` |
| `control`| The control definition of this field   | `any` | `true` |

## Events
| Name | Description | Type |
|------ | ------------| -----|
| `fieldChange` | Emits an event when the value of this field is changed | `ControlState` |
| `downloadedFile` | Emits an event when user clicks on the download button of a specific file | `UploadedFile` |
| `deletedFile` | Emits an event when user clicks on the delete button of a specific file | `UploadedFile` |
| `addedFile` | Emits an event when user uploads a specific file | `File` |


## Usage example
On your typescript field:
```ts
const fileUploaderField = {
  id: 'file-uploader-field',
  type: ControlType.FileUploader,
  label: 'Upload file',
  order: 2,
  propertyName: 'file-uploader-field',
  value: [
    { id: '1', name: 'my-file-1.pdf' },
    { id: '2', name: 'my-file-2.pdf' },
    { id: '3', name: 'my-file-3.pdf' }
  ],
  readableValue: null,
  required: true,
  visible: true,
  valid: false,
  readOnly: false
}
const fileUploaderFieldControl = {
  id: 'file-uploader-field',
  placeholder: 'DRAG FILES OR CLICK TO UPLOAD',
  isMultiple: true,
  acceptedFileExtensions: [
    '.pdf',
    '.png',
    '.jpeg'
  ]
}
```
On your html template:
```html
<cotecna-file-uploader
  [field]="fileUploaderField"
  [control]="fileUploaderFieldControl"
  (fieldChange)="onFieldChange($event)"
  (downloadedFile)="onDownloadedFile($event)"
  (deletedFile)="onDeletedFile($event)"
  (addedFile)="onAddedFile($event)">
</cotecna-file-uploader>
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*