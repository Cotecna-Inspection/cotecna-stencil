# Cotecna Spinner Loader
This StencilJS component allows you to render a loader component.


## Properties

| Name | Description | Type | Mandatory |
| -------- | --------------- | -------- | ----------- |
| `text` | Text of the loader (empty by default) | `string` | `false` |
| `color` | Color of the loader (blue by default) | `string` | `false` |
| `size` | Size of the loader (64px by default) | `number` | `false` |
| `thick` | Thickness of the loader (8px by default) | `number` | `false` |


## Usage example
On your html template:
```html
<cotecna-loader
  text="My custom loader text"
  color="#000087"
  size={32}
  thick={4}>
</cotecna-loader>
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
