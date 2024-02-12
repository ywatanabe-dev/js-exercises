import { assign } from "./index.js";

describe("assign", () => {
  it("copy source to target", () => {
    const obj1 = {
      a: "a",
      b: "b",
    };
    const obj2 = {
      a: "new_a",
      c: "c",
    };
    const obj1_copy = { ...obj1 };
    assign(obj1, obj2);
    Object.assign(obj1_copy, obj2);
    expect(obj1).toStrictEqual(obj1_copy);
  });

  it("copy sources to target", () => {
    const obj1 = {
      a: "a",
      b: "b",
    };
    const obj2 = {
      a: "new_a",
      c: "c",
    };
    const obj3 = {
      b: "new_b",
      d: "d",
    };
    const obj1_copy = { ...obj1 };
    assign(obj1, obj2, obj3);
    Object.assign(obj1_copy, obj2, obj3);
    expect(obj1).toStrictEqual(obj1_copy);
  });

  it("copy symbol property", () => {
    const obj1 = {
      a: "a",
    };
    const obj2 = {};
    obj2[Symbol()] = "symbol";
    const obj1_copy = { ...obj1 };
    assign(obj1, obj2);
    Object.assign(obj1_copy, obj2);
    expect(obj1).toStrictEqual(obj1_copy);
  });

  it("not copy non-enumerable property", () => {
    const obj1 = {
      a: "a",
    };
    const obj2 = {};
    Object.defineProperty(obj2, "b", {
      value: "non-enumerable",
      writable: true,
      configurable: true,
      enumerable: false,
    });
    const obj1_copy = { ...obj1 };
    assign(obj1, obj2);
    Object.assign(obj1_copy, obj2);
    expect(obj1).toStrictEqual(obj1_copy);
  });

  it("", () => {
    const log = [];
    const log_copy = [];
    const obj1 = {
      set a(str) {
        log.push("set a");
      },
      get a() {
        log.push("get a");
        return "a";
      },
    };
    const obj1_copy = {
      set a(str) {
        log_copy.push("set a");
      },
      get a() {
        log_copy.push("get a");
        return "a";
      },
    };
    const obj2 = {
      a: "new_a",
      set b(str) {
        log.push("set b");
      },
      get b() {
        log.push("get b");
        return "b";
      },
    };
    const obj2_copy = {
      a: "new_a",
      set b(str) {
        log_copy.push("set b");
      },
      get b() {
        log_copy.push("get b");
        return "b";
      },
    };
    assign(obj1, obj2);
    Object.assign(obj1_copy, obj2_copy);
    expect(log).toStrictEqual(log_copy);
    expect(obj1).toStrictEqual(obj1_copy);
  });
});
