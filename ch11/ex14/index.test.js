import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("sortJapanese", () => {
  test('["う", "い", "あ"] => ["あ", "い", "う"]', () => {
    expect(sortJapanese(["う", "い", "あ"])).toStrictEqual(["あ", "い", "う"]);
  });

  test('["は", "ば"] => ["は", "ば"]', () => {
    expect(sortJapanese(["は", "ば"])).toStrictEqual(["は", "ば"]);
  });

  test('["は", "ぱ"] => ["は", "ぱ"]', () => {
    expect(sortJapanese(["は", "ぱ"])).toStrictEqual(["は", "ぱ"]);
  });

  test('["ば", "は"] => ["ば", "は"]', () => {
    expect(sortJapanese(["ば", "は"])).toStrictEqual(["ば", "は"]);
  });

  test('["ぱ", "は"] => ["ぱ", "は"]', () => {
    expect(sortJapanese(["ぱ", "は"])).toStrictEqual(["ぱ", "は"]);
  });

  test('["つ", "っ"] => ["つ", "っ"]', () => {
    expect(sortJapanese(["つ", "っ"])).toStrictEqual(["つ", "っ"]);
  });

  test('["っ", "つ"] => ["っ", "つ"]', () => {
    expect(sortJapanese(["っ", "つ"])).toStrictEqual(["っ", "つ"]);
  });
});

describe("toJapaneseDateString", () => {
  test("1980/1/1 => 昭和55年1月1日", () => {
    expect(toJapaneseDateString(new Date(1980, 0, 1))).toBe("昭和55年1月1日");
  });

  test("2000/1/1 => 平成12年1月1日", () => {
    expect(toJapaneseDateString(new Date(2000, 0, 1))).toBe("平成12年1月1日");
  });

  test("2020/1/1 => 令和2年1月1日", () => {
    expect(toJapaneseDateString(new Date(2020, 0, 1))).toBe("令和2年1月1日");
  });
});
