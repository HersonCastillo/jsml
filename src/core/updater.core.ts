import { Component } from '../interfaces';
import { ComponentResolver } from './component.core';

export class Updater {
  update(child: Component) {
    const element = document.querySelector(`[key="${child?.key}"]`);

    if (element) {
      const component = new ComponentResolver(child).render();
      element.replaceWith(component);
    }
  }

  updateChildren(children: Component[]) {
    for (const child of children) {
      this.update(child);
    }
  }
}
