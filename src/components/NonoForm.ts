import { NonoBase } from './NonoBase.js';

export class NonoForm extends NonoBase {
  private form: HTMLFormElement;

  constructor() {
    super();
    this.form = document.createElement('form');
    this.form.classList.add('nono-form');
    this.shadowRoot!.appendChild(this.form);
    this.addFormStyles();
    this.addEventListeners();
  }

  private addFormStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .nono-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .nono-form ::slotted(*) {
        width: 100%;
      }
    `;
    this.shadowRoot!.appendChild(style);
  }

  private addEventListeners(): void {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('submit'));
    });
  }

  submit(): void {
    this.form.requestSubmit();
  }
}

customElements.define('nono-form', NonoForm);