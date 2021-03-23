import { JSMLElement } from '../interfaces';
import { JSMLComponent } from './component';

export class JSMLUpdater {
  update(child: JSMLElement) {
    const element = document.querySelector(`[key=${child?.key}]`);

    if (element) {
      const component = new JSMLComponent(child).render();
      element.replaceWith(component);
    }
  }

  updateChildren(children: JSMLElement[]) {
    for (const child of children) {
      this.update(child);
    }
  }
}
