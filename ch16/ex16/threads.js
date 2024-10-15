import threads from "worker_threads";

threads.parentPort.on("message", async ({ name, data, run, id }) => {
  if (name === "start") {
    threads.parentPort.postMessage("start");
  }
  if (name === "stop") {
    // スレッドを停止する
    process.exit(0);
  }
  if (name === "task") {
    const fn = eval(run);
    await fn(data, id);
    // タスクの実行が完了したらメインスレッドに返信する
    threads.parentPort.postMessage("done");
  }
});
