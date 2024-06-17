import { walk } from "./index.js";

describe("walk", () => {
  test("walk ./ch12/ex05", () => {
    const iter = walk("./ch12/ex05");
    expect(iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/index.js", isDirectory: false },
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/index.test.js", isDirectory: false },
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/txt", isDirectory: true },
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/txt/test1.txt", isDirectory: false },
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/txt/test2.txt", isDirectory: false },
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: { path: "ch12/ex05/txt/test3.txt", isDirectory: false },
    });
    expect(iter.next()).toStrictEqual({
      done: true,
      value: undefined,
    });
  });

  test("walk ./ch12/ex (not exist)", () => {
    const iter = walk("./ch12/ex");
    expect(() => {
      iter.next();
    }).toThrow();
  });
});
