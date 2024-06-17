setTimeout(() => console.log("Hello, world!"), 1000);

async function longRunningButAsyncFunction() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // NOTE: ループの中で凄く時間のかかる処理 (大きい行列の処理とか...) を実行していると想像して下さい。
    // (適当な値で await するのが目的であり null に理由はない)
    await null;
  }
}

longRunningButAsyncFunction();
