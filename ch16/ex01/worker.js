import { parentPort } from "worker_threads";

// フィボナッチ数を計算する関数
const fib = (n) => {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
};

// メインスレッドからタスクを受け取り、計算結果を返す
parentPort.on("message", (task) => {
  if (task !== null) {
    const result = fib(task);
    parentPort.postMessage(result);
  } else {
    parentPort.postMessage(null); // 終了通知
  }
});
