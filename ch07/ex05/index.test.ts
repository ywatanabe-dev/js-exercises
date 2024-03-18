import { pop, push, shift, unshift, sort } from "./index.ts";

test("sample", () => {
  const seq = [1, 2, 3, 4, 5];

  expect(pop(seq)).toStrictEqual([1, 2, 3, 4]);
  expect(push(seq, 6)).toStrictEqual([1, 2, 3, 4, 5, 6]);
  expect(shift(seq)).toStrictEqual([2, 3, 4, 5]);
  expect(unshift(seq, 0)).toStrictEqual([0, 1, 2, 3, 4, 5]);
  expect(sort(seq, (a, b) => b - a)).toStrictEqual([5, 4, 3, 2, 1]);

  // 元の配列は変更されていない
  expect(seq).toStrictEqual([1, 2, 3, 4, 5]);
});
