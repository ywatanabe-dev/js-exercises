import { bitCount } from "./index.ts";

describe("bitCount", () => {
  it("0b0 contains 0 '1'", () => {
    expect(bitCount(0b0)).toBe(0);
  });

  it("0b111 contains 3 '1'", () => {
    expect(bitCount(0b111)).toBe(3);
  });

  it("0b1111111111111111111111111111111 contains 31 '1'", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
  });

  it("-1 contains 32 '1'", () => {
    expect(bitCount(-1)).toBe(32);
  });
});
