import {ROWS, COLS} from './index.js';

// Life Game のルールに従ってセルを更新する
export function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map(arr => [...arr]);

  const countTrue = (row, col) => {
    let count = 0;
    if (row > 0 && col > 0 && grid[row - 1][col - 1]) count++;
    if (col > 0 && grid[row][col - 1]) count++;
    if (row < ROWS - 1 && col > 0 && grid[row + 1][col - 1]) count++;

    if (row > 0 && grid[row - 1][col]) count++;
    if (row < ROWS - 1 && grid[row + 1][col]) count++;

    if (row > 0 && col < COLS - 1 && grid[row - 1][col + 1]) count++;
    if (col < COLS - 1 && grid[row][col + 1]) count++;
    if (row < ROWS - 1 && col < COLS - 1 && grid[row + 1][col + 1]) count++;

    return count;
  };

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      const count = countTrue(row, col);
      if (grid[row][col]) {
        nextGrid[row][col] = count === 2 || count === 3;
      } else {
        nextGrid[row][col] = count === 3;
      }
    }
  }
  return nextGrid;
}
