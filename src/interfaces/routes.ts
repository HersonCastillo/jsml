import { ClassPageType } from '../decorators';

export interface JSMLRoute {
  Page: ClassPageType;
  default?: boolean;
  path: string;
  onLoad?: (route: JSMLRoute) => boolean;
}
