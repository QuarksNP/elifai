import type { IconName } from '../components/ui/icon';

export type Constructor<T = object> = new (...args: unknown[]) => T;

export type NavigateOptions = {
  name: string;
  href: string;
  icon?: IconName;
  subRoutes?: NavigateOptions[];
};

export type Action = (
  state: Awaited<State> | undefined,
  payload: FormData,
) => Promise<State | undefined>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type State = ServerActionResult<any>;

export type ServerActionResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      validationErrors: Record<string, string[]> | null;
      serverErrors: string | string[] | null;
    };
