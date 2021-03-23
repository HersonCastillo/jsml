import { JSMLRoute } from '../interfaces';
import { ClassPageType } from './page';

export interface JSRoutesProps {
  routes: JSMLRoute[];
  zoneId: string;
}

export const JSRoutes = (props: JSRoutesProps) => (
  (Target: ClassPageType) => {
    Target.prototype.routing = { ...props } || null;
  }
);
