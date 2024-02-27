import { Component, Element, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { MouseEvent } from '../../enums/mouse-event.enum';
import { ControlState } from '../../models/control-state';
import { Field } from '../../models/field';
import { getIconSVGPath, isValid } from '../../utils/field-utils';

/** @internal **/
@Component({
  tag: 'cotecna-email-box',
  styleUrl: 'email-box.scss',
  shadow: true,
})
export class EmailBox {
  private readonly enterCode = 'Enter';

  @Prop()
  public field!: Field;

  @Prop()
  public control!: any;

/** TODO: WORKAROUND - The DOM can't detect changes in a property of a complex object that is passed as Prop()
 * For this reason, the variables we want to render the UI have been separated into new Props:
 * - readOnly
 * - required
 */
  @Prop()
  public readOnly: boolean;

  @Prop()
  public required: boolean;

  @Event()
  fieldChange: EventEmitter<ControlState>;

  @State()
  private defaultEmails: string[] = [];

  @State() 
  private addedEmails: string[] = [];

  @Element()
  private element: HTMLElement;

  private readonly EMAIL_REGEX: string = `[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}(?:[a-z]{2,3})$`;

  @Watch('field')
  onFieldChanged() {
    this.initValues();
  }

  @Watch('control')
  onControlChanged() {
    this.initValues();
  }

  componentDidLoad() {
   this.initValues();
  }

  render() {
    return (
      <div class={ this.getContainerClass()} 
        onClick={this.handleClick.bind(this)} 
        onMouseLeave={this.handleMouseEvent.bind(this, MouseEvent.LEAVE)}
        onMouseEnter={this.handleMouseEvent.bind(this, MouseEvent.ENTER)} 
        part="container">
        <label part="label">
          {this.field.label}
          {this.getSymbol()}
        </label>
        <div class="border">
          <div class="emails-container" part="emails-container">
            { this.displayDefaultEmails() }
            { this.displayAddedEmails() }
            { this.displayPlaceholder() }
          </div>
          <input id="add-email-input" 
            type="email"
            class="add-email-input"
            pattern={this.EMAIL_REGEX}
            onKeyUp={this.handleKeyPress.bind(this)}></input>
        </div>
      </div>
    )
  }

  private initValues() {
    if (!this.readOnly) {
      this.readOnly = this.field.readOnly;
    }
    if (!this.required) {
      this.required = this.field.required;
    }
    this.addedEmails = [...this.field.value];
    this.defaultEmails = (this.control?.defaultEmails?.length) 
      ? [...this.control.defaultEmails] 
      : [];
    this.setEmailContainerScrollToBottom();
  }

  private getContainerClass(): string {
    let containerClass = 'email-box-container';
    if (this.readOnly) containerClass = `${containerClass} readonly`;
    if (!isValid(this.field)) containerClass = `${containerClass} invalid-field`;
    return containerClass;
  }

  private getSymbol(): string {
    return this.required ? <span class="mandatory-symbol">*</span> : null;
  }

  private displayDefaultEmails(): any {
    return this.defaultEmails?.map((defaultEmail, index) => {
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
            class="delete-chip"
            data-index={index} 
            onClick={this.handleDelete.bind(this)}></img>
        </div>
      )
    });
  }

  private displayPlaceholder(): any {
    return (this.addedEmails?.length === 0 && this.defaultEmails?.length === 0) 
        ? <div class="placeholder" part="placeholder">{this.getPlaceholderText()}</div>
        : null;
  }

  private getPlaceholderText(): string {
    return (!this.readOnly) ? 'Enter your emails here' : 'No emails available';
  }

  private handleMouseEvent(mouseEvent: MouseEvent) {
    if (!this.readOnly && isValid(this.field)) {
      let border: any = this.element.shadowRoot.querySelector('.border');
      switch(mouseEvent) {
        case MouseEvent.ENTER:
          border.style.border = `1px solid rgba(0,0,0,0.54)`;
          break;
        case MouseEvent.LEAVE:
          border.style.border = `1px solid #D4D4D4`;
          break;
      }
    }
  }

  private handleClick() {
    //when click on the component it puts the focus on the input
    const input: any = this.element.shadowRoot.querySelector('.add-email-input');
    input?.focus();
  }

  private handleKeyPress(event: KeyboardEvent) {
    event.stopPropagation();
    const field = event.target as any;
    this.markFieldValidityStatus(field);

    if (event.key === this.enterCode && field?.validity?.valid && field?.value?.trim()?.length) {
      if (!this.emailAlreadyExists(field.value)) {
        const emailToAdd = field.value;
        this.addEmail(emailToAdd);
        this.updateAndTriggerOnChange();
        field.value = '';
      }
      else {
        this.markFieldValidityStatus(field,'Email already exists');
      }
    } 
  }

  private handleDelete(event: any) {
    event.stopPropagation();
    const indexEmailToDelete = event.target.dataset.index;
    if (indexEmailToDelete >= 0) this.addedEmails.splice(indexEmailToDelete, 1);
    this.addedEmails = [...this.addedEmails];
    this.updateAndTriggerOnChange();
  }

  private emailAlreadyExists(email: string): boolean {
    return this.addedEmails.some(addedEmail => addedEmail?.toLowerCase() === email?.toLowerCase()) ||
           this.control?.defaultEmails?.some(defaultEmail => defaultEmail?.toLowerCase() === email?.toLowerCase());
  }

  private markFieldValidityStatus(element, errorMessage: string = '') {
    element.setCustomValidity(errorMessage);
    element.validity.valid
      ? element.classList.remove('invalid') 
      : element.classList.add('invalid');
  }

  private addEmail(email: string) {
    this.addedEmails = [...this.addedEmails, email];
    this.setEmailContainerScrollToBottom();
  }

  private setEmailContainerScrollToBottom(): void {
    const emailsContainer = this.element.shadowRoot.querySelector('.emails-container');
    if (emailsContainer) {
      setTimeout(_ => emailsContainer.scrollTop = emailsContainer.scrollHeight, 0);
    }
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
