export function sort<T>(
  array: T[],
  compare: (lhs: T, rhs: T) => number = (lhs, rhs) =>
    lhs < rhs ? -1 : lhs > rhs ? +1 : 0
) {
  sort_sub(array, 0, array.length - 1, compare);
}

/**
 * in-placeで実装
 */
function sort_sub<T>(
  array: T[],
  start: number,
  end: number,
  compare: (lhs: T, rhs: T) => number = (lhs, rhs) =>
    lhs < rhs ? -1 : lhs > rhs ? +1 : 0
) {
  if (start >= end) return;

  let i = start + 1;
  let j = end;
  const pivot = array[start];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    while (i <= j && compare(array[i], pivot) < 0) i++;
    while (i < j && compare(array[j], pivot) > 0) j--;
    if (i >= j) break;
    [array[i], array[j]] = [array[j], array[i]];
    i++;
    j--;
  }
  [array[i - 1], array[start]] = [array[start], array[i - 1]];

  sort_sub(array, start, i - 2, compare);
  sort_sub(array, i, end, compare);
}
