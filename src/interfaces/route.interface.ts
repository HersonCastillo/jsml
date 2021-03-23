import { ClassPageType } from '../decorators';

export interface Route {
  Page: ClassPageType;
  default?: boolean;
  path: string;
  onLoad?: (route?: Route) => boolean;
}
