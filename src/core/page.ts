import { JSMLPageCycle } from '../base';
import { ClassPageType, JSRoutesProps } from '../decorators';
import { JSMLElement } from '../interfaces';
import { JSMLPageFragment } from './fragment';
import { JSMLRouting } from './routing';

export class JSMLPage {
  constructor(
    private page: ClassPageType,
    private zone: HTMLElement,
  ) { }

  render(): void {
    const pageInstance: JSMLPageCycle = this.page.prototype?.instance;
    const pageRouting: JSRoutesProps = this.page.prototype?.routing;

    if (pageInstance) {
      const elements: JSMLElement[] = pageInstance?.render() ?? [];
      if (pageInstance?.onStart) {
        pageInstance.onStart(pageInstance);
      }
      if (elements && elements.length) {
        const pageFragment = new JSMLPageFragment(elements);
        this.zone.appendChild(pageFragment.render());
        if (pageInstance?.onRender) {
          pageInstance.onRender(pageFragment);
        }
        if (pageRouting) {
          const routeSystem = new JSMLRouting(pageRouting, this);
          routeSystem.start();
        }
      }
    }
  }

  renderContext(page: ClassPageType, zone: HTMLElement) {
    this.page = page;
    this.zone = zone;

    this.render();
  }
}
