import { equals } from "./index.ts";

describe("equals", () => {
  it("{ a: 0 } === { a: 0 }", () => {
    expect(equals({ a: 0 }, { a: 0 })).toBe(true);
  });

  it("{ a: 0, b: 1 } === { a: 0, b: 1 }", () => {
    expect(equals({ a: 0, b: 1 }, { a: 0, b: 1 })).toBe(true);
  });

  it("{ a: 0 } !== { a: 1 }", () => {
    expect(equals({ a: 0 }, { a: 1 })).toBe(false);
  });

  it("{ a: 0 } !== { a: 0, b: 1 }", () => {
    expect(equals({ a: 0 }, { a: 0, b: 1 })).toBe(false);
  });
});
