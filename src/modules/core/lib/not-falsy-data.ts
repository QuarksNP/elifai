export function notFalsyObjectData<T extends Partial<Record<string, unknown>>>(
  data: T,
): Required<T> {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid data');
  }

  const notMutableData = { ...data } as Required<T>;

  const keys = Object.keys(notMutableData) as (keyof T)[];

  keys.forEach((key) => {
    const hasOwn = Object.hasOwn(notMutableData, key);

    if (!hasOwn) {
      notMutableData[key] = ' ' as T[keyof T];
    }
  });

  return notMutableData;
}
