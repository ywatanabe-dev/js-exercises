import { getType } from "./index.js";

describe("getType", () => {
  test("input error", () => {
    expect(() => {
      getType``;
    }).toThrow();
    expect(() => {
      getType`${1}${2}`;
    }).toThrow();
  });

  test("undefined", () => {
    expect(getType`${undefined}`).toBe("undefined");
  });

  test("null", () => {
    expect(getType`${null}`).toBe("object");
  });

  test("Boolean", () => {
    expect(getType`${true}`).toBe("boolean");
  });

  test("number(int)", () => {
    expect(getType`${1}`).toBe("number");
  });

  test("number(float)", () => {
    expect(getType`${1.1}`).toBe("number");
  });

  test("BigInt", () => {
    expect(getType`${BigInt(Number.MAX_SAFE_INTEGER)}`).toBe("bigint");
  });

  test("String", () => {
    expect(getType`${"A"}`).toBe("string");
  });

  test("Symbol", () => {
    expect(getType`${Symbol()}`).toBe("symbol");
  });

  test("Function", () => {
    expect(getType`${() => {}}`).toBe("function");
  });

  test("Object", () => {
    expect(getType`${{ x: 1 }}`).toBe("object");
  });
});
