import { deleteOddNumber } from "./index.ts";

describe("First 10 of the Fibonacci sequence", () => {
  it("{} => {}", () => {
    expect(deleteOddNumber({})).toStrictEqual({});
  });

  it("{ a: 2 } => { a: 2 }", () => {
    expect(deleteOddNumber({ a: 2 })).toStrictEqual({ a: 2 });
  });

  it("{ a: 3 } => {}", () => {
    expect(deleteOddNumber({ a: 3 })).toStrictEqual({});
  });

  it("{ a: 1, b: 2 } => { b: 2 }", () => {
    expect(deleteOddNumber({ a: 1, b: 2 })).toStrictEqual({ b: 2 });
  });

  it("{ a: 2, b: 3 } => { a: 2 }", () => {
    expect(deleteOddNumber({ a: 2, b: 3 })).toStrictEqual({ a: 2 });
  });

  it("{ a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 } => { a: 0, c: 2, e: 4 }", () => {
    expect(
      deleteOddNumber({ a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 })
    ).toStrictEqual({ a: 0, c: 2, e: 4 });
  });
});
