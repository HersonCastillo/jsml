import { JSMLElement } from '../interfaces';
import { JSMLComponent } from './component';

export class JSMLPageFragment {
  constructor(
    private components: JSMLElement[],
  ) { }

  render(): DocumentFragment {
    const fragment = document.createDocumentFragment();

    for (const component of this.components) {
      fragment.appendChild(new JSMLComponent(component).render());
    }

    return fragment;
  }
}
