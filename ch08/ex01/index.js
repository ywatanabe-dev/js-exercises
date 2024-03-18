// 引数：二つの引数があるため、()をつける必要がある
// 返り値：一つの式にまとめられるため、{}は必要なし
export const repeatChar = (n, c) =>
  [...Array(n)].map(() => {
    console.log(c);
    return c;
  });

// 引数：引数は一つのため、()をつける必要なし
// 返り値：一つの式にまとめられるため、{}は必要なし
// prettier-ignore
export const squared = x => x ** 2;

// 引数：引数なしの関数のため、()をつける必要がある
// 返り値：一つの式にまとめられるため、{}は必要なし
export const getNow = () => Object({ now: Date.now() });
