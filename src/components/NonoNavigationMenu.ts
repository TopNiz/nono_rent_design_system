import { NonoBase } from "./NonoBase.js";

export class NonoNavigationMenu extends NonoBase {
  static styles = NonoBase.css`
    nav {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background-color: #f0f0f0;
    }
    nono-button.active {
      font-weight: bold;
      background-color: #ddd;
    }
    @media (max-width: 768px) {
      nav {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `;

  private nav: HTMLElement;

  constructor() {
    super();
    this.shadowRoot!.adoptedStyleSheets.push(NonoNavigationMenu.styles);
    this.nav = document.createElement("nav");

    const items = [
      { text: "Accueil", href: "/" },
      { text: "Propriétés", href: "/properties" },
      { text: "Locataires", href: "/tenants" },
      { text: "Baux", href: "/leases" },
      { text: "Quittances", href: "/quittances" },
    ];

    items.forEach((item) => {
      const button = document.createElement("nono-button");
      button.setAttribute("text", item.text);
      button.addEventListener("click", () => {
        window.location.href = item.href;
      });
      this.nav.appendChild(button);
    });

    this.shadowRoot!.appendChild(this.nav);
    this.updateActive();
  }

  connectedCallback(): void {
    this.updateActive();
  }

  private updateActive(): void {
    const path = window.location.pathname;
    const paths = ['/', '/properties', '/tenants', '/leases', '/quittances'];
    const index = paths.indexOf(path);
    const buttons = this.nav.querySelectorAll('nono-button');
    buttons.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

customElements.define("nono-navigation-menu", NonoNavigationMenu);