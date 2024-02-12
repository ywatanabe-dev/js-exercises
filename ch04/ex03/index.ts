/**
 * 二つの整数の和をビット演算で求める関数.
 * 返り値が-(2 ** 31) ~ 2 ** 31 - 1の範囲であれば正しく計算できる.
 * @param a
 * @param b
 * @returns
 */
export function add(a: number, b: number): number {
  let i = 1;
  let res = 0;
  let n = 0;
  while (i) {
    const x = a & i ? 1 : 0;
    const y = b & i ? 1 : 0;
    if (x ^ y ^ n) res |= i;
    n = (x & y) | (y & n) | (x & n);
    i = i << 1;
  }
  return res;
}

export function sub(a: number, b: number): number {
  return add(add(a, ~b), 1);
}
