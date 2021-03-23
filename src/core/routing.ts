import { JSRoutesProps } from '../decorators';
import { JSMLRoute } from '../interfaces/routes';
import { JSMLPage } from './page';

export class JSMLRouting {
  private currentHash = location.hash;
  private currentRoute!: JSMLRoute;

  constructor(
    private routing: JSRoutesProps,
    private pageInstance: JSMLPage,
  ) {
    window.onhashchange = this.hashChangeEvent.bind(this);
  }

  start(): void {
    const currentRoute = this.manageCurrentHash();
    this.renderPage(currentRoute);
  }

  hashChangeEvent(): void {
    this.currentHash = location.hash;
    const currentRoute = this.manageCurrentHash();
    this.renderPage(currentRoute);
  }

  manageCurrentHash(): string | null {
    if (this.currentHash.length === 0) {
      location.href = '#';
      return null;
    }
    const route = this.currentHash.replace('#', '');
    return route.trim();
  }

  resolveZone(): HTMLElement | null {
    const { zoneId } = this.routing;
    return document.querySelector(zoneId);
  }

  evaluateCleanZone(route: JSMLRoute): boolean {
    if (route) {
      if (this.currentRoute) {
        return this.currentRoute.path !== route.path;
      }
      return true;
    }
    return false;
  }

  cleanZone() {
    const zone = this.resolveZone();
    if (zone) {
      zone.innerHTML = '';
    }
  }

  renderPage(currentPath: string | null) {
    const { routes } = this.routing;
    const notFound = routes.find((route) => route.path.includes('**'));
    const currentPage = routes.find(
      (route) =>
        route.path.includes(currentPath!)
        || (Boolean(route.default) && !currentPath),
    );

    if (currentPage) {
      this.prepareRenderization(currentPage);
    } else if (notFound) {
      this.prepareRenderization(notFound);
    }
  }

  prepareRenderization(route: JSMLRoute): void {
    const { Page, onLoad } = route;
    const renderStatus = this.evaluateCleanZone(route);
    const zone = this.resolveZone();
    this.currentRoute = route;
    if (renderStatus) {
      this.cleanZone();
      if (onLoad) {
        const onLoadResult = onLoad(route);
        if (onLoadResult) {
          this.pageInstance.renderContext(Page, zone!);
        }
      } else {
        this.pageInstance.renderContext(Page, zone!);
      }
    }
  }
}
