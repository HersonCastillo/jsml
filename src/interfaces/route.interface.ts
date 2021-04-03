import { ClassPageType } from '../decorators';

export interface Route {
  page: Promise<ClassPageType>;
  default?: boolean;
  path: string;
  onLoad?: (route?: Route) => boolean;
}
