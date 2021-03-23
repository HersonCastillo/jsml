export type ClassProviderType = (new(...args: any[]) => void | null | undefined | unknown);

export class FactoryResolver {
  static instances: unknown[] = [];

  addInstance(Provider: ClassProviderType): unknown {
    const instanceMap = FactoryResolver.instances.find(
      (CurrentInstance) => CurrentInstance instanceof Provider,
    );

    if (!instanceMap) {
      const providers: unknown[] = Provider?.prototype?.instances ?? [];
      const providerInstance = new Provider(...providers);
      FactoryResolver.instances.push(providerInstance);

      return providerInstance;
    }

    return instanceMap;
  }

  getInstance(Provider: ClassProviderType): unknown | null {
    return FactoryResolver.instances.find(
      (CurrentInstance) => CurrentInstance instanceof Provider,
    );
  }

  getInstancesOf(Providers: ClassProviderType[]): unknown[] {
    const providersInstance: unknown[] = [];
    for (const Provider of Providers) {
      const providerInstance = this.getInstance(Provider);
      if (!providerInstance) {
        const newestProviderInstance = this.addInstance(Provider);
        providersInstance.push(newestProviderInstance);
      } else {
        providersInstance.push(providerInstance);
      }
    }

    return providersInstance;
  }

  get instances(): unknown[] {
    return FactoryResolver.instances;
  }
}

export const factoryAdapter = new FactoryResolver();
