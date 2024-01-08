export function my_equals(a: number, b: number): boolean {
  if (Math.abs(a - b) < 10 ** -10) {
    return true;
  }
  return false;
}
