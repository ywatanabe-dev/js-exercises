import { fib1, fib2, fib3 } from "./index.ts";

describe("First 10 of the Fibonacci sequence", () => {
  it("fib1", () => {
    expect(fib1()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });

  it("fib2", () => {
    expect(fib2()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });

  it("fib3", () => {
    expect(fib3()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
