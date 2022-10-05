import { Component, Element, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { ControlState } from '../../models/controlState';
import { Field } from '../../models/field';
import { getIconSVGPath, isValid } from '../../utils/field-utils';

@Component({
  tag: 'cotecna-email-box',
  styleUrl: 'email-box.scss',
  shadow: true,
})
export class EmailBox {
  private readonly enterCode = 'Enter';

  @Prop()
  field!: Field;

  @Prop()
  control!: any;

  @Prop()
  defaultEmails: string[] = [];

  @Event()
  fieldChange: EventEmitter<ControlState>;

  @State()
  private readonly: boolean;

  @State() 
  private addedEmails: string[] = [];

  @Element()
  private element: HTMLElement;

  @Watch('field')
  onFieldChanged() {
    this.initValues();
  }

  componentDidLoad() {
   this.initValues();
  }

  render() {
    return (
      <div class={ this.getContainerClass()} onClick={this.handleClick.bind(this)}>
        <label>{this.field.label}</label>
        <div class="border">
          <div class="emails-container">
            { this.displayDefaultEmails() }
            { this.displayAddedEmails() }
          </div>
          <input id="add-email-input" 
            type="email"
            class="add-email-input"
            onKeyUp={this.handleKeyPress.bind(this)}></input>
        </div>
      </div>
    )
  }

  private initValues() {
    this.readonly = this.field.readOnly;
    this.addedEmails = [... this.field.value];
  }

  private getContainerClass(): string {
    return this.readonly
      ? 'email-box-container readonly'
      : 'email-box-container';
  }

  private displayDefaultEmails(): any {
    return this.control?.defaultEmails?.map((defaultEmail, index) => {
      return (
        <div id={`default-email-${index}`} class="default-email-chip">
          { defaultEmail }
        </div>
      )
    });
  }

  private displayAddedEmails(): any {
    return this.addedEmails?.map((email, index) => {
      return (
        <div id={`added-email-${index}`} class="added-email-chip">
          { email }
          <img src={ getIconSVGPath('delete_filled') }
            data-index={index} 
            onClick={this.handleDelete.bind(this)}></img>
        </div>
      )
    });
  }

  private handleClick() {
    //when click on the component it puts the focus on the input
    const input: any = this.element.shadowRoot.querySelector('.add-email-input');
    input?.focus();
  }

  private handleKeyPress(event: KeyboardEvent) {
    event.stopPropagation();
    const element = event.target as any;
    this.setEmailFieldValidity(element);

    if (event.key === this.enterCode && element?.validity?.valid) {
      const emailToAdd = element.value;
      this.addEmail(emailToAdd);
      this.updateAndTriggerOnChange();
      element.value = '';
    }
  }

  private handleDelete(event: any) {
    event.stopPropagation();
    const indexEmailToDelete = event.target.dataset.index;
    if (indexEmailToDelete >= 0) this.addedEmails.splice(indexEmailToDelete, 1);
    this.addedEmails = [...this.addedEmails];
    this.updateAndTriggerOnChange();
  }

  private setEmailFieldValidity(element) {
    element.validity.valid 
      ? element.classList.remove('invalid') 
      : element.classList.add('invalid');
  }

  private addEmail(email: string) {
    this.addedEmails = [...this.addedEmails, email];
  }

  private updateAndTriggerOnChange() {
    this.field.value = [...this.addedEmails];
    this.onChange();
  }

  private onChange() {
    this.fieldChange.emit({
      isValid: isValid(this.field),
      value: this.field.value
    } as ControlState);
  }
}
