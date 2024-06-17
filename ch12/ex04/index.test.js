import { genPrime } from "./index.js";

describe("genPrime", () => {
  test("next()", () => {
    const iter = genPrime();
    expect(iter.next()).toStrictEqual({ done: false, value: 2 });
    expect(iter.next()).toStrictEqual({ done: false, value: 3 });
    expect(iter.next()).toStrictEqual({ done: false, value: 5 });
    expect(iter.next()).toStrictEqual({ done: false, value: 7 });
    expect(iter.next()).toStrictEqual({ done: false, value: 11 });
    expect(iter.next()).toStrictEqual({ done: false, value: 13 });
    expect(iter.next()).toStrictEqual({ done: false, value: 17 });
    expect(iter.next()).toStrictEqual({ done: false, value: 19 });
  });
});
