import { any, catching } from "./index.js";

describe("any", () => {
  test("isNonZero", () => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );
    expect(isNonZero(0)).toBe(false);
    expect(isNonZero(42)).toBe(true);
    expect(isNonZero(-0.5)).toBe(true);
  });

  test("any()", () => {
    const empty = any();
    expect(empty(0)).toBe(false);
  });

  test("isSumNonZero", () => {
    const isSumNonZero = any(
      (...n) => n.reduce((x, y) => x + y) > 0,
      (...n) => n.reduce((x, y) => x + y) < 0
    );
    expect(isSumNonZero(-1, 0, 1)).toBe(false);
    expect(isSumNonZero(-1, 1, 2)).toBe(true);
    expect(isSumNonZero(-3, 0, 1)).toBe(true);
  });
});

describe("catching", () => {
  test("safeJsonParse", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });
    expect(safeJsonParse('{"a": 1}')).toStrictEqual({ a: 1 });
    expect(safeJsonParse("{Invalid Json}")).toStrictEqual({
      error: "SyntaxError: Unexpected token I in JSON at position 1",
    });
  });

  test("safeCallToString", () => {
    const safeCallFunction = catching(
      (obj, prop) => obj[prop].toString(),
      (e) => {
        return { error: e.toString() };
      }
    );
    const obj = { a: "a" };
    expect(safeCallFunction(obj, "a")).toBe("a");
    expect(safeCallFunction(obj, "b")).toStrictEqual({
      error:
        "TypeError: Cannot read properties of undefined (reading 'toString')",
    });
  });
});
