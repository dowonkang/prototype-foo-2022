import { LitElement, html, css } from "lit";

export class AppHeader extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      z-index: var(--app-header-z, 100);
      top: var(--app-header-top, 0);
      right: var(--app-header-right, 0);
      left: var(--app-header-left, 0);
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <slot></slot>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
