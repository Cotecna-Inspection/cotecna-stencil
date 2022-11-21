# cotecna-file-upload



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                      | Description | Type       | Default                           |
| -------------------------- | ------------------------------ | ----------- | ---------- | --------------------------------- |
| `checkboxText`             | `checkbox-text`                |             | `string`   | `"Set export as PDF as default"`  |
| `dragAndDropContainerText` | `drag-and-drop-container-text` |             | `string`   | `"DRAG FILES OR CLICK TO UPLOAD"` |
| `dragAndDropText`          | `drag-and-drop-text`           |             | `string`   | `"Upload File"`                   |
| `fileExtensionAccept`      | --                             |             | `String[]` | `[".pdf"]`                        |
| `fileViewText`             | `file-view-text`               |             | `string`   | `"Template File"`                 |
| `templateName`             | `template-name`                |             | `string`   | `null`                            |
| `wrongFormatErrorText`     | `wrong-format-error-text`      |             | `string`   | `"FORMAT NOT ALLOWED"`            |


## Events

| Event          | Description | Type                   |
| -------------- | ----------- | ---------------------- |
| `deleteFile`   |             | `CustomEvent<void>`    |
| `downloadFile` |             | `CustomEvent<boolean>` |
| `selectedFile` |             | `CustomEvent<File>`    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
