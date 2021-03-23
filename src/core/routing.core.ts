import { Route } from '@i/route.interface';
import { RoutesProps } from '../decorators';
import { PageResolver } from './page.core';

export class RoutingResolver {
  private currentHash = location.hash;
  private currentRoute!: Route;

  constructor(
    private routing: RoutesProps,
    private pageInstance: PageResolver,
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

  evaluateCleanZone(route: Route): boolean {
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

  prepareRenderization(route: Route): void {
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
