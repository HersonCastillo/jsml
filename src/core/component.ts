import { JSMLElement, JSMLElementEvent } from '../interfaces/js-element';

export class JSMLComponent {
  constructor(
    private element: JSMLElement | (() => JSMLElement),
  ) { }

  render(): HTMLElement {
    if (typeof this.element === 'function') {
      const CurrentComponent = this.element;
      this.element = CurrentComponent();
    }

    return this.createElement(this.element);
  }

  createElement(jsElement: JSMLElement): HTMLElement {
    const { classes, child, events, tag, style, ...rest } = jsElement;
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

    if (Object.keys(rest)?.length) {
      this.assignUnsigedProperties(domElement, rest);
    }

    if (child) {
      if (typeof child === 'string') {
        domElement.innerHTML = child;
      } else if (Array.isArray(child) && child.length) {
        for (const currentChild of child) {
          const currentChildElement = this.createElement(currentChild);
          this.appendChild(domElement, currentChildElement);
        }
      } else {
        const childElement = this.createElement(child as JSMLElement);
        this.appendChild(domElement, childElement);
      }
    }

    return domElement;
  }

  appendChild(element: HTMLElement, node: HTMLElement | Node): void {
    if (element && node) {
      element.appendChild(node);
    }
  }

  assignStyle(element: HTMLElement, style: Partial<CSSStyleDeclaration>): void {
    if (element && style) {
      for (const styleElement in style) {
        if (style[styleElement]) {
          element.style[styleElement] = style[styleElement]!;
        }
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

  assignEvents(element: HTMLElement, events: JSMLElementEvent[]): void {
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
        if (props[prop]) {
          element.setAttribute(prop, String(props[prop]));
        }
      }
    }
  }
}
