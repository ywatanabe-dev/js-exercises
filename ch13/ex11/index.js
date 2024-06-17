export async function retryWithExponentialBackoff(func, maxRetry) {
  // 仕様では1s = 1000msが初期値だが、1sで設定するとテストに時間がかかるため1msにしておく。
  let wait = 1;
  let retry = 0;
  const f = (err) =>
    new Promise((resolve, reject) => {
      if (retry >= maxRetry) {
        reject(err);
        return;
      }
      setTimeout(() => {
        wait *= 2;
        retry++;
        resolve(func().catch(f));
      }, wait);
    });
  return func().catch(f);
}
