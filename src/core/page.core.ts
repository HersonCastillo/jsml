import { PagePhase } from '../base';
import { ClassPageType, RoutesProps } from '../decorators';
import { Component } from '../interfaces';
import { PageFragment } from './fragment.core';
import { RoutingResolver } from './routing.core';

export class PageResolver {
  constructor(
    private page: ClassPageType,
    private zone: Element,
  ) { }

  render(): void {
    const pageInstance: PagePhase = this.page.prototype?.instance;
    const pageRouting: RoutesProps = this.page.prototype?.routing;

    if (pageInstance) {
      const elements: Component[] = pageInstance?.render() ?? [];
      if (pageInstance?.onStart) {
        pageInstance.onStart(pageInstance);
      }
      if (elements && elements.length) {
        const pageFragment = new PageFragment(elements);
        this.zone?.appendChild(pageFragment.render());
        if (pageInstance?.onRender) {
          pageInstance.onRender(pageFragment);
        }
        if (pageRouting) {
          const routeSystem = new RoutingResolver(pageRouting, this);
          routeSystem.start();
        }
      }
    }
  }

  renderContext(page: ClassPageType, zone: Element | null) {
    if (zone) {
      this.page = page;
      this.zone = zone;
      this.render();
    }
  }
}
