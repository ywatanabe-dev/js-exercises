/**
 * 行列の和
 * 引数a, bの配列内の各要素が同じ長さであることを前提とする
 */
export function addMatrix(a: number[][], b: number[][]): number[][] {
  if (a.length !== b.length)
    throw new TypeError("matrices do not have equal number of rows");
  return a.map((array, i) => {
    if (array.length !== b[i].length)
      throw new TypeError("matrices do not have equal number of columns");
    return array.map((value, j) => value + b[i][j]);
  });
}

/**
 * 行列の積
 * 引数a, bの配列内の各要素が同じ長さであることを前提とする
 */
export function mulMatrix(a: number[][], b: number[][]): number[][] {
  return a.map((array) => {
    if (array.length !== b.length)
      throw TypeError(
        "number of columns in 'a' and number of rows in 'b are different"
      );
    return [...Array(b[0].length)].map((_, i) => {
      return [...Array(b.length)]
        .map((_, j) => {
          return array[j] * b[j][i];
        })
        .reduce((x, y) => x + y, 0);
    });
  });
}
