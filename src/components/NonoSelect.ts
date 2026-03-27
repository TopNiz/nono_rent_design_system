import { NonoBase } from "./NonoBase.js";

export class NonoSelect extends NonoBase {
  static styles = NonoBase.css`
    .nono-select-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    label {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      font-weight: 500;
      color: var(--dark-color);
    }

    select {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      padding: var(--spacing-sm);
      border: 1px solid #ccc;
      border-radius: var(--border-radius);
      outline: none;
      transition: border-color 0.2s;
    }

    select:focus {
      border-color: var(--primary-color);
    }

    .error {
      font-family: var(--font-family);
      font-size: 12px;
      color: var(--danger-color);
      display: none;
    }
  `;

  private select: HTMLSelectElement;
  private label: HTMLLabelElement;
  private error: HTMLSpanElement;
  private container: HTMLDivElement;

  constructor() {
    super();
    this.shadowRoot!.adoptedStyleSheets.push(NonoSelect.styles);
    this.container = document.createElement("div");
    this.container.classList.add("nono-select-container");
    this.label = document.createElement("label");
    this.select = document.createElement("select");
    this.error = document.createElement("span");
    this.error.classList.add("error");
    this.container.appendChild(this.label);
    this.container.appendChild(this.select);
    this.container.appendChild(this.error);
    this.shadowRoot!.appendChild(this.container);
    this.updateSelect();
    this.addEventListeners();
  }

  static get observedAttributes(): string[] {
    return ["label", "options", "value", "required", "error"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (oldValue !== newValue) {
      this.updateSelect();
    }
  }

  private updateSelect(): void {
    const label = this.getAttribute("label") || "";
    const options = JSON.parse(this.getAttribute("options") || "[]") as {
      value: string;
      label: string;
    }[];
    const value = this.getAttribute("value") || "";
    const required = this.hasAttribute("required");
    const error = this.getAttribute("error") || "";

    this.label.textContent = label;
    this.select.innerHTML = "";
    options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option.value;
      opt.textContent = option.label;
      this.select.appendChild(opt);
    });
    this.select.value = value;
    this.select.required = required;
    this.error.textContent = error;
    this.error.style.display = error ? "block" : "none";
  }

  private addEventListeners(): void {
    this.select.addEventListener("change", () => {
      this.dispatchEvent(
        new CustomEvent("change", { detail: { value: this.select.value } }),
      );
    });
  }

  get value(): string {
    return this.select.value;
  }

  set value(val: string) {
    this.select.value = val;
    this.setAttribute("value", val);
  }
}

customElements.define("nono-select", NonoSelect);
