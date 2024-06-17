/**
 * 指定された時間後に解決される Promise を返す
 * @param  {number}   msec    - 返り値の Promise を解決するまで待つ時間 (ミリ秒)
 * @return {Promise}  Promise - 指定時間後に解決される Promise
 */
export function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

/*
// 例: 1秒後に "A" と出力し、その2秒後に "B" と出力し、その3秒後に "C" と出力する
wait(1000)
  .then(() => console.log("A"))
  .then(() => wait(2000))
  .then(() => console.log("B"))
  .then(() => wait(3000))
  .then(() => console.log("C"));
*/

// 0, 1, 2, 3 秒待つ
export const wait0 = () => wait(0);
export const wait1 = () => wait(1000);
export const wait2 = () => wait(2000);
export const wait3 = () => wait(3000);

// ログ出力
export const log = (v) => console.log(v);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logA = (v) => console.log("A");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logB = (v) => console.log("B");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logC = (v) => console.log("C");

// 例外
export const errX = () => {
  throw new Error("X");
};
export const errY = () => {
  throw new Error("Y");
};
