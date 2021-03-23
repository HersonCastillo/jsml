import { ClassProviderType, factoryAdapter } from '../core/factory';

interface JSSingletonProps {
  providers: ClassProviderType[];
}

export const JSSingleton = (props?: Partial<JSSingletonProps>) => (
  (_: ClassProviderType) => {
    if (props?.providers?.length) {
      for (const Provider of props.providers) {
        factoryAdapter.addInstance(Provider);
      }
      _.prototype.instances = factoryAdapter.getInstancesOf(props.providers);
    }
  }
);
