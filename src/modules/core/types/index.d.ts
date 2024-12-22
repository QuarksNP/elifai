import type { IconName } from '../components/ui/icon';

export type Constructor<T = object> = new (...args: unknown[]) => T;

export type NavigateOptions = {
  name: string;
  href: string;
  icon?: IconName;
  subRoutes?: NavigateOptions[];
};
