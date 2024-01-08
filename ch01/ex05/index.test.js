import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("returns 15 when array [1, 2, 3, 4, 5] given", () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
    });

    it("returns 0 when empty array given", () => {
      expect(sum([])).toBe(0);
    });
  });

  describe("functional", () => {
    it("returns 120 when 5 given", () => {
      expect(factorial(5)).toBe(120);
    });

    it("returns 1 when 1 given", () => {
      expect(factorial(1)).toBe(1);
    });

    it("returns 1 when 0 given", () => {
      expect(factorial(0)).toBe(1);
    });
  });
});
