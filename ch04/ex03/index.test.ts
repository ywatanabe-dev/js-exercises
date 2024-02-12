import { add, sub } from "./index.ts";

describe("add", () => {
  it("-1 + 1 = 0", () => {
    expect(add(-1, 1)).toBe(0);
  });

  it("2 ** 30 + (2 ** 30 - 1) = 2 ** 31 - 1", () => {
    expect(add(1073741824, 1073741823)).toBe(2147483647);
  });

  it("-(2 ** 30) + (-(2 ** 30)) = -(2 ** 31)", () => {
    expect(add(-1073741824, -1073741824)).toBe(-2147483648);
  });

  it("1 + (2 ** 31 - 2) = 2 ** 31 - 1", () => {
    expect(add(1, 2147483646)).toBe(2147483647);
  });

  it("-(2 ** 31) + 2 ** 31 - 1 = -1", () => {
    expect(add(-2147483648, 2147483647)).toBe(-1);
  });
});

describe("sub", () => {
  it("1 - 1 = 0", () => {
    expect(sub(1, 1)).toBe(0);
  });

  it("(2 ** 30 - 1) - (-(2 ** 30)) = 2 ** 31 - 1", () => {
    expect(sub(1073741823, -1073741824)).toBe(2147483647);
  });

  it("(2 ** 31 - 1) - (2 ** 31 - 1) = 0", () => {
    expect(sub(2147483647, 2147483647)).toBe(0);
  });
});