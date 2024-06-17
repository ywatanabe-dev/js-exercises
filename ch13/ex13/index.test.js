import { walk } from "./index.js";

describe("walk", () => {
  test("walk ./ch12/ex05", async () => {
    const iter = walk("./ch12/ex05");
    expect(await iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/index.js", isDirectory: false },
    });
    expect(await iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/index.test.js", isDirectory: false },
    });
    expect(await iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/txt", isDirectory: true },
    });
    expect(await iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/txt/test1.txt", isDirectory: false },
    });
    expect(await iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/txt/test2.txt", isDirectory: false },
    });
    expect(await iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/txt/test3.txt", isDirectory: false },
    });
    expect(await iter.next()).toStrictEqual({
      done: true,
      value: undefined,
    });
  });

  test("walk ./ch12/ex (not exist)", async () => {
    const iter = walk("./ch12/ex");
    expect(async () => {
      await iter.next();
    }).rejects.toThrow();
  });
});
