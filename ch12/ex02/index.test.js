import { fibonacciSequence, fibonacciSequenceOriginal } from "./index.js";

describe("fibonacciSequence", () => {
  test("next()", () => {
    expect(fibonacciSequence().next()).toStrictEqual(
      fibonacciSequenceOriginal().next()
    );
  });

  test("return()", () => {
    expect(fibonacciSequence().return()).toStrictEqual(
      fibonacciSequenceOriginal().return()
    );
  });

  test("indirect function call", () => {
    let count = 0;
    const result1 = [];
    for (const x of fibonacciSequence()) {
      result1.push(x);
      if (++count >= 20) {
        break;
      }
    }
    count = 0;
    const result2 = [];
    for (const x of fibonacciSequenceOriginal()) {
      result2.push(x);
      if (++count >= 20) {
        break;
      }
    }
    expect(result1).toStrictEqual(result2);
  });
});
