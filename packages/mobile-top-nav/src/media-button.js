import { LitElement, html, css } from 'lit-element';
import icons from './assets/img/static_icons';

class MediaButton extends LitElement {
  static get styles() {
    return css`
      button:focus {
        outline-color: var(--link-color);
        outline-width: 0.16rem;
        outline-style: auto;
      }
      .menu-item {
        width: 100%;
        background: transparent;
        font-size: 1.6rem;
        cursor: pointer;
        border: none;
        text-align: left;
        padding: 0.1rem 0;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }
      .menu-item:focus {
        outline: none;
      }
      .menu-item > .label {
        display: inline-block;
        color: var(--white);
        text-align: left;
        vertical-align: middle;
      }
      .menu-item > .icon {
        display: inline-flex;
        width: 42px;
        height: 42px;
        vertical-align: middle;
        align-items: center;
        justify-content: center;
      }
      .menu-item.selected .icon {
        background-color: var(--grey20);
        border-radius: 1rem 0 0 1rem;
      }
      .icon .fill-color {
        fill: #999;
      }
      .icon.active .fill-color {
        fill: #fff;
      }
    `;
  }

  static get properties() {
    return {
      icon: { type: String },
      label: { type: String },
      mediatype: { type: String },
      selected: { type: Boolean },
    };
  }

  static get icons() {
    return icons;
  }

  constructor() {
    super();
    this.icon = '';
    this.label = '';
    this.mediatype = '';
    this.selected = false;
  }

  onClick() {
    this.dispatchEvent(new CustomEvent('selected', {
      detail: {
        mediatype: this.mediatype
      }
    }));
  }

  get buttonClass() {
    return this.selected ? 'selected' : '';
  }

  get iconClass() {
    return this.selected ? 'active' : '';
  }

  render() {
    return html`
      <button class="menu-item ${this.buttonClass}" @click="${this.onClick}">
        <span class="icon ${this.iconClass}">
          ${MediaButton.icons[this.icon]}
        </span>
        <span class="label">${this.label}</span>
      </button>
    `;
  }
}

customElements.define('media-button', MediaButton);