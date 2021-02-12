import { IRoute } from "../interfaces/routes";
import { Page } from "./page";

export class Routing {
  
  private currentHash = location.hash;
  private currentRoute!: IRoute;

  constructor(private routes: IRoute[], private pageInstance: Page) {
    window.onhashchange = this.hashChangeEvent.bind(this);
  }

  start() {
    const currentRoute = this.manageCurrentHash();
    this.renderPage(currentRoute);
  }

  hashChangeEvent() {
    this.currentHash = location.hash;
    const currentRoute = this.manageCurrentHash();
    this.renderPage(currentRoute);
  }

  manageCurrentHash() {
    if (this.currentHash.length === 0) {
      location.href = "#";
      return null;
    }
    const route = this.currentHash.replace('#', '');
    return route.trim();
  }

  evaluateCleanZone(route: IRoute) {
    if (route) {
      const currentRoute = this.currentRoute;
      if (currentRoute) {
        return currentRoute.path !== route.path;
      } else {
        return true;
      }
    }
    return false;
  }

  cleanZone() {
    this.pageInstance.safeZone.innerHTML = "";
  }

  renderPage(currentPath: string | null) {
    const { routes } = this;
    const notFound = routes.find((route) => (route.path.includes('**')));
    const currentPage = routes.find((route) => (
      route.path.includes(currentPath!))
      || (Boolean(route.default) && !currentPath)
    );

    if (currentPage) {
      this.prepareRenderization(currentPage);
    } else if (notFound) {
      this.prepareRenderization(notFound);
    } else {
      throw Error('Wrong routing configuration');
    }
  }

  prepareRenderization(route: IRoute): void {
    const { page } = route;
      const renderStatus = this.evaluateCleanZone(route);
      this.currentRoute = route;
      if (renderStatus) {
        this.cleanZone();
        this.pageInstance.renderContext(page, this.pageInstance);
      }
  }
}
