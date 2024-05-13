import { TypeMap } from "./index.js";

describe("TypeMap", () => {
  test("example", () => {
    class Foo {}

    const typeMap = new TypeMap();
    typeMap.set(String, "string");
    typeMap.set(Number, 123);
    typeMap.set(Foo, new Foo());
    expect(() => {
      typeMap.set(Date, "not a date");
    }).toThrowError();

    expect(typeMap.get(String)).toBe("string");
    expect(typeMap.get(Number)).toBe(123);
  });

  test("set BigInt", () => {
    const typeMap = new TypeMap();
    typeMap.set(BigInt, 10n);
    expect(typeMap.get(BigInt)).toBe(10n);
    expect(() => {
      typeMap.set(BigInt, 0);
    }).toThrowError();
  });

  test("set Boolean", () => {
    const typeMap = new TypeMap();
    typeMap.set(Boolean, true);
    expect(typeMap.get(Boolean)).toBe(true);
    expect(() => {
      typeMap.set(Boolean, 0);
    }).toThrowError();
  });

  test("set Symbol", () => {
    const typeMap = new TypeMap();
    const symbol = Symbol();
    typeMap.set(Symbol, symbol);
    expect(typeMap.get(Symbol)).toBe(symbol);
    expect(() => {
      typeMap.set(Symbol, 0);
    }).toThrowError();
  });

  test("set String error", () => {
    const typeMap = new TypeMap();
    expect(() => {
      typeMap.set(String, 0);
    }).toThrowError();
  });

  test("set Number error", () => {
    const typeMap = new TypeMap();
    expect(() => {
      typeMap.set(Number, "string");
    }).toThrowError();
  });

  test("set other type error", () => {
    class Foo {}
    class Bar {}
    const typeMap = new TypeMap();
    expect(() => {
      typeMap.set(Foo, new Bar());
    }).toThrowError();
  });
});
