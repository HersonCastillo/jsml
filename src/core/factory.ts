export type ClassProviderType = (new(...args: any[]) => any);

export class JSMLFactory {
  static instances: unknown[] = [];

  addInstance(Provider: ClassProviderType): unknown {
    const instanceMap = JSMLFactory.instances.find(
      (CurrentInstance) => CurrentInstance instanceof Provider,
    );

    if (!instanceMap) {
      const providers: unknown[] = Provider?.prototype?.instances ?? [];
      const providerInstance = new Provider(...providers);
      JSMLFactory.instances.push(providerInstance);

      return providerInstance;
    }

    return instanceMap;
  }

  getInstance(Provider: ClassProviderType): unknown | null {
    return JSMLFactory.instances.find(
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
    return JSMLFactory.instances;
  }
}

export const factoryAdapter = new JSMLFactory();
