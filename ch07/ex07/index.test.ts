import { sort } from "./index.ts";

describe("sort", () => {
  it("sort([]) => []", () => {
    const array: number[] = [];
    sort(array);
    expect(array).toStrictEqual([]);
  });

  it("sort([0]) => [0]", () => {
    const array: number[] = [0];
    sort(array);
    expect(array).toStrictEqual([0]);
  });

  it("sort([1, 0]) => [0, 1]", () => {
    const array: number[] = [1, 0];
    sort(array);
    expect(array).toStrictEqual([0, 1]);
  });

  it("sort([1, 1]) => [1, 1]", () => {
    const array: number[] = [1, 1];
    sort(array);
    expect(array).toStrictEqual([1, 1]);
  });

  it("sort([3, 2, 1]) => [1, 2, 3]", () => {
    const array: number[] = [3, 2, 1];
    sort(array);
    expect(array).toStrictEqual([1, 2, 3]);
  });

  it("sort([3, 2, 1, 3, 2, 1]) => [1, 1, 2, 2, 3, 3]", () => {
    const array: number[] = [3, 2, 1, 3, 2, 1];
    sort(array);
    expect(array).toStrictEqual([1, 1, 2, 2, 3, 3]);
  });

  it("reverse sort([1, 2, 3]) => [3, 2, 1]", () => {
    const array: number[] = [1, 2, 3];
    sort(array, (lhs, rhs) => (lhs < rhs ? +1 : lhs > rhs ? -1 : 0));
    expect(array).toStrictEqual([3, 2, 1]);
  });

  it("reverse sort([1, 2, 3, 1, 2, 3]) => [3, 3, 2, 2, 1, 1]", () => {
    const array: number[] = [1, 2, 3, 1, 2, 3];
    sort(array, (lhs, rhs) => (lhs < rhs ? +1 : lhs > rhs ? -1 : 0));
    expect(array).toStrictEqual([3, 3, 2, 2, 1, 1]);
  });

  it('sort(["c", "b", "a"]) => ["a", "b", "c"]', () => {
    const array: string[] = ["c", "b", "a"];
    sort(array);
    expect(array).toStrictEqual(["a", "b", "c"]);
  });

  it('sort(["c", "b", "a", "c", "b", "a"]) => ["a", "a", "b", "b", "c", "c"]', () => {
    const array: string[] = ["c", "b", "a", "c", "b", "a"];
    sort(array);
    expect(array).toStrictEqual(["a", "a", "b", "b", "c", "c"]);
  });

  it('reverse sort(["a", "b", "c"]) => ["c", "b", "a"]', () => {
    const array: string[] = ["a", "b", "c"];
    sort(array, (lhs, rhs) => (lhs < rhs ? +1 : lhs > rhs ? -1 : 0));
    expect(array).toStrictEqual(["c", "b", "a"]);
  });

  it('reverse sort(["a", "b", "c", "a", "b", "c"]) => "c", "c", "b", "b", "a", "a"', () => {
    const array: string[] = ["a", "b", "c", "a", "b", "c"];
    sort(array, (lhs, rhs) => (lhs < rhs ? +1 : lhs > rhs ? -1 : 0));
    expect(array).toStrictEqual(["c", "c", "b", "b", "a", "a"]);
  });
});
