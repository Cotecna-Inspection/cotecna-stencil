import { Component, h, Prop, Element } from "@stencil/core";

/** @internal */
@Component({
  tag: 'cotecna-spinner-loader',
  styleUrl: 'spinner-loader.scss',
  shadow: true
})
export class SpinnerLoader {
  @Prop()
  public text: string = '';

  @Prop()
  public color: string = "red";

  @Prop()
  public size: number = 32;

  @Prop()
  public thick: number = 4;

  @Element() 
  private el: HTMLElement;
  
  componentDidLoad() {
    this.el.style.setProperty("--loader-spinner-color", this.color);
    this.el.style.setProperty("--loader-spinner-size", `${this.size}px`);
    this.el.style.setProperty("--loader-spinner-thick", `${this.thick}px`);
  }

  render() {
    return (
      <div class="loader-container" part="container">
        { this.text ? <p>{this.text}</p> : null }
        <div class="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}