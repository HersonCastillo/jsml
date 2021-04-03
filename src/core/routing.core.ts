import { Route } from '../interfaces/route.interface';
import { RoutesProps } from '../decorators';
import { PageResolver } from './page.core';
import { ref } from '../helpers';

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
    return ref(zoneId, 'router-outlet') as HTMLElement;
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
    const slashLength = currentPath?.split('/').length ?? 0;
    const notFound = routes.find((route) => route.path.includes('**'));
    if (slashLength === 1) {
      const currentPage = routes.find(
        (route) =>
          route.path.includes(currentPath!)
          || (Boolean(route.default) && !currentPath),
      );

      this.setRenderization(currentPage, notFound);
    } else if (slashLength > 1 && currentPath) {
      const pathFragments = currentPath.split('/');

      const currentPage = routes.find((route) => {
        const routeFragments = route.path.split('/');
        if (routeFragments.length === pathFragments.length) {
          const withExpressions = routeFragments.map((routeFragment) => {
            if (routeFragment.startsWith(':')) {
              return routeFragment.replace(
                new RegExp('^[:a-zA-Z]{1,}$', 'g'),
                '^[a-zA-Z0-9_-]{1,}$',
              );
            }
            return routeFragment;
          });
          let routeCount = 0;
          withExpressions.forEach((expression, index) => {
            const regularExpression = new RegExp(expression, 'gi');
            if (regularExpression.test(pathFragments[index])) {
              routeCount++;
            }
          });
          return routeCount === routeFragments.length;
        }
        return false;
      });

      this.setRenderization(currentPage, notFound);
    }
  }

  setRenderization(renderRoute?: Route | null, notFound?: Route): void {
    if (renderRoute) {
      this.prepareRenderization(renderRoute);
    } else if (notFound) {
      this.prepareRenderization(notFound);
    }
  }

  prepareRenderization(route: Route): void {
    const { Page, onLoad, path } = route;
    const renderStatus = this.evaluateCleanZone(route);
    const zone = this.resolveZone();
    this.currentRoute = route;

    if (Page.prototype?.title) {
      const titleTag = document.querySelector('title');
      if (titleTag) {
        titleTag.innerHTML = Page.prototype?.title;
      }
    }

    if (window ?? globalThis) {
      Object.defineProperty(window ?? globalThis, '$jsmlpath', {
        value: path,
        writable: true,
      });
    }

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
