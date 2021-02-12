import { JSElement } from "./js-element";
import { IRoute } from "./routes";

export interface PageElement {
  title?: string;
  body: JSElement[];
  routes?: IRoute[];
}
