import { setLogToMethodCall } from "./index.js";

describe("setLogToMethodCall", () => {
  test("console.log()", () => {
    const [obj, log] = setLogToMethodCall(console);
    obj.log("test");
    expect(log).toStrictEqual([
      { date: expect.any(Date), name: "log", args: ["test"] },
    ]);
  });

  test("original method", () => {
    const [obj, log] = setLogToMethodCall({
      x() {},
      y() {},
    });
    obj.x();
    obj.y();
    expect(log).toStrictEqual([
      { date: expect.any(Date), name: "x", args: [] },
      { date: expect.any(Date), name: "y", args: [] },
    ]);
  });

  test("[Symbol.iterator]()", () => {
    const [obj, log] = setLogToMethodCall([1, 2, 3]);
    for (const x of obj) {
      x;
    }
    expect(log).toStrictEqual([
      { date: expect.any(Date), name: Symbol.iterator, args: [] },
    ]);
  });
});
