export function pop<T>(array: T[]): T[] {
  const new_array = [...array];
  new_array.pop();
  return new_array;
}

export function push<T>(array: T[], item: T): T[] {
  const new_array = [...array];
  new_array.push(item);
  return new_array;
}

export function shift<T>(array: T[]): T[] {
  const new_array = [...array];
  new_array.shift();
  return new_array;
}

export function unshift<T>(array: T[], item: T): T[] {
  const new_array = [...array];
  new_array.unshift(item);
  return new_array;
}

export function sort<T>(
  array: T[],
  fn: ((a: T, b: T) => number) | undefined
): T[] {
  const new_array = [...array];
  new_array.sort(fn);
  return new_array;
}
