import { IgnoreAccentPattern } from "./index.js";

describe("IgnoreAccentPattern", () => {
  describe("search", () => {
    test("found test", () => {
      expect("Coffee Café".search(new IgnoreAccentPattern("Cafe"))).toBe(7);
      expect("Coffee Café".search(new IgnoreAccentPattern("Café"))).toBe(7);
      expect("Coffee Café".search(new IgnoreAccentPattern(/Cafe/))).toBe(7);
      expect("Coffee Café".search(new IgnoreAccentPattern(/Café/))).toBe(7);
    });
    test("not found test", () => {
      expect("Coffee Café".search(new IgnoreAccentPattern("café"))).toBe(-1);
    });
  });
  describe("match", () => {
    test("found test", () => {
      expect(
        "Coffee Café".match(new IgnoreAccentPattern("Cafe"))
      ).toStrictEqual("Coffee Cafe".match("Cafe"));
      expect(
        "Coffee Café".match(new IgnoreAccentPattern(/Cafe/g))
      ).toStrictEqual(["Cafe"]);
      expect(
        "Coffee Café".match(new IgnoreAccentPattern(/Café/g))
      ).toStrictEqual(["Cafe"]);
      expect(
        "Coffee Café".match(new IgnoreAccentPattern(/[a-e]/g))
      ).toStrictEqual(["e", "e", "a", "e"]);
      expect("Coffee Café".match(new IgnoreAccentPattern(/é/g))).toStrictEqual([
        "e",
        "e",
        "e",
      ]);
    });
    test("not found test", () => {
      expect("Coffee Café".match(new IgnoreAccentPattern("café"))).toBeNull();
    });
  });
});
