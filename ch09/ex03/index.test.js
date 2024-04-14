import { C, C_Closure } from "./index.js";

describe("C", () => {
  test("getX", () => {
    const c = new C();
    expect(c.getX()).toBe(42);
  });
});

describe("C_Closure", () => {
  test("getX", () => {
    const c = new C_Closure();
    expect(c.getX()).toBe(42);
  });
});
