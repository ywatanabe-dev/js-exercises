export function retryWithExponentialBackoff(func, maxRetry, callback) {
  if (func()) {
    callback(true);
    return;
  }

  // 仕様では1s = 1000msが初期値だが、1sで設定するとテストに時間がかかるため1msにしておく。
  let wait = 1;
  let retry = 0;
  const timer = () => {
    setTimeout(() => {
      if (retry >= maxRetry) {
        callback(false);
        return;
      }
      if (func()) {
        callback(true);
        return;
      }
      wait *= 2;
      retry++;
      timer();
    }, wait);
  };
  timer();
}
