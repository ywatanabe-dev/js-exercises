import { fib } from "./index.ts";

describe("math", () => {
  describe("fib", () => {
    it("returns 5 when 5 given", () => {
      expect(fib(5)).toBe(5);
    });

    it("returns 12586269025 when 50 given", () => {
      expect(fib(50)).toBe(12586269025);
    });

    it("returns 0 when 0 given", () => {
      expect(fib(0)).toBe(0);
    });

    it("returns 1 when 1 given", () => {
      expect(fib(1)).toBe(1);
    });
  });
});
