## ブラウザの開発者ツールでソースコードファイルがどのように表示されるか

Firefoxのデバッガータブのソースファイルで確認。
「メインスレッド」の項目の下に「webpack」の項目があり、そこを展開するとバンドル前のコード一覧とその内容が確認できた。

## バンドルしたコードの実行中に、バンドル前のソースコードファイルに基づいたブレークポイントの設定や変数の値の確認等のデバッグが可能か

以下の`ctx.stroke()`にブレークポイントを設定してからブラウザ上でセルをクリックすると、同じ場所で処理がブレークすることが確認できた。また、ブレーク後に`cell`や`ctx.fillStyle`の値を確認することもできた。

```javascript
export function renderGrid(ctx, grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
}
```
