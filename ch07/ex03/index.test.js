/* eslint no-sparse-arrays: 0 */

import { sum, join, reverse, every, some } from "./index.ts";

test("sum", () => {
  expect(sum()).toStrictEqual(0);
  expect(sum([])).toStrictEqual(0);
  expect(sum([-1])).toStrictEqual(-1);
  expect(sum([1, 2, 3, 4, 5])).toStrictEqual(15);
});

test("join", () => {
  expect(join([])).toStrictEqual("");
  expect(join([1, null, 3])).toStrictEqual("1,,3");
  expect(join([1, 2, 3], null)).toStrictEqual("1null2null3");
  expect(join(["Hello", 2, 3], "")).toStrictEqual("Hello23");
  expect(join(["", "", ""], "-")).toStrictEqual("--");
  expect(() => {
    join();
  }).toThrowError();
});

test("reverse", () => {
  expect(reverse([])).toStrictEqual([]);
  expect(reverse(["a"])).toStrictEqual(["a"]);
  expect(reverse([1, 2, 3, 4, 5])).toStrictEqual([5, 4, 3, 2, 1]);
  expect(reverse(["Hello", "World"])).toStrictEqual(["World", "Hello"]);
  expect(() => {
    reverse();
  }).toThrowError();
});

test("every", () => {
  const isBelowThreshold = (currentValue) => currentValue < 40;
  expect(every([1, 2, 3, 4, 5], isBelowThreshold)).toBeTruthy();
  expect(every([1, 2, 3, 45, 5], isBelowThreshold)).toBeFalsy();
  expect(every([], isBelowThreshold)).toBeTruthy();
  expect(every([1, , 1], (x) => x === 1)).toBeTruthy();
  expect(every([1, , 3], (x) => x !== undefined)).toBeTruthy();
  const original = [1, 2, 3];
  expect(
    every(original, (elem, index, arr) => {
      if (arr.length > index + 1) {
        arr[index + 1]--;
      }
      return elem < 3;
    })
  ).toBeTruthy();
  expect(original).toStrictEqual([1, 1, 2]);
});

test("some", () => {
  const isBelowThreshold = (currentValue) => currentValue < 40;
  expect(some([41, 42, 3, 44, 45], isBelowThreshold)).toBeTruthy();
  expect(some([41, 42, 43, 44, 45], isBelowThreshold)).toBeFalsy();
  expect(some([], isBelowThreshold)).toBeFalsy();
  expect(some([41, null, 42], (x) => x === null)).toBeTruthy();
  expect(some([41, undefined, 42], (x) => x === undefined)).toBeTruthy();
  expect(some([1, , 3], (x) => x === undefined)).toBeFalsy();
  const original = [1, 2, 3];
  expect(
    some(original, (elem, index, arr) => {
      if (arr.length > index + 1) {
        arr[index + 1]--;
      }
      return elem > 3;
    })
  ).toBeFalsy();
  expect(original).toStrictEqual([1, 1, 2]);
});
