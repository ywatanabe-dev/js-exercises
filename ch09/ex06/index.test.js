import { TypedMap } from "./index.js";

describe("constructor()", () => {
  test("0 entries (string, string)", () => {
    const map = new TypedMap("string", "string");
    expect(Array.from(map.entries())).toStrictEqual([]);
    expect(map.size).toBe(0);
  });

  test("3 entries (string, string)", () => {
    const map = new TypedMap("string", "string", [
      ["a", "1"],
      ["b", "2"],
      ["c", "3"],
    ]);
    expect(Array.from(map.entries())).toEqual(
      expect.arrayContaining([
        ["a", "1"],
        ["b", "2"],
        ["c", "3"],
      ])
    );
    expect(Array.from(map.entries()).length).toBe(3);
    expect(map.size).toBe(3);
  });

  test("3 entries (number, number)", () => {
    const map = new TypedMap("number", "number", [
      [1, 1],
      [2, 2],
      [3, 3],
    ]);
    expect(Array.from(map.entries())).toEqual(
      expect.arrayContaining([
        [1, 1],
        [2, 2],
        [3, 3],
      ])
    );
    expect(Array.from(map.entries()).length).toBe(3);
    expect(map.size).toBe(3);
  });

  test("3 entries (string, string) => key type error", () => {
    expect(() => {
      new TypedMap("string", "string", [[1, "a"]]);
    }).toThrow("Wrong type for entry [1, a]");
  });

  test("3 entries (number, number) => value type error", () => {
    expect(() => {
      new TypedMap("number", "number", [[1, "a"]]);
    }).toThrow("Wrong type for entry [1, a]");
  });
});

describe("set()", () => {
  test("set entries (string, string)", () => {
    const map = new TypedMap("string", "string");
    map.set("a", "1");
    map.set("b", "2");
    map.set("c", "3");
    map.set("a", "0");
    expect(Array.from(map.entries())).toEqual(
      expect.arrayContaining([
        ["a", "0"],
        ["b", "2"],
        ["c", "3"],
      ])
    );
    expect(Array.from(map.entries()).length).toBe(3);
    expect(map.size).toBe(3);
  });

  test("set entries (number, number)", () => {
    const map = new TypedMap("number", "number");
    map.set(1, 1);
    map.set(2, 2);
    map.set(3, 3);
    map.set(1, 0);
    expect(Array.from(map.entries())).toEqual(
      expect.arrayContaining([
        [1, 0],
        [2, 2],
        [3, 3],
      ])
    );
    expect(Array.from(map.entries()).length).toBe(3);
    expect(map.size).toBe(3);
  });

  test("set entries (string, string) => key type error", () => {
    const map = new TypedMap("string", "string");
    expect(() => {
      map.set(1, "a");
    }).toThrow("1 is not of type string");
  });

  test("set entries (number, number) => value type error", () => {
    const map = new TypedMap("number", "number");
    expect(() => {
      map.set(1, "a");
    }).toThrow("a is not of type number");
  });
});
