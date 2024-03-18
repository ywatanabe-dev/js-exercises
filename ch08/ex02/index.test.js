import { expLoop, expRecursive } from "./index.js";

describe("expLoop", () => {
  it("1 ** 0 = 1", () => {
    expect(expLoop(1, 0)).toBe(1);
  });

  it("2 ** 5 = 32", () => {
    expect(expLoop(2, 5)).toBe(32);
  });

  it("3 ** 5 = 243", () => {
    expect(expLoop(3, 5)).toBe(243);
  });
});

describe("expRecursive", () => {
  it("1 ** 0 = 1", () => {
    expect(expRecursive(1, 0)).toBe(1);
  });

  it("2 ** 5 = 32", () => {
    expect(expRecursive(2, 5)).toBe(32);
  });

  it("3 ** 5 = 243", () => {
    expect(expRecursive(3, 5)).toBe(243);
  });
});
