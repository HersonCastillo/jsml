import { ClassProviderType, factoryAdapter } from '../core/factory.core';
import { Updater } from '../core/updater.core';
import { PagePhase } from '../base';

interface PageDecoratorProps {
  providers: ClassProviderType[];
  title: string;
}

export type ClassPageType = (new(...args: any[]) => PagePhase);

export const Page = (props?: Partial<PageDecoratorProps>) => (
  (Target: ClassPageType) => {
    const updater = new Updater();
    const providersInstance: unknown[] = [];

    if (props?.providers?.length) {
      providersInstance.push(
        ...factoryAdapter.getInstancesOf(props?.providers),
      );
    }

    if (props?.title) {
      const titleTag = document.querySelector('title');
      Target.prototype.title = props?.title ?? null;
      if (titleTag) {
        titleTag.innerHTML = props?.title;
      }
    }

    Target.prototype.instance = new Target(updater, ...providersInstance);
  }
);
