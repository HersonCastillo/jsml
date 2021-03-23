import { Route } from '../interfaces';
import { ClassPageType } from './page.decorator';

export interface RoutesProps {
  routes: Route[];
  zoneId: string;
}

export const Routes = (props: RoutesProps) => (
  (Target: ClassPageType) => {
    Target.prototype.routing = { ...props } || null;
  }
);
