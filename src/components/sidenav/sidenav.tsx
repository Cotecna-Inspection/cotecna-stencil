import { Component, h, Event, EventEmitter, Listen, State, Element, Method } from "@stencil/core";

/** @internal **/
@Component({
  tag: 'cotecna-sidenav',
  styleUrl: 'sidenav.scss',
  shadow: true
})
export class Sidenav {

  @State()
  showDrawer = false;

  @Event() backgroundToggle: EventEmitter;
  drawerToggle(e) {
    this.backgroundToggle.emit(e);
    this.showDrawer = !this.showDrawer;
  }

  @Method()
  async toggle() {
    this.showDrawer = !this.showDrawer;
  }  

  render() {
    return(
      <div id="sidenav-container">
        <div class="sidenav">
          <div class={{"menu-background": this.showDrawer}} onClick={(e) => this.drawerToggle(e)}>
          </div>
          <div class={{"actual-menu": !this.showDrawer, "expanded": this.showDrawer}}>
            <slot></slot>
          </div>
        </div>
      </div>
   );
  }
}

