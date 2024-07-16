import { HiraganaChar } from "./index.js";

describe("HiraganaChar", () => {
  test("constructor", () => {
    const c1 = new HiraganaChar("ぁ");
    expect(c1.character).toBe("ぁ");
    expect(c1.codePoint).toBe(0x3041);
    const c2 = new HiraganaChar("ゖ");
    expect(c2.character).toBe("ゖ");
    expect(c2.codePoint).toBe(0x3096);
  });

  test("constructor error", () => {
    expect(() => {
      new HiraganaChar("0");
    }).toThrow();
    expect(() => {
      new HiraganaChar("ああ");
    }).toThrow();
    expect(() => {
      new HiraganaChar("ア");
    }).toThrow();
  });

  test("template literal", () => {
    const c = new HiraganaChar("あ");
    expect(`${c}`).toBe("あ");
  });

  test("sort", () => {
    const c1 = new HiraganaChar("あ");
    const c2 = new HiraganaChar("い");
    const c3 = new HiraganaChar("う");
    const list = [c3, c2, c1];
    list.sort();
    expect(list.map((c) => `${c}`)).toStrictEqual(["あ", "い", "う"]);
  });
});
