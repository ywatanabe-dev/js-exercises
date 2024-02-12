export function bitCount(a: number): number {
  let i = 1;
  let count = 0;
  while (i) {
    if (a & i) count++;
    i = i << 1;
  }
  return count;
}
