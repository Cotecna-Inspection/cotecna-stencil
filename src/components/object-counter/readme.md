# Cotecna Object Counter
This StencilJS component allows you to render an Object Counter field as standalone component.

## Properties

| Name | Description | Type | Mandatory |
| -------- | --------------- | -------- | ----------- |
| `field` | The field definition that will be rendered | `Field` | `true` |
| `readOnly` | The readOnly property in field but it triggers the UI when is changed | `boolean` | `false` |
| `required` | The requied property in field but it triggers the UI when is changed | `boolean` | `false` |
| `control` | The control definition of this field | `any` | `true` |

## Events
| Name | Description | Type |
| Name | Description | Type |
|------ | ------------| -----|
| `fieldChange` | Emits an event when the value of this field is changed | `ControlState` |

## Usage example
On your typescript field:
```ts
const objectCounterField = {
  id: 'object-counter-field',
  type: ControlType.ObjectCounter,
  label: 'Container number',
  order: 1,
  propertyName: 'object-counter-field',
  value: [],
  readableValue: [],
  required: true,
  visible: true,
  valid: true,
  readonly: false
}

const objectCounterControl = {
  id: 'object-counter-field'
}
```
On your html template:
```html
<cotecna-object-counter
  [field]="objectCounterField"
  [control]="objectCounterControl"
  (fieldChange)="onFieldChange($event)">
</cotecna-object-counter>
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
