import { NonoBase } from "./NonoBase.js";

export class NonoTable extends NonoBase {
  static styles = NonoBase.css`
    .nono-table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--font-family);
      font-size: var(--font-size-base);
    }

    .nono-table th,
    .nono-table td {
      padding: var(--spacing-sm);
      border: 1px solid #ccc;
      text-align: left;
    }

    .nono-table th {
      background-color: var(--light-color);
      font-weight: 600;
    }

    .nono-table tr:nth-child(even) {
      background-color: var(--light-color);
    }
  `;

  private table: HTMLTableElement;

  constructor() {
    super();
    this.shadowRoot!.adoptedStyleSheets.push(NonoTable.styles);
    this.table = document.createElement("table");
    this.table.classList.add("nono-table");
    this.shadowRoot!.appendChild(this.table);
    this.updateTable();
  }

  static get observedAttributes(): string[] {
    return ["headers", "data"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (oldValue !== newValue) {
      this.updateTable();
    }
  }

  private updateTable(): void {
    const headers = JSON.parse(
      this.getAttribute("headers") || "[]",
    ) as string[];
    const data = JSON.parse(this.getAttribute("data") || "[]") as string[][];

    this.table.innerHTML = "";

    if (headers.length > 0) {
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      this.table.appendChild(thead);
    }

    if (data.length > 0) {
      const tbody = document.createElement("tbody");
      data.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => {
          const td = document.createElement("td");
          td.innerHTML = cell;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      this.table.appendChild(tbody);
    }
  }
}

customElements.define("nono-table", NonoTable);
