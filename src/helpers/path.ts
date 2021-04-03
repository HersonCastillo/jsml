type PathProps = { [path: string]: string };

export const usePath = (): PathProps | null => {
  const { hash } = location;
  const descriptor = Object.getOwnPropertyDescriptor(window ?? globalThis, '$jsmlpath');

  if (descriptor && descriptor.value) {
    const currentPath = descriptor.value as string;
    const hashFragments = hash.split('/');
    const pathFragments = currentPath.split('/');

    const validation = (path: string) => path.startsWith(':');
    const idsProps = pathFragments
      .filter(validation)
      .map((fragment) => (fragment.replace(':', '')));
    const pathFlagPieces = pathFragments.map(validation);
    const allowedProps = hashFragments.filter((_, index) => pathFlagPieces[index]);

    let pathProps: PathProps | null = null;

    idsProps.forEach((id, index) => {
      pathProps = {
        ...pathProps,
        [id]: String(allowedProps[index]),
      };
    });

    return pathProps;
  }
  return null;
};
