import { NonoBase } from './NonoBase.js';
export declare class NonoInput extends NonoBase {
    private input;
    private label;
    private error;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private updateInput;
    private addInputStyles;
    private addEventListeners;
    get value(): string;
    set value(val: string);
}
//# sourceMappingURL=NonoInput.d.ts.map