import { PageArguments } from "../interfaces/page-arguments";
import { PageElement } from "../interfaces/page-element";
import { Page } from "./page";

export class ChangeDetection {
  constructor(
    private page: Page,
    private pageFunction: ((args?: PageArguments) => PageElement) | PageElement,
  ) { }

  update() {
    const { renderContext } = this.page;
    renderContext(this.pageFunction as PageElement, this.page);
  }
}
