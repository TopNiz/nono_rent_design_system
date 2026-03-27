import { NonoBase } from "./NonoBase.js";

export class NonoButton extends NonoBase {
  static styles = NonoBase.css`
    .nono-button {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: background-color 0.2s, opacity 0.2s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }

    .nono-button.primary {
      background-color: var(--primary-color);
      color: white;
    }

    .nono-button.secondary {
      background-color: var(--secondary-color);
      color: white;
    }

    .nono-button.success {
      background-color: var(--success-color);
      color: white;
    }

    .nono-button.danger {
      background-color: var(--danger-color);
      color: white;
    }

    .nono-button.small {
      padding: var(--spacing-xs) var(--spacing-sm);
      font-size: 12px;
    }

    .nono-button.medium {
      padding: var(--spacing-sm) var(--spacing-md);
    }

    .nono-button.large {
      padding: var(--spacing-md) var(--spacing-lg);
      font-size: 16px;
    }

    .nono-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .nono-button:hover:not(:disabled) {
      opacity: 0.9;
    }
  `;

  private button: HTMLButtonElement;

  constructor() {
    super();
    this.shadowRoot!.adoptedStyleSheets.push(NonoButton.styles);
    this.button = document.createElement("button");
    this.button.classList.add("nono-button");
    this.updateButton();
    this.shadowRoot!.appendChild(this.button);
  }

  static get observedAttributes(): string[] {
    return ["text", "variant", "disabled", "size"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (oldValue !== newValue) {
      this.updateButton();
    }
  }

  private updateButton(): void {
    const text = this.getAttribute("text") || "";
    const variant = this.getAttribute("variant") || "primary";
    const disabled = this.hasAttribute("disabled");
    const size = this.getAttribute("size") || "medium";

    this.button.textContent = text;
    this.button.disabled = disabled;
    this.button.className = `nono-button ${variant} ${size}`;
  }
}

customElements.define("nono-button", NonoButton);
