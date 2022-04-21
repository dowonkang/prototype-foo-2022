import { LitElement, html, css } from "lit";

export default class ImageBlock extends LitElement {
  static styles = css`
    ::slotted(img) {
      display: block;
      width: 100%;
    }

    ::slotted(img):where([width][height]) {
      height: auto;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("image-block", ImageBlock);
