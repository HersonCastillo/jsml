export interface JSElementEvent {
  name: string;
  handler: EventListenerOrEventListenerObject;
}

export interface JSElement {
  tag: string;
  child: JSElement | JSElement[] | string;
  events?: JSElementEvent[];
  classes?: string[];
  style?: CSSStyleDeclaration;
  [htmlElementProperty: string]: any;
}