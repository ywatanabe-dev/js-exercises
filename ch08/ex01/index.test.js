import { repeatChar, squared, getNow } from "./index.js";

describe("repeatChar", () => {
  it("repeat 'a' 0 times", () => {
    expect(repeatChar(0, "a")).toStrictEqual([]);
  });

  it("repeat 'a' 5 times", () => {
    expect(repeatChar(5, "a")).toStrictEqual(["a", "a", "a", "a", "a"]);
  });
});

describe("squared", () => {
  it("0 ** 2 = 0", () => {
    expect(squared(0)).toBe(0);
  });

  it("5 ** 2 = 25", () => {
    expect(squared(5)).toBe(25);
  });
});

describe("getNow", () => {
  it("0 ** 2 = 0", () => {
    expect(String(getNow().now)).toMatch(/^[0-9]{13}$/);
  });
});
