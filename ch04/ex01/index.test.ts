import { Complex, add, sub, mul, div } from "./index.ts";

describe("Complex", () => {
  it("(1 + 2i) + (2 + 3i) = 3 + 5i", () => {
    expect(add(new Complex(1, 2), new Complex(2, 3))).toEqual(
      new Complex(3, 5)
    );
  });

  it("(1 + 2i) - (2 + 3i) = -1 - i", () => {
    expect(sub(new Complex(1, 2), new Complex(2, 3))).toEqual(
      new Complex(-1, -1)
    );
  });

  it("(1 + 2i) * (2 + 3i) = -4 + 7i", () => {
    expect(mul(new Complex(1, 2), new Complex(2, 3))).toEqual(
      new Complex(-4, 7)
    );
  });

  it("(1 + 2i) / (2 + 3i) = -1.6 - 0.2i", () => {
    const result = div(new Complex(1, 2), new Complex(2, 3));
    expect(result.real).toBeCloseTo(-1.6);
    expect(result.imaginary).toBeCloseTo(-0.2);
  });
});
