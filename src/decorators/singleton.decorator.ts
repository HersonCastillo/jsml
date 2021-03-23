import { ClassProviderType, factoryAdapter } from '@c/factory.core';

interface SingletonProps {
  providers: ClassProviderType[];
}

export const Singleton = (props?: Partial<SingletonProps>) => (
  (Target: ClassProviderType) => {
    factoryAdapter.addInstance(Target);

    if (props?.providers?.length) {
      Target.prototype.instances = factoryAdapter.getInstancesOf(props.providers);
    }
  }
);
