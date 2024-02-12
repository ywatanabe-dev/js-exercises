import { fib } from "./index.ts";

describe("fib", () => {
  it("fib(1) => 1", () => {
    let i = 1;
    for (const n of fib()) {
      if (i === 1) {
        expect(n).toBe(1);
        break;
      }
      i++;
    }
  });

  it("fib(2) => 1", () => {
    let i = 1;
    for (const n of fib()) {
      if (i === 2) {
        expect(n).toBe(1);
        break;
      }
      i++;
    }
  });

  it("fib(5) => 5", () => {
    let i = 1;
    for (const n of fib()) {
      if (i === 5) {
        expect(n).toBe(5);
        break;
      }
      i++;
    }
  });

  it("fib(50) => 12586269025", () => {
    let i = 1;
    for (const n of fib()) {
      if (i === 50) {
        expect(n).toBe(12586269025);
        break;
      }
      i++;
    }
  });
});
