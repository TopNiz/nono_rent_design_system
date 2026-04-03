import { NonoBase } from "./NonoBase.js";

const DEFAULT_TITLE = "Aucune donnée disponible";
const DEFAULT_DESCRIPTION = "Il n'y a rien à afficher pour le moment.";

/**
 * Usage:
 * <nono-empty-state
 *   title="Aucun locataire"
 *   description="Ajoutez un locataire pour commencer."
 *   icon="🏠"
 * ></nono-empty-state>
 */
export class NonoEmptyState extends NonoBase {
  static styles = NonoBase.css`
    .nono-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-xl);
      border: 1px dashed #d9dee5;
      border-radius: var(--border-radius);
      background-color: var(--light-color);
      color: var(--dark-color);
    }

    .icon {
      font-size: 32px;
      line-height: 1;
    }

    .title {
      margin: 0;
      font-family: var(--font-family);
      font-size: 18px;
      font-weight: 600;
      color: var(--dark-color);
    }

    .description {
      margin: 0;
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      line-height: 1.5;
      color: var(--secondary-color);
      max-width: 60ch;
    }
  `;

  static template = NonoBase.html`
    <section class="nono-empty-state" role="status" aria-live="polite">
      <span class="icon" aria-hidden="true"></span>
      <h3 class="title"></h3>
      <p class="description"></p>
    </section>
  `;

  private iconElement: HTMLSpanElement;
  private titleElement: HTMLHeadingElement;
  private descriptionElement: HTMLParagraphElement;

  constructor() {
    super();
    this.shadowRoot!.adoptedStyleSheets.push(NonoEmptyState.styles);

    const fragment = NonoEmptyState.template.cloneNode(true) as DocumentFragment;
    this.shadowRoot!.appendChild(fragment);

    this.iconElement = this.shadowRoot!.querySelector(".icon") as HTMLSpanElement;
    this.titleElement = this.shadowRoot!.querySelector(".title") as HTMLHeadingElement;
    this.descriptionElement = this.shadowRoot!.querySelector(
      ".description",
    ) as HTMLParagraphElement;

    this.updateView();
  }

  static get observedAttributes(): string[] {
    return ["title", "description", "icon"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (oldValue !== newValue) {
      this.updateView();
    }
  }

  get titleText(): string {
    return this.getAttribute("title") || DEFAULT_TITLE;
  }

  set titleText(value: string) {
    this.setAttribute("title", value);
  }

  get descriptionText(): string {
    return this.getAttribute("description") || DEFAULT_DESCRIPTION;
  }

  set descriptionText(value: string) {
    this.setAttribute("description", value);
  }

  get icon(): string | null {
    return this.getAttribute("icon");
  }

  set icon(value: string | null) {
    if (value === null || value.length === 0) {
      this.removeAttribute("icon");
      return;
    }

    this.setAttribute("icon", value);
  }

  private updateView(): void {
    const icon = this.icon;
    const hasIcon = icon !== null && icon.length > 0;

    this.iconElement.textContent = hasIcon ? icon : "";
    this.iconElement.style.display = hasIcon ? "block" : "none";
    this.titleElement.textContent = this.titleText;
    this.descriptionElement.textContent = this.descriptionText;
  }
}

customElements.define("nono-empty-state", NonoEmptyState);
