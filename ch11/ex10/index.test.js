import {
  numberOfDays,
  numberOfWeekdays,
  getLocalDay,
  getLastMonthFirst,
} from "./index.js";

describe("numberOfDays", () => {
  test("2024/1 => 31", () => {
    expect(numberOfDays(2024, 1)).toBe(31);
  });

  test("2024/2 => 29", () => {
    expect(numberOfDays(2024, 2)).toBe(29);
  });

  test("2024/3 => 31", () => {
    expect(numberOfDays(2024, 3)).toBe(31);
  });

  test("2024/4 => 30", () => {
    expect(numberOfDays(2024, 4)).toBe(30);
  });

  test("2024/12 => 31", () => {
    expect(numberOfDays(2024, 4)).toBe(30);
  });

  test("2023/2 => 28", () => {
    expect(numberOfDays(2023, 2)).toBe(28);
  });
});

describe("numberOfWeekdays", () => {
  test("2024/1/1-2024/1/31 => 23", () => {
    expect(numberOfWeekdays("2024-01-01", "2024-01-31")).toBe(23);
  });

  test("2024/2/1-2024/2/29 => 21", () => {
    expect(numberOfWeekdays("2024-02-01", "2024-02-29")).toBe(21);
  });

  test("2024/3/1-2024/3/31 => 21", () => {
    expect(numberOfWeekdays("2024-03-01", "2024-03-31")).toBe(21);
  });

  test("2024/1/1-2024/3/31 => 44", () => {
    expect(numberOfWeekdays("2024-01-01", "2024-03-31")).toBe(65);
  });

  test("2024/1/1-2024/1/1 => 1", () => {
    expect(numberOfWeekdays("2024-01-01", "2024-01-01")).toBe(1);
  });

  test("2024/1/2-2024/1/1 => 0", () => {
    expect(numberOfWeekdays("2024-01-02", "2024-01-01")).toBe(0);
  });
});

describe("getLocalDay", () => {
  test("2024/1/1, en-US => Monday", () => {
    expect(getLocalDay("2024-01-01", "en-US")).toBe("Monday");
  });

  test("2024/1/2, fr-FR => Monday", () => {
    expect(getLocalDay("2024-01-02", "fr-FR")).toBe("mardi");
  });

  test("2024/1/3, es-ES => Monday", () => {
    expect(getLocalDay("2024-01-03", "es-ES")).toBe("miércoles");
  });

  test("2024/1/4, ja-JP => Monday", () => {
    expect(getLocalDay("2024-01-04", "ja-JP")).toBe("木曜日");
  });
});

describe("getLastMonthFirst", () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const prev_year = month !== 0 ? year : year - 1;
  const prev_month = month !== 0 ? month - 1 : 11;
  const prev = new Date(prev_year, prev_month, 1);
  expect(getLastMonthFirst().getTime()).toBe(prev.getTime());
});
