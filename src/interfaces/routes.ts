import { PageElement } from './page-element';
import { PageArguments } from './page-arguments';

export interface IRoute {
  page: PageElement | ((args?: PageArguments) => PageElement);
  default?: boolean;
  path: string;
  onLoad?: (route: IRoute) => boolean;
  onLeave?: (route: IRoute) => void;
}
