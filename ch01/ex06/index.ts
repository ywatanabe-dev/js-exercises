/***
 * フィボナッチ数列のn番目を取得する関数
 */
export function fib(n: number): number {
  let f0 = 0; // fib(0)の値
  let f1 = 1; // fib(1)の値
  for (let i = 0; i < n; i++) {
    const tmp = f0;
    f0 = f1; // fib(i)の値をfib(i + 1)に更新
    f1 = tmp + f1; // fib(i + 1)の値をfib(i + 1) + fib(i)に更新
  }
  return f0; // fib(n)の値
}
