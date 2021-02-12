import { ComponentArguments } from '../interfaces/component-arguments';
import { JSElement, JSElementEvent } from '../interfaces/js-element';

export class Component {

  constructor(
    private element: JSElement | ((args?: ComponentArguments) => JSElement),
    private args?: ComponentArguments,
  ) {}

  render(): HTMLElement {
    if (typeof this.element === 'function') {
      const CurrentComponent = this.element;
      this.element = CurrentComponent(this.args);
    }

    return this.createElement(this.element);
  }

  createElement(jsElement: JSElement): HTMLElement {
    const {
      classes,
      child,
      events,
      tag,
      style,
      ...rest
    } = jsElement;
    const domElement = document.createElement(tag);

    if (style) {
      this.assignStyle(domElement, style);
    }
    
    if (classes) {
      this.assignClasses(domElement, classes);
    }

    if (events && events.length) {
      this.assignEvents(domElement, events);
    }
    
    if (Object.keys(rest).length) {
      this.assignUnsigedProperties(domElement, rest);
    }

    if (child) {
      if (typeof child === 'string') {
        domElement.innerHTML = child;
      } else {
        if (Array.isArray(child) && child.length) {
          for (const currentChild of child) {
            const currentChildElement = this.createElement(currentChild);
            this.appendChild(domElement, currentChildElement);
          }
        } else {
          const childElement = this.createElement(child as JSElement);
          this.appendChild(domElement, childElement);
        }
      }
    }

    return domElement;
  }

  appendChild(element: HTMLElement, node: HTMLElement | Node): void {
    if (element && node) {
      element.appendChild(node);
    }
  }

  assignStyle(element: HTMLElement, style: CSSStyleDeclaration): void {
    if (element && style) {
      for (const styleElement in style) {
        element.style[styleElement] = style[styleElement];
      }
    }
  }

  assignClasses(element: HTMLElement, classes: string[]): void {
    if (element && classes && classes.length) {
      for (const className of classes) {
        if (element && element.classList) {
          element.classList.add(className);
        }
      }
    }
  }

  assignEvents(element: HTMLElement, events: JSElementEvent[]): void {
    if (element && events && events.length) {
      for (const event of events) {
        const { name, handler } = event;
        element.addEventListener(name, handler);
      }
    }
  }

  assignUnsigedProperties(element: HTMLElement, props: any): void {
    if (element) {
      for (const prop in props) {
        element.setAttribute(prop, String(props[prop]));
      }
    }
  }
}
