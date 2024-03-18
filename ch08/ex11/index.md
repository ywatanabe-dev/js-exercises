以下、node v18.17.0で検証を行った。

## 自作関数の`toString()`の結果

通常の関数(`function`キーワードを使って定義された関数)と、アロー関数について、
`toString()`を呼び出した結果を以下に示す。

- コード

  ```javascript
  function f(input) {
    console.log(input);
  }

  const g = (input) => console.log(input);

  console.log(f.toString());
  console.log(g.toString());
  ```

- 実行結果

  ```
  function f(input) {
  console.log(input);
  }
  (input) => console.log(input)
  ```

結果から、関数のソースコードがそのまま返されることがわかる。

## 組み込み関数の`toString()`の結果

組み込み関数`console.log()`と、その関数を別の変数に代入したものについて、
`toString()`を呼び出した結果を以下に示す。

- コード

  ```javascript
  const h = console.log;

  console.log(console.log.toString());
  console.log(h.toString());
  ```

- 実行結果

  ```
  function () { [native code] }
  function () { [native code] }
  ```

結果から、組み込み関数・組み込み関数を別の変数に代入した結果の関数どちらの場合でも、
固定の文字列`function () { [native code] }`が返されることがわかる。
