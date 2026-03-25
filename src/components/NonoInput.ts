import { NonoBase } from './NonoBase.js';

export class NonoInput extends NonoBase {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private error: HTMLSpanElement;

  constructor() {
    super();
    this.label = document.createElement('label');
    this.input = document.createElement('input');
    this.error = document.createElement('span');
    this.error.classList.add('error');
    this.updateInput();
    this.shadowRoot!.appendChild(this.label);
    this.shadowRoot!.appendChild(this.input);
    this.shadowRoot!.appendChild(this.error);
    this.addInputStyles();
    this.addEventListeners();
  }

  static get observedAttributes(): string[] {
    return ['type', 'label', 'placeholder', 'required', 'value', 'error'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this.updateInput();
    }
  }

  private updateInput(): void {
    const type = this.getAttribute('type') || 'text';
    const label = this.getAttribute('label') || '';
    const placeholder = this.getAttribute('placeholder') || '';
    const required = this.hasAttribute('required');
    const value = this.getAttribute('value') || '';
    const error = this.getAttribute('error') || '';

    this.input.type = type;
    this.input.placeholder = placeholder;
    this.input.required = required;
    this.input.value = value;
    this.label.textContent = label;
    this.error.textContent = error;
    this.error.style.display = error ? 'block' : 'none';
  }

  private addInputStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .nono-input-container {
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

      input {
        font-family: var(--font-family);
        font-size: var(--font-size-base);
        padding: var(--spacing-sm);
        border: 1px solid #ccc;
        border-radius: var(--border-radius);
        outline: none;
        transition: border-color 0.2s;
      }

      input:focus {
        border-color: var(--primary-color);
      }

      input:invalid {
        border-color: var(--danger-color);
      }

      .error {
        font-family: var(--font-family);
        font-size: 12px;
        color: var(--danger-color);
        display: none;
      }
    `;
    this.shadowRoot!.appendChild(style);
  }

  private addEventListeners(): void {
    this.input.addEventListener('input', () => {
      this.dispatchEvent(new CustomEvent('input', { detail: { value: this.input.value } }));
    });
    this.input.addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('change', { detail: { value: this.input.value } }));
    });
  }

  get value(): string {
    return this.input.value;
  }

  set value(val: string) {
    this.input.value = val;
    this.setAttribute('value', val);
  }
}

customElements.define('nono-input', NonoInput);