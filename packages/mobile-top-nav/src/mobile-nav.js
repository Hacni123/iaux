import { LitElement, html, css } from 'lit-element';
import icons from './assets/img/static_icons';
import './login-button';

class MobileNav extends LitElement {
  static get styles() {
    return css`
      button:focus,
      a:focus,
      input:focus {
        outline: none;
      }
      .flex {
        display: flex;
      }
      .search-inactive {
        display: none;
      }
      .align-center {
        align-items: center;
      }
      .navbar {
        position: relative;
        flex-direction: row;
        background: var(--grey13);
        border-bottom: 1px solid var(--grey20);
      }
      .navbar button {
        background: none;
        color: inherit;
        border: none;
        font: inherit;
        cursor: pointer;
      }
      .left {
        justify-content: flex-start;
      }
      .right {
        justify-content: flex-end;
      }
      .center {
        margin: auto 3% auto 1%;
        flex: 1;
        justify-content: space-between;
        min-height: 6rem;
        max-height: 6rem;
      }
      .center .search {
        padding-top: 0;
        margin-right: 1.5%;
      }
      .link-home {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        transform: translate(-50%, -50%);
      }
      .link-home img {
        height: 32px;
      }
      .hamburger {
        margin-top: 0.6rem;
      }
      .search-trigger {
        position: relative;
        z-index: 1;
      }
      .search-activated {
        position: relative;
        z-index: 3;
      }
      .search-trigger {
        width: 100%;
        text-align: right;
      }
      .search-activated {
        width: 100%;
        padding: 0.5rem 0.2rem;
        border-radius: 1rem 1rem 0 0;
        background: var(--grey20);
      }
      .search-trigger .search {
        margin: 0.4rem 0.1rem 0 0;
        height: 2.8rem;
      }
      .search-activated .highlight,
      .search-activated .search {
        background: var(--white);
        border-radius: 0.5rem;
      }
      .search-activated .highlight {
        display: flex;
        width: 100%;
        margin: 0 1.5%;
      }
      .search-activated .search {
        height: 2.8rem;
        padding: 0;
        margin-right: 0;
      }
      .search-activated search-image {
        position: relative;
        top: -5px;
      }
      .search-activated .search-field {
        width: 100%;
        height: 3rem;
        padding-left: 1rem;
        border-radius: 0.5rem;
        border: none;
        font-size: 1.2rem;
        text-align: center;
      }
      .search-activated .search-field:focus {
        outline: none;
      }
      .user-menu {
        padding: 0.4rem;
      }
      .user-menu.active {
        border-radius: 1rem 1rem 0 0;
        background: var(--grey20);
      }
      .user-menu img {
        display: block;
        width: 40px;
      }
      @keyframes fade-in {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .fade-in {
        animation: fade-in 1s forwards;
      }
    `;
  }

  static get properties() {
    return {
      config: { type: Object },
      mediaMenuOpen: { type: Boolean },
      searchMenuFade: { type: Boolean },
      searchMenuOpen: { type: Boolean },
      userMenuOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.userMenuOpen = false;
    this.searchMenuOpen = false;
    this.searchMenuFade = false;
    this.mediaMenuOpen = false;
  }

  mediaMenu() {
    this.dispatchEvent(new CustomEvent('mediaMenu', {
      bubbles: true,
      composed: true,
    }));
  }

  searchMenu() {
    this.dispatchEvent(new CustomEvent('searchMenu', {
      bubbles: true,
      composed: true,
    }));
  }

  userMenu() {
    this.dispatchEvent(new CustomEvent('userMenu', {
      bubbles: true,
      composed: true,
    }));
  }

  get userIcon() {
    const userMenuClass = this.userMenuOpen ? 'active' : '';

    return html`<button class="user-menu ${userMenuClass}" @click="${this.userMenu}">
      <img src="https://archive.org/services/img/user/profile?${+(new Date())}" alt="${this.config.username}" />
    </button>`;
  }

  get loginIcon() {
    return html`<login-button .config=${this.config}></login-button>`;
  }

  render() {
    const searchFade = this.searchMenuFade ? 'fade-in' : '';
    const searchMenuClass = this.searchMenuOpen ? 'flex' : 'search-inactive';
    const searchMenuToggleState = this.searchMenuOpen ? 'search-inactive' : '';

    return html`
      <nav class="navbar flex align-center">
        <a class="link-home" href="https://${this.config.baseUrl}">${icons.iaLogo}</a>
        <div class="left flex align-center">
          <button class="hamburger" @click="${this.mediaMenu}" tabindex="1">
            <icon-hamburger ?active=${this.mediaMenuOpen}></icon-hamburger>
          </button>
        </div>
        <div class="search-trigger ${searchFade} ${searchMenuToggleState}">
          <button class="search" @click="${this.searchMenu}">
            <search-image ?active=${this.searchMenuOpen}></search-image>
          </button>
        </div>
        <!--New div created to replace above one when search is activated-->
        <div class="search-activated fade-in ${searchMenuClass}">
          <div class="highlight">
            <input
              type="text"
              class="search-field"
              placeholder="Search Internet Archive"
              required
            />
            <button class="search" @click="${this.searchMenu}">
              <search-image ?active=${this.searchMenuOpen}></search-image>
            </button>
          </div>
        </div>
        <!--End of replacement div-->
        <div class="right flex align-center">
          ${this.config.username ? this.userIcon : this.loginIcon}
        </div>
      </nav>
    `;
  }
}

customElements.define('mobile-nav', MobileNav);