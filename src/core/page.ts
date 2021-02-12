import { JSElement } from "../interfaces/js-element";
import { PageArguments } from "../interfaces/page-arguments";
import { PageElement } from "../interfaces/page-element";
import { IRoute } from "../interfaces/routes";
import { ChangeDetection } from "./change-detection";
import { Component } from "./component";
import { Routing } from "./routing";

export class Page {

  constructor(
    private zone: HTMLElement,
    private page: PageElement | ((args?: PageArguments) => PageElement),
    private args?: PageArguments,
  ) {}

  get safeZone(): HTMLElement {
    return this.zone;
  }

  manageRoutes(routes: IRoute[]) {
    if (routes && routes.length) {
      const routing = new Routing(routes, this);
      routing.start();
    }
  }

  appendChilds(element: HTMLElement, childs: HTMLElement[]): void {
    if (childs && childs.length) {
      for (const child of childs) {
        element.appendChild(child);
      }
    }
  }

  components(components: JSElement[]) {
    if (components && components.length) {
      return components.map((component) => (
        new Component(component).render()
      ));
    }
    return [];
  }

  applyBodyComponents(body: JSElement[], zone: HTMLElement) {
    const bodyComponents = [];
    
    if (body && body.length) {
      bodyComponents.push(...this.components(body));
    
      if (bodyComponents.length) {
        this.appendChilds(zone, bodyComponents);
      }
    }

    return bodyComponents;
  }

  updateDocumentTitle(title: string) {
    /**
     * Assuming that the <title> tag will exist in whatever situation
     */
    const domTitleElement = document.querySelector('title') as HTMLElement;
    domTitleElement.innerText = title;
  }

  renderContext(pageElement: PageElement, pageInstance: Page): void {
    const context = new Page(pageInstance.safeZone, pageElement, {
      changeDetection: new ChangeDetection(this, pageElement)
    });

    context.render();
  }

  render(routing = false): HTMLElement[] {
    if (typeof this.page === 'function') {
      const PageComponent = this.page;
      this.page = PageComponent({
        ...this.args,
        changeDetection: new ChangeDetection(this, PageComponent)
      });
    }

    const { body, title, routes } = this.page;

    const components = this.applyBodyComponents(body, this.zone);

    if (title && title.length) {
      this.updateDocumentTitle(title);
    }

    if (!routing && routes && routes.length) {
      this.manageRoutes(routes);
    }

    return components;
  }
}
