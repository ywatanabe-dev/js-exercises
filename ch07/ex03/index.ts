export function sum(array: number[] | undefined): number {
  return array?.reduce((x, y) => x + y, 0) ?? 0;
}

export function join(
  array: (string | null)[],
  delimiter: string | null = ","
): string {
  return array
    .map((x) => x ?? "")
    .reduce((x, y) => x + String(delimiter) + y, "")
    .substring(String(delimiter)?.length);
}

export function reverse<T>(array: T[]): T[] {
  return array
    .map((x) => {
      return [x];
    })
    .reduce((x, y) => y.concat(x), []);
}

export function every<T>(
  array: T[],
  test: (elem: T, index: number, arr: T[]) => boolean
): boolean {
  return array.map((x, i) => test(x, i, array)).reduce((x, y) => x && y, true);
}

export function some<T>(
  array: T[],
  test: (elem: T, index: number, arr: T[]) => boolean
): boolean {
  return array.map((x, i) => test(x, i, array)).reduce((x, y) => x || y, false);
}
