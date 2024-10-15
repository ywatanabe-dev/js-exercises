import * as threads from "worker_threads";
/*
jestから呼び出す際はcommon jsとして扱われるため、コメントアウトする
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
*/

export class ThreadPool {
  #queueSize; // キューの最大長
  #numberOfThreads; // スレッドの最大数
  #queue; // 待ちコマンド(タスク)を保持するキュー
  #isStarted; // スレッドプールが開始済みか
  #waitThreads; // キューにコマンド(タスク)が追加されるのを待つスレッドのリスト
  #waitCommands; // キューに空きが出るのを待つコマンド(タスク)のリスト
  #workers; // 各スレッド(worker)を参照するためのリスト

  constructor(queueSize, numberOfThreads) {
    if (queueSize === 0 || numberOfThreads === 0) {
      throw new Error();
    }
    this.#queueSize = queueSize;
    this.#numberOfThreads = numberOfThreads;
    this.#isStarted = false;
  }

  async start() {
    if (this.#isStarted) {
      throw new Error();
    }
    this.#isStarted = true;
    this.#queue = [];
    this.#waitThreads = [];
    this.#waitCommands = [];
    this.#workers = [];
    for (let i = 0; i < this.#numberOfThreads; i++) {
      // スレッドを立ち上げる
      const worker = new threads.Worker(`${__dirname}/threads.js`);
      // ポートの片側を転送
      worker.postMessage({ name: "start" });
      await new Promise((complete) => {
        worker.on("message", async (message) => {
          if (message !== "start" && message !== "done") {
            // 想定外のメッセージは無視
            return;
          }
          if (this.#queue.length === 0) {
            await new Promise((resolve) => {
              // キューが空なら、新たなコマンド(タスク)が追加されるまで待つ
              this.#waitThreads.push(resolve);
              // 開始時点で全てのスレッドを待機状態にしておく
              if (message === "start") complete();
            });
          }
          const command = this.#queue.shift();
          // キューに空きがでたので、待機状態のコマンド(タスク)をキューに追加する
          const waitCommand = this.#waitCommands.shift();
          if (waitCommand !== undefined) {
            waitCommand();
          }
          if (command.name === "stop") {
            // スレッドプールを停止するコマンドが呼ばれたら、
            // 各スレッドに終了を通知する
            worker.postMessage({
              name: command.name,
            });
          } else {
            // タスクをスレッドに送信する
            worker.postMessage({
              name: command.name,
              data: command.task.data,
              run: command.task.run.toString(),
              id: i,
            });
          }
        });
      });
      this.#workers.push(worker);
    }
    return this.#workers;
  }

  async stop() {
    if (!this.#isStarted) {
      throw new Error();
    }
    this.#isStarted = false;

    const stopPromises = [];
    // 各スレッドが停止すると満たされるpromiseを作成
    for (let i = 0; i < this.#numberOfThreads; i++) {
      stopPromises.push(
        new Promise((resolve) => {
          this.#workers[i].on("exit", () => {
            resolve();
          });
        })
      );
    }

    for (let i = 0; i < this.#numberOfThreads; i++) {
      // 各スレッドに停止コマンドを送る
      this.#addCommand({ name: "stop" });
    }

    // 全てのスレッドが停止するまで待つ
    await Promise.all(stopPromises);

    this.#queue = null;
    this.#waitThreads = null;
    this.#waitCommands = null;
    this.#workers = null;
  }

  async #addCommand(command) {
    return new Promise((resolve) => {
      if (this.#queue.length < this.#queueSize) {
        this.#queue.push(command);
        // キューにコマンドが追加されたので、待機状態のスレッドを動かす
        const waitThread = this.#waitThreads.shift();
        if (waitThread !== undefined) {
          waitThread();
        }
        resolve();
      } else {
        // キューに空きが出た時にキューにコマンドを追加し、
        // その後promiseが満たされる
        this.#waitCommands.push(() => {
          this.#queue.push(command);
          resolve();
        });
      }
    });
  }

  // スレッドプールにタスクを追加する関数
  // taskオブジェクトは、以下の要件を満たす必要がある
  // - dataプロパティを持つ
  // - async (data, id) => {}形式のrunプロパティ(アロー関数)を持つ
  // 送り先のスレッドでは、dataプロパティを引数に入れてrun関数を実行する(idはスレッド番号)
  async dispatch(task) {
    if (!this.#isStarted || task === null) {
      throw new Error();
    }
    return this.#addCommand({ name: "task", task });
  }
}

/*
const tp = new ThreadPool(1, 1);
const sharedBuffer = new SharedArrayBuffer(2);
const sharedArray = new Uint16Array(sharedBuffer);
await tp.start();
for (let i = 0; i < 100; i++) {
  await tp.dispatch({
    data: sharedArray,
    run: (data, id) => {
      Atomics.add(data, 0, 1);
    },
  });
}
await tp.stop();
console.log(sharedArray);
*/
