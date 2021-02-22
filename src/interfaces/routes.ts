import { PageElement } from './page-element';

export interface IRoute {
  page: PageElement;
  default: boolean;
  path: string;
  onLoad: () => boolean;
  onLeave: () => void;
}
