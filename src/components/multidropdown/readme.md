# Cotecna Multidropdown
This StencilJS component allows you to render a multidropdown field as standalone component, it is possible to select multiple options and the selected values are displayed using chips.

This component has two different modes:
- Readable: It is the default mode, it displays the values using chips.
- Editable: When the user clicks on the field, it displays a dialog to select the value/s of this field. 


## Properties

| Name | Description     | Type     | Mandatory     |
| -------- | --------------- | -------- | ----------- |
| `field`  | The field definition that will be rendered  | `Field` | `true` |
| `control`| The control definition of this field   | `any` | `true` |

## Events
| Name | Description | Type |
|------ | ------------| -----|
| `change` | Emits an event when the value of this field is changed | `ControlState` |

## Usage example
On your typescript field:
```ts
const multidropdownField = {
  id: 'multidropdown-1';
  type: ControlType.Multidropdown;
  label: 'My multidropdown';
  order: 1;
  propertyName: 'my-multidropdown';
  value: [];
  readableValue: [];
  required: true;
  visible: true;
  valid: false;
  readOnly: false
}

const multidropdownControl = {
  id: 'multidropdown-1',
  options: [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
    { id: '3', name: 'Option 3' },
    { id: '4', name: 'Option 4' },
    { id: '5', name: 'Option 5' }
  ]
}
```
On your html template:
```html
<cotecna-multidropdown
  [field]="multidropdownField"
  [control]="multidropdownControl">
</cotecna-multdropdown>
```


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
