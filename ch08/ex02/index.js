// O(log n)で計算する
// ループ版の実装
export const expLoop = (x, n) => {
  const memo = [];
  let pow = x;
  for (let i = 1; i <= n; i *= 2, pow *= pow) {
    memo.push(pow);
  }
  let result = 1;
  for (let i = 0; n > 0; i++, n = (n - (n % 2)) / 2) {
    if (n % 2 === 1) {
      result *= memo[i];
    }
  }
  return result;
};

// O(log n)で計算する
// 再帰版の実装
export const expRecursive = (x, n) => {
  const memo = [];
  let pow = x;
  for (let i = 1; i <= n; i *= 2, pow *= pow) {
    memo.push(pow);
  }
  return (function f(n, i = 0, result = 1) {
    if (memo.length < i) {
      return result;
    }
    return n % 2 === 1
      ? f((n - (n % 2)) / 2, i + 1, memo[i] * result)
      : f((n - (n % 2)) / 2, i + 1, result);
  })(n);
};
