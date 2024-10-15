import threads from "worker_threads";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

if (threads.isMainThread) {
  let num = 0;
  const worker = new threads.Worker(__filename);
  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      num++;
    }
    worker.on("message", (message) => {
      if (message === "increment") {
        num++;
      } else if (message === "done") {
        console.log(num);
      }
    });
  });
} else {
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage("increment");
  }
  threads.parentPort.postMessage("done");
}
