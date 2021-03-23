import { ClassProviderType, factoryAdapter } from '../core/factory';

interface JSSingletonProps {
  providers: ClassProviderType[];
}

export const JSSingleton = (props?: Partial<JSSingletonProps>) => (
  (Target: ClassProviderType) => {
    factoryAdapter.addInstance(Target);

    if (props?.providers?.length) {
      Target.prototype.instances = factoryAdapter.getInstancesOf(props.providers);
    }
  }
);
