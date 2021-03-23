import { JSMLPageCycle } from '../base';
import { ClassProviderType, factoryAdapter } from '../core/factory';
import { JSMLUpdater } from '../core/updater';

interface JSPageDecoratorProps {
  key: string;
  providers: ClassProviderType[];
}

export type ClassPageType = (new(...args: any[]) => JSMLPageCycle);

export const JSPage = (props?: Partial<JSPageDecoratorProps>) => (
  (Target: ClassPageType) => {
    const updater = new JSMLUpdater();
    const providersInstance: unknown[] = [];
    Target.prototype.key = props?.key ?? null;

    if (props?.providers?.length) {
      providersInstance.push(
        ...factoryAdapter.getInstancesOf(props?.providers),
      );
    }

    Target.prototype.instance = new Target(updater, ...providersInstance);
  }
);
