export interface JSMLElementEvent {
  name: string;
  handler: EventListenerOrEventListenerObject;
}

export interface JSMLElement {
  tag: string;
  child?: JSMLElement | JSMLElement[] | string;
  events?: JSMLElementEvent[];
  classes?: string[];
  style?: Partial<CSSStyleDeclaration>;
  key?: string;
  [htmlElementProp: string]: any;
}
