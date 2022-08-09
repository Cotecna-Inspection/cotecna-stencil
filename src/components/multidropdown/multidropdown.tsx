import { Component, Prop, h, Event, EventEmitter, State, Listen } from '@stencil/core';
import { FieldMode } from '../../enums/fieldMode';
import { ControlState } from '../../models/controlState';
import { Field } from '../../models/field';
import { isValid } from '../../utils/field-utils';
@Component({
  tag: 'cotecna-multidropdown',
  styleUrl: 'multidropdown.scss',
  shadow: true
})
export class Multidropdown {

  @Prop()
  field!: Field;

  @Prop()
  control!: any;

  @Event()
  change: EventEmitter<ControlState>;

  @State() private mode: FieldMode = FieldMode.READ;

  @Listen('editionFinished')
  onEditionFinished(event: CustomEvent<{field: Field, isChanged: boolean}>) {
    this.field = {...event.detail.field};
    if (event.detail.isChanged) this.onChange();
    this.mode = FieldMode.READ;
  }

  render() {
    return (
      <div class="multidropdown-container" onClick={this.setEditionMode.bind(this)}>
        <cotecna-multidropdown-readable field={this.field}/>
        { 
          this.mode === FieldMode.EDITION 
            ? <cotecna-multidropdown-editable field={this.field} control={this.control} />
            : null 
        }
      </div>
    )
  }

  private setEditionMode() {
    this.mode = FieldMode.EDITION;
  }

  private onChange() {
    this.change.emit({
      isValid: isValid(this.field),
      value: this.field.value,
      readableValue: this.field.readableValue
    } as ControlState)
  }
}
