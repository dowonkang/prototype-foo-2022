import { LitElement, html, css } from "lit";

export default class GlobalNav extends LitElement {
  static properties = {
    label: { reflect: true },
  };

  static styles = css`
    :host {
      position: fixed;
      z-index: var(--global-nav-z, 100);
      right: var(--global-nav-right, 0);
      bottom: var(--global-nav-bottom, 0);
      left: var(--global-nav-left, 0);
    }
  `;

  constructor() {
    super();

    this.label = "Global Navigation";
  }

  render() {
    return html`
      <nav aria-label="${this.label}">
        <slot></slot>
      </nav>
    `;
  }
}

customElements.define("global-nav", GlobalNav);
