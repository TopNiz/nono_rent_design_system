import { NonoBase } from "./NonoBase.js";

export class NonoForm extends NonoBase {
  static styles = NonoBase.css`
    .nono-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .nono-form ::slotted(*) {
      width: 100%;
    }
  `;

  private form: HTMLFormElement;

  constructor() {
    super();
    this.shadowRoot!.adoptedStyleSheets.push(NonoForm.styles);
    this.form = document.createElement("form");
    this.form.classList.add("nono-form");
    this.shadowRoot!.appendChild(this.form);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("submit"));
    });
  }

  submit(): void {
    this.form.requestSubmit();
  }
}

customElements.define("nono-form", NonoForm);
