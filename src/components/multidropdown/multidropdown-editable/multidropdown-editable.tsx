import { Component, EventEmitter, h, Listen, Prop, State, Event } from "@stencil/core";
import { DialogAction } from "../../../enums/dialogAction";
import { Field } from "../../../models/field";
import { SelectedOption } from "../../../models/selected-option";

/** @internal **/
@Component({
  tag: 'cotecna-multidropdown-editable',
  styleUrl: 'multidropdown-editable.scss',
  shadow: true
})
export class MultidropdownEditable {
  @Prop()
  field!: Field;

  @Prop()
  control!: any;

  @Event()
  editionFinished: EventEmitter<{ field: Field, isChanged: boolean} >

  @State() private selectedOptionsIds: any[] = [];
  @State() private readableValue: string[] = [];

  componentWillLoad() {
    this.control.options.sort(this.sortOptions);
    this.initValues();
  }

  @Listen('clickDialogAction')
  onClickDialogAction(event: any) {
    let isChanged: boolean = false; 
    if (event.detail === DialogAction.ACCEPT) {
      isChanged = this.hasValueChanged();
      this.field.value = [...this.selectedOptionsIds];
      this.field.readableValue = this.readableValue;
    }
    else {
      this.initValues();
    }
    this.editionFinished.emit({ field: this.field, isChanged });
  }


  render() {
    return (
      <cotecna-dialog>
        <div id={`selection-${this.field.id}`} class="list-items">
          { 
            this.control?.options?.map((option, index) => 
              (
                <div id={`option-${option.id}`} 
                  class={this.getListItemClass(option.id)}
                  tabIndex={index + 1}
                  onClick={this.onOptionSelected.bind(this, option)}>
                    <span>{option.name}</span>
                </div>
              )
            )
          }
        </div>
      </cotecna-dialog>
    )
  }

  private initValues() {
    this.selectedOptionsIds = [...this.field.value];
    this.readableValue = [...this.field.readableValue];
  }

  private getListItemClass(optionId: string): string {
    const isOptionSelected = this.selectedOptionsIds.includes(optionId);
    return isOptionSelected ? 'selected list-item' : 'list-item';
  }

  private onOptionSelected(selectedOption: SelectedOption) {
    const selectedOptionsIndex = this.selectedOptionsIds.findIndex(optionId => optionId === selectedOption.id);
    const readableValueIndex = this.readableValue.findIndex(value => value == selectedOption.name);

    if (selectedOptionsIndex >= 0 && readableValueIndex >= 0) {
      this.selectedOptionsIds.splice(selectedOptionsIndex, 1);
      this.readableValue.splice(readableValueIndex, 1);
    }
    else {
      this.selectedOptionsIds.push(selectedOption.id);
      this.readableValue.push(selectedOption.name);
    }
              
    this.selectedOptionsIds = [...this.selectedOptionsIds];
    this.readableValue = [...this.readableValue];
  }

  private hasValueChanged(): boolean {
    return JSON.stringify(this.field.value) != JSON.stringify(this.selectedOptionsIds);
  }

  private sortOptions(a: SelectedOption, b: SelectedOption) {
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  }
}