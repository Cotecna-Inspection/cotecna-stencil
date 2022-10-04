import { Component, EventEmitter, h, Event } from "@stencil/core";
import { DialogAction } from "../../enums/dialogAction";

/** @internal **/
@Component({
  tag: 'cotecna-dialog',
  styleUrl: 'dialog.scss',
  shadow: true
})
export class Dialog {

  @Event()
  clickDialogAction: EventEmitter<DialogAction>;

  private clickAction(dialogAction: DialogAction, event: Event) {
    event.stopPropagation();
    this.clickDialogAction.emit(dialogAction);
  }

  render() {
    return (
      <div id="dialog" class="dialog">
        <div class="dialog-content">
          <div class="options">
            <slot></slot>
          </div>
          <div class="actions-container">
            <button onClick={this.clickAction.bind(this,DialogAction.CANCEL)}>Cancel</button>
            <button class="primary-btn" onClick={this.clickAction.bind(this,DialogAction.ACCEPT)}>Accept</button>
          </div>
        </div>
      </div>
    )
  }
}