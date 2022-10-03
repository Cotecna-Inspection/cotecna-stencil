# Cotecna Email Box
This StencilJS component allows you to render an email box field as standalone component, it is possible to enter and delete multiple emails address, the added ones are displayed as chips.

You can set this component as readonly without any interaction with the user.

| Name | Description     | Type     | Mandatory     |
| -------- | --------------- | -------- | ----------- |
| `field`  | The field definition that will be rendered  | `Field` | `true` |
| `control`| The control definition of this field   | `any` | `true` |
| `defaultEmails`| The emails that you want to display as default (it is not possible to edit or delete all of them)   | `string[]` | `false` |

## Events
| Name | Description | Type |
|------ | ------------| -----|
| `change` | Emits an event when the value of this field is changed | `ControlState` |

## Usage example
On your typescript field:
```ts
const emailBoxField = {
  id: 'email-box-1',
  type: ControlType.EmailBox,
  label: 'Share by Email',
  order: 2,
  propertyName: 'share-by-email',
  value: [],
  readableValue: [],
  required: false,
  visible: true,
  valid: false,
  readOnly: false
}

const multidropdownControl = {
  id: 'email-box-1',
  defaultEmails: [
    'marcel.pujol@cotecna.es',
    'carles.romo@cotecna.es',
    'eltjo.kraai@cotecna.es'
  ]
}
```
On your html template:
```html
<cotecna-email-box
  [field]="multidropdownField"
  [control]="multidropdownControl">
</cotecna-email-box>
```


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
