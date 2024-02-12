import { isWeekEnd1, isWeekEnd2 } from "./index.ts";

describe("isWeekEnd1", () => {
  it("月曜日", () => {
    expect(isWeekEnd1("月")).toBeFalsy;
  });

  it("火曜日", () => {
    expect(isWeekEnd1("火")).toBeFalsy;
  });

  it("水曜日", () => {
    expect(isWeekEnd1("火")).toBeFalsy;
  });

  it("木曜日", () => {
    expect(isWeekEnd1("火")).toBeFalsy;
  });

  it("金曜日", () => {
    expect(isWeekEnd1("金")).toBeFalsy;
  });

  it("土曜日", () => {
    expect(isWeekEnd1("土")).toBeTruthy;
  });

  it("日曜日", () => {
    expect(isWeekEnd1("日")).toBeTruthy;
  });
});

describe("isWeekEnd2", () => {
  it("月曜日", () => {
    expect(isWeekEnd2("月")).toBeFalsy;
  });

  it("火曜日", () => {
    expect(isWeekEnd2("火")).toBeFalsy;
  });

  it("水曜日", () => {
    expect(isWeekEnd2("火")).toBeFalsy;
  });

  it("木曜日", () => {
    expect(isWeekEnd2("火")).toBeFalsy;
  });

  it("金曜日", () => {
    expect(isWeekEnd2("金")).toBeFalsy;
  });

  it("土曜日", () => {
    expect(isWeekEnd2("土")).toBeTruthy;
  });

  it("日曜日", () => {
    expect(isWeekEnd2("日")).toBeTruthy;
  });
});
