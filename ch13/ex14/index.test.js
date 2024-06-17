// https://github.com/YoshikiShibata/jpltest/blob/master/jpl/ch14/ex10/ThreadPoolTest.java

import { PromisePool } from "./index.ts";

const wait = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

class CounterTask {
  #runCount = 0;
  async run() {
    ++this.#runCount;
  }

  async waitForRunCount(count) {
    while (this.#runCount < count) {
      await wait(0);
    }
    return this.#runCount;
  }
}

class LatchTask {
  #latchCount;
  #currentCount = 0;

  constructor(count) {
    this.#latchCount = count;
  }

  async run() {
    ++this.#currentCount;
    while (this.#currentCount < this.#latchCount) {
      await wait(0);
    }
  }

  async waitForLatchCount() {
    while (this.#currentCount < this.#latchCount) {
      await wait(0);
    }
  }
}

test("constructor illegal argument first", () => {
  expect(() => new PromisePool(0, 1)).toThrow();
});

test("constructor illegal argument second", () => {
  expect(() => new PromisePool(1, 0)).toThrow();
});

test("test start and stop", async () => {
  const tp = new PromisePool(1, 1);
  await tp.start();
  await tp.stop();
});

test("repeat simultaneous starts", async () => {
  for (let i = 0; i < 50; i++) {
    const tp = new PromisePool(1, 1);

    let oks = 0;
    const invoke = async () => {
      try {
        await wait(0);
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

test("repeat simultaneous stops", async () => {
  for (let i = 0; i < 50; i++) {
    const tp = new PromisePool(1, 1);

    await tp.start();
    let oks = 0;
    const invoke = async () => {
      try {
        await wait(0);
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

test("stop before start", async () => {
  const tp = new PromisePool(1, 1);
  await expect(() => tp.stop()).rejects.not.toBeNull();
});

test("restart without stop", async () => {
  const tp = new PromisePool(1, 1);
  await tp.start();
  await expect(() => tp.start()).rejects.not.toBeNull();
  // テストを正しく終わらせるために、追加
  await tp.stop();
});

test("dispatch before start", async () => {
  const tp = new PromisePool(1, 1);
  await expect(() => tp.dispatch(() => {})).rejects.not.toBeNull();
});

test("simple dispatch", async () => {
  const tp = new PromisePool(1, 1);
  await tp.start();
  const t = new CounterTask();
  tp.dispatch(() => t.run());
  await t.waitForRunCount(1);
  await tp.stop();
});

test("simple repeated dispatch", async () => {
  const tp = new PromisePool(1, 1);
  await tp.start();
  const t = new CounterTask();

  for (let i = 0; i < 10; i++) {
    tp.dispatch(() => t.run());
  }

  await t.waitForRunCount(10);
  await tp.stop();
});

test("complex repeated dispatch", async () => {
  const tp = new PromisePool(10, 10);
  await tp.start();
  const t = new CounterTask();

  for (let i = 0; i < 1000; i++) {
    tp.dispatch(() => t.run());
  }

  await t.waitForRunCount(1000);
  await tp.stop();
});

test("complex repeated dispatch2", async () => {
  const tp = new PromisePool(10, 10);
  await tp.start();
  const tasks = [...Array(10).keys()].map(() => new CounterTask());

  for (let i = 0; i < 100; i++) {
    for (const t of tasks) {
      tp.dispatch(() => t.run());
    }
  }

  for (const t of tasks) {
    await t.waitForRunCount(100);
  }

  await tp.stop();
});

test("latch simple dispatch", async () => {
  const maxRunningPromises = 10;
  const tp = new PromisePool(10, maxRunningPromises);
  await tp.start();
  const t = new LatchTask(maxRunningPromises);

  for (let i = 0; i < maxRunningPromises; i++) {
    tp.dispatch(() => t.run());
  }

  await t.waitForLatchCount();
  await tp.stop();
});

test("latch complex dispatch", async () => {
  const maxRunningPromises = 10;
  const tp = new PromisePool(10, maxRunningPromises);
  await tp.start();

  const tasks = [...Array(10).keys()].map(
    () => new LatchTask(maxRunningPromises)
  );
  for (const t of tasks) {
    for (let i = 0; i < maxRunningPromises; i++) {
      tp.dispatch(() => t.run());
    }
  }

  for (const t of tasks) {
    await t.waitForLatchCount();
  }

  await tp.stop();
});

test("number of max running promises", async () => {
  let current = 0;
  let max = 0;

  const task = async () => {
    ++current;
    max = Math.max(current, max);
    try {
      await wait(500);
    } finally {
      --current;
    }
  };

  const maxRunningPromises = 10;
  const tp = new PromisePool(10, maxRunningPromises);
  await tp.start();

  for (let i = 0; i < maxRunningPromises; i++) {
    tp.dispatch(task);
  }

  await tp.stop();
  expect(max).toStrictEqual(maxRunningPromises);
});
