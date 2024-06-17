import { readLines } from "./index.js";
import * as fs from "fs";
jest.mock("fs", () => {
  const fs = jest.requireActual("fs");
  return {
    __esModule: true,
    ...fs,
    closeSync: jest.fn((fd) => fs.closeSync(fd)),
  };
});

beforeEach(() => {
  fs.closeSync.mockClear();
});

describe("readLines", () => {
  test("test1", () => {
    const iter = readLines("./ch12/ex05/txt/test1.txt");
    expect(iter.next()).toStrictEqual({ done: false, value: "aaaaa" });
    expect(iter.next()).toStrictEqual({ done: false, value: "bbbbbbbbbb" });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: "ccccccccccccccc",
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: "dddddddddddddddddddd",
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: "eeeeeeeeeeeeeeeeeeeeeeeee",
    });
    expect(iter.next()).toStrictEqual({
      done: true,
      value: undefined,
    });
    expect(fs.closeSync).toHaveBeenCalledTimes(1);
  });

  test("test2", () => {
    const iter = readLines("./ch12/ex05/txt/test2.txt");
    expect(iter.next()).toStrictEqual({ done: false, value: "a" });
    expect(iter.next()).toStrictEqual({ done: false, value: "bb" });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: "",
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: "c",
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: "dd",
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: "e",
    });
    expect(iter.next()).toStrictEqual({
      done: false,
      value: "",
    });
    expect(iter.next()).toStrictEqual({
      done: true,
      value: undefined,
    });
    expect(fs.closeSync).toHaveBeenCalledTimes(1);
  });

  test("return()", () => {
    const iter = readLines("./ch12/ex05/txt/test3.txt");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of iter) {
      break;
    }
    expect(fs.closeSync).toHaveBeenCalledTimes(1);
  });

  test("throw()", () => {
    const iter = readLines("./ch12/ex05/txt/test3.txt");
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of iter) {
        throw new Error();
      }
    } catch (e) {
      // catch error
    }
    expect(fs.closeSync).toHaveBeenCalledTimes(1);
  });
});
