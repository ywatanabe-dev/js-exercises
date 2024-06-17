import { genCount } from "./index.js";

describe("genCount", () => {
  test("thrown()", () => {
    const iter = genCount();
    expect(iter.next()).toStrictEqual({ done: false, value: 0 });
    expect(iter.next()).toStrictEqual({ done: false, value: 1 });
    expect(iter.next()).toStrictEqual({ done: false, value: 2 });
    expect(iter.throw()).toStrictEqual({ done: false, value: 0 });
    expect(iter.next()).toStrictEqual({ done: false, value: 1 });
  });
});
