import { ThreadPool } from "./index.js";
import { spawn } from "child_process";
import * as threads from "worker_threads";

// 非常に重いテストのため、
// testPathIgnorePatterns: ["/ch16/ex16/"]を指定して普段は実行しないようにしている
// 実行時はjest.config.tsの上記の行をコメントアウトすること

// 実行中のnodeプロセスのスレッド数を取得
async function activeThreadCount() {
  const pid = process.pid;
  return await new Promise((resolve, reject) => {
    // 特定のプロセスのスレッド一覧を取得
    // macOSのみ動作する？
    const ps = spawn("ps", ["-M", pid]);
    let output = "";
    ps.stdout.on("data", (data) => {
      output += data.toString();
    });

    ps.stderr.on("data", () => {
      reject();
    });

    ps.stdout.on("end", () => {
      const lines = output.trim().split("\n");
      // ヘッダーの一行分を取り除く
      const threadCount = lines.length - 1;
      resolve(threadCount);
    });
  });
}

// busyなスレッドの数をカウントする
async function runnableThreadCount() {
  const pid = process.pid;
  return await new Promise((resolve, reject) => {
    // 特定のプロセスのスレッド一覧を取得
    // macOSのみ動作する？
    const ps = spawn("ps", ["-M", pid]);
    let output = "";
    ps.stdout.on("data", (data) => {
      output += data.toString();
    });

    ps.stderr.on("data", () => {
      reject();
    });

    ps.stdout.on("end", () => {
      const lines = output.trim().split("\n");
      const runnable = lines
        .slice(1)
        .map((line) => {
          const regex = /\s+([IRSTUZ])[+<>AELNSsVWX]*\s/;
          const match = line.match(regex);
          if (match) {
            const stat = match[1];
            return stat === "R";
          }
          return false;
        })
        .filter((value) => value === true);
      resolve(runnable.length);
    });
  });
}

class CounterTask {
  constructor() {
    const sharedBuffer = new SharedArrayBuffer(4);
    this.data = new Int32Array(sharedBuffer);
    this.data.set([0]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.run = async (data, id) => {
      Atomics.add(data, 0, 1);
      Atomics.notify(data, 0);
    };
  }

  async waitForRunCount(count) {
    return new Promise((resolve) => {
      const worker = new threads.Worker(`${__dirname}/threads.js`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const run = async (data, id) => {
        for (;;) {
          const runCount = Atomics.load(data.runCount, 0);
          if (runCount >= data.count) {
            break;
          }
          Atomics.wait(data.runCount, 0, runCount);
        }
        process.exit(0);
      };
      worker.postMessage({
        name: "task",
        data: { runCount: this.data, count },
        run: run.toString(),
      });
      worker.on("exit", () => {
        resolve();
      });
    });
  }
}

class LatchTask {
  constructor(count) {
    const sharedBuffer = new SharedArrayBuffer(4);
    const sharedArray = new Int32Array(sharedBuffer);
    sharedArray.set([0]);
    this.data = { currentCount: sharedArray, latchCount: count };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.run = (data, id) => {
      const latchCount = data.latchCount;
      Atomics.add(data.currentCount, 0, 1);
      Atomics.notify(data.currentCount, 0);
      for (;;) {
        const currentCount = Atomics.load(data.currentCount, 0);
        if (currentCount >= latchCount) {
          break;
        }
        Atomics.wait(data.currentCount, 0, currentCount);
      }
    };
  }

  async waitForLatchCount() {
    return new Promise((resolve) => {
      const worker = new threads.Worker(`${__dirname}/threads.js`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const run = async (data, id) => {
        const latchCount = data.latchCount;
        for (;;) {
          const currentCount = Atomics.load(data.currentCount, 0);
          if (currentCount >= latchCount) {
            break;
          }
          Atomics.wait(data.currentCount, 0, currentCount);
        }
        process.exit(0);
      };
      worker.postMessage({
        name: "task",
        data: this.data,
        run: run.toString(),
      });
      worker.on("exit", () => {
        resolve();
      });
    });
  }
}

describe("thread pool", () => {
  let DEFAULT_NUMBER_OF_THREADS = 0;
  beforeAll(async () => {
    // デフォルトで立ち上げるスレッド数
    // workerを立ち上げると、その分スレッド数も多くなる
    DEFAULT_NUMBER_OF_THREADS = await activeThreadCount();
  });

  test("testConstructorIllegalArgumentFirst", () => {
    expect(() => new ThreadPool(0, 1)).toThrow();
  });

  test("testConstructorIllegalArgumentSecond", () => {
    expect(() => new ThreadPool(1, 0)).toThrow();
  });

  test("testStartAndStop", async () => {
    const tp = new ThreadPool(1, 1);
    await tp.start();
    await tp.stop();
  });

  test("testRepeatSimultaneousStarts", async () => {
    for (let i = 0; i < 50; i++) {
      const tp = new ThreadPool(1, 1);

      let oks = 0;
      const invoke = async () => {
        try {
          await tp.start();
          oks++;
        } catch {
          // passthrough
        }
      };
      await Promise.all([invoke(), invoke()]);
      await tp.stop();
      expect(oks).toStrictEqual(1);
    }
  });

  test("testSimultaneousStops", async () => {
    for (let i = 0; i < 50; i++) {
      const tp = new ThreadPool(1, 1);

      await tp.start();
      let oks = 0;
      const invoke = async () => {
        try {
          await tp.stop();
          oks++;
        } catch {
          // passthrough
        }
      };
      await Promise.all([invoke(), invoke()]);
      expect(oks).toStrictEqual(1);
    }
  });

  test("testStopBeforeStart", async () => {
    const tp = new ThreadPool(1, 1);
    try {
      await tp.stop();
      expect(true).toBeFalsy();
    } catch (e) {
      expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
    }
  });

  test("testRestartWithoutStop", async () => {
    const tp = new ThreadPool(1, 1);
    await tp.start();
    try {
      await tp.start();
      expect(true).toBeFalsy();
    } catch (e) {
      await tp.stop();
    }
  });

  test("testDispatchNullArgument", async () => {
    const tp = new ThreadPool(1, 1);
    await tp.start();
    try {
      await tp.dispatch(null);
      expect(true).toBeFalsy();
    } catch (e) {
      await tp.stop();
      expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
    }
  });

  test("testDispatchBeforeStart", async () => {
    const tp = new ThreadPool(1, 1);
    const t = new CounterTask();
    try {
      await tp.dispatch(t);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
    }
  });

  test("testSimpleDispatch", async () => {
    const tp = new ThreadPool(1, 1);
    const t = new CounterTask();
    await tp.start();
    await tp.dispatch(t);
    await t.waitForRunCount(1);
    await tp.stop();
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });

  test("testSimpleRepeatedDispatch", async () => {
    const tp = new ThreadPool(1, 1);
    const t = new CounterTask();
    await tp.start();
    for (let i = 0; i < 10; i++) {
      await tp.dispatch(t);
    }
    await t.waitForRunCount(10);
    await tp.stop();
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });

  test("testSimpleRepeatedDispatch", async () => {
    const tp = new ThreadPool(1, 1);
    const t = new CounterTask();
    await tp.start();
    for (let i = 0; i < 10; i++) {
      await tp.dispatch(t);
    }
    await t.waitForRunCount(10);
    await tp.stop();
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });

  test("testComplexRepeatedDispatch", async () => {
    const tp = new ThreadPool(10, 10);
    const t = new CounterTask();
    await tp.start();
    // オリジナルは1000
    for (let i = 0; i < 100; i++) {
      await tp.dispatch(t);
    }
    await t.waitForRunCount(100);
    await tp.stop();
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });

  test("testComplexRepeatedDispatch2", async () => {
    const tp = new ThreadPool(10, 10);
    const tasks = [];
    for (let i = 0; i < 10; i++) {
      tasks.push(new CounterTask());
    }
    await tp.start();
    // オリジナルは100
    for (let i = 0; i < 10; i++) {
      for (const t of tasks) {
        await tp.dispatch(t);
      }
    }

    for (const t of tasks) {
      await t.waitForRunCount(10);
    }

    await tp.stop();
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });

  test("testLatchSimpleDispatch", async () => {
    const numberOfThreads = 10;
    const tp = new ThreadPool(10, numberOfThreads);
    await tp.start();
    const t = new LatchTask(numberOfThreads);
    for (let i = 0; i < numberOfThreads; i++) {
      await tp.dispatch(t);
    }
    await t.waitForLatchCount();
    await tp.stop();
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });

  test("testQueueSize", async () => {
    const sizeOfQueue = 10;
    const tp = new ThreadPool(sizeOfQueue, 1);
    await tp.start();
    await tp.stop();
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });

  test("testLatchComplexDispatch", async () => {
    const numberOfThreads = 10;
    const tp = new ThreadPool(10, numberOfThreads);
    await tp.start();
    const tasks = [];
    for (let i = 0; i < 10; i++) {
      tasks.push(new LatchTask(numberOfThreads));
    }
    for (const t of tasks) {
      for (let i = 0; i < numberOfThreads; i++) {
        await tp.dispatch(t);
      }
    }

    for (const t of tasks) {
      await t.waitForLatchCount();
    }
    await tp.stop();
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });

  test("testNumberOfThreads", async () => {
    const numberOfThreads = 10;
    const sharedBuffer = new SharedArrayBuffer(numberOfThreads);
    const data = new Uint8Array(sharedBuffer);
    const tp = new ThreadPool(10, numberOfThreads);
    await tp.start();
    for (let i = 0; i < numberOfThreads * 2; i++) {
      await tp.dispatch({
        data,
        run: async (data, id) => {
          Atomics.store(data, id, 1);
          await new Promise((resolve) => setTimeout(resolve, 500));
        },
      });
    }
    await tp.stop();
    for (let i = 0; i < numberOfThreads; i++) {
      expect(Atomics.load(data, i)).toBe(1);
    }
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });

  test("testAllThreadsShouldWait", async () => {
    const numberOfThreads = 10;
    const sharedBuffer = new SharedArrayBuffer(numberOfThreads);
    const data = new Uint8Array(sharedBuffer);
    const tp = new ThreadPool(10, numberOfThreads);
    const workers = await tp.start();
    for (let i = 0; i < numberOfThreads; i++) {
      await tp.dispatch({
        data,
        run: async (data, id) => {
          Atomics.store(data, id, 1);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        },
      });
    }
    await tp.stop();
    for (let i = 0; i < numberOfThreads; i++) {
      expect(Atomics.load(data, i)).toBe(1);
      expect(workers[i].threadId).toBe(-1);
    }
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });

  test("testAllThreadsShouldWait", async () => {
    const numberOfThreads = 10;
    const tp = new ThreadPool(10, numberOfThreads);
    await tp.start();

    // オリジナルでは100000回ループ
    // node版では、currentThreadの判別ができないため、ループは実行しない
    const runnable = await runnableThreadCount();
    expect(runnable).toBe(0);
    await tp.stop();
    expect(await activeThreadCount()).toBe(DEFAULT_NUMBER_OF_THREADS);
  });
});
