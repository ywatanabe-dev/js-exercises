import { getProperties } from "./index.js";

describe("getProperties", () => {
  it("ch06/ex03", () => {
    const o = {};
    o.x = 1;
    const p = Object.create(o);
    p.y = 2;
    const q = Object.create(p);
    q.z = 3;
    expect(getProperties(q)).toStrictEqual(["z", "y", "x"]);
  });

  it("get non-enumerable property, symbol property", () => {
    const o = {};
    o["x"] = "o_x";
    o[Symbol("o_symbol")] = "o_symbol";
    Object.defineProperty(o, "o_non_enumerable", {
      value: "o_non_enumerable",
      writable: true,
      configurable: true,
      enumerable: false,
    });
    const p = Object.create(o);
    p[Symbol("p_symbol")] = "p_symbol";
    Object.defineProperty(p, "p_non_enumerable", {
      value: "p_non_enumerable",
      writable: true,
      configurable: true,
      enumerable: false,
    });
    expect(
      getProperties(p).map((p) => (typeof p === "symbol" ? p.description : p))
    ).toStrictEqual(["p_non_enumerable", "p_symbol", "x"]);
  });
});
