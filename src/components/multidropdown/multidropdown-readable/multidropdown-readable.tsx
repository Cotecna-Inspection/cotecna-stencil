import { Component, h, Prop } from "@stencil/core";
import { Field } from "../../../models/field";
import { getIconPNGPath, getSymbol, isValid } from "../../../utils/field-utils";

/** @internal **/
@Component({
  tag: 'cotecna-multidropdown-readable',
  styleUrl: 'multidropdown-readable.scss',
  shadow: true
})
export class MultidropdownReadable {
  @Prop()
  field!: Field;

  componentWillRender() {
    this.field.readableValue.sort(this.sortReadableValues);
  }

  render() {
    return (
      <div class={{"field-base": true, 'invalid-field': !isValid(this.field)}}>
        <div class="readonly-container" part="readonly-container">
          <label>
            {this.field.label}
            {getSymbol(this.field)}
          </label>
          <div class="values">
            { this.field?.readableValue?.map(value => <div class="chip">{value}</div>)}
          </div>
        </div>
        <span class="spacer"></span>
        <img src={getIconPNGPath('arrow_drop_down')}></img>
      </div>
    )
  }

  private sortReadableValues(a: string, b: string) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  }
}