# Cotecna OCR
This StencilJS component allows you to render a OCR field as standalone component.


## Properties

| Name | Description | Type | Mandatory |
| -------- | --------------- | -------- | ----------- |
| `field` | The field definition that will be rendered | `Field` | `true` |
| `control` | The control definition of this field | `any` | `true` |

## Events
| Name | Description | Type |
| Name | Description | Type |
|------ | ------------| -----|
| `fieldChange` | Emits an event when the value of this field is changed | `ControlState` |

## Usage example
On your typescript field:
```ts
const ocrField = {
  id: 'ocr-field',
  type: ControlType.Ocr,
  label: 'Container number',
  order: 2,
  propertyName: 'ocr-field',
  value: [],
  readableValue: [],
  required: true,
  visible: true,
  valid: true,
  readonly: false
}

const ocrControl = {
  id: 'ocr-field'
}
```
On your html template:
```html
<cotecna-ocr
  [field]="ocrField"
  [control]="ocrControl"
  (fieldChange)="onFieldChange($event)">
</cotecna-ocr>
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
