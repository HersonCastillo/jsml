export interface ComponentEvent {
  name: string;
  handler: EventListenerOrEventListenerObject;
}

export interface Component {
  tag: string;
  child?: Component | Component[] | string;
  events?: ComponentEvent[];
  classNames?: string[];
  style?: Partial<CSSStyleDeclaration>;
  key?: string;
  [htmlElementProp: string]: any;
}
