import { f } from "./index.js";

describe("f", () => {
  it("returns function with no args", () => {
    expect(f("42")()).toBe(42);
  });

  it("returns function with one arg", () => {
    expect(f("$1 + 1")(1)).toBe(2);
  });

  it("returns function with multi args", () => {
    expect(
      f("$1 + $2 + $3 + $4 + $5 + $6 + $7 + $8 + $9 + $10")(
        "1",
        "2",
        "Fizz",
        "4",
        "Buzz",
        "Fizz",
        "7",
        "8",
        "Fizz",
        "Buzz"
      )
    ).toBe("12Fizz4BuzzFizz78FizzBuzz");
  });

  it("returns function with multi line", () => {
    expect(f("{ const result = $1 + $2;\n return result; }")(1, 2)).toBe(3);
  });
});
