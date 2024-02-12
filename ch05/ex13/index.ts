export function* fib() {
  let f0 = 0; // fib(0)の値
  let f1 = 1; // fib(1)の値
  let i = 0;
  while (i < 10) {
    const tmp = f0;
    f0 = f1; // fib(i)の値をfib(i + 1)に更新
    f1 = tmp + f1; // fib(i + 1)の値をfib(i + 1) + fib(i)に更新
    yield f0;
    i++;
  }
}
