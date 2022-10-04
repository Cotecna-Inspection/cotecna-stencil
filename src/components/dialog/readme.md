# Cotecna Dialog
This StencilJS component allows you to display a dialog as standalone component, it is possible to display whatever you want inside of it using the content projection principle.

## Properties
This component doesn't have properties


## Events
| Name | Description | Type |
|------ | ------------| -----|
| `clickDialogAction` | Emits an event when the user click on a dialog action button, there are two types `ACCEPT` and `CANCEL` actions | `DialogAction` |

## Event types
```ts
export enum DialogAction {
  ACCEPT,
  CANCEL
}
```

## Usage example
On your html template:
```html
<cotecna-dialog>
  <p>This is the content that I want to display inside the Cotecna Dialog</p>
</cotecna-dialog>
```


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
