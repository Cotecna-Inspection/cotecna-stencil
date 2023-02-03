import { Component, h, State, Prop } from "@stencil/core";


declare var navigator;

/** @internal **/
@Component({
  tag: 'cotecna-poc-button',
  styleUrl: 'poc-button.scss',
  shadow: true
})
export class PocButton {

  @Prop()
  public styleType!: any;

  @State()
  private styleClass: any;

  componentWillLoad() {
   
  }

  render() {
    return <div><button class={this.styleClass}>CONFIRM</button></div>
  }
}