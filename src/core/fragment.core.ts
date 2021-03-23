import { Component } from '../interfaces';
import { ComponentResolver } from './component.core';

export class PageFragment {
  constructor(
    private components: Component[],
  ) { }

  render(): DocumentFragment {
    const fragment = document.createDocumentFragment();

    for (const component of this.components) {
      fragment.appendChild(new ComponentResolver(component).render());
    }

    return fragment;
  }
}
