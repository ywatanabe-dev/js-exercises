### 予想

1. import先のコードが実行される。
1. import元の、import文の前のコードが実行される
1. import元の、import文の後のコードが実行される

### 実際の挙動

以下のように、index.js、module.jsを用意し、index.jsを実行する。

- index.js

  ```javascript
  console.log("1");
  import "./module.js";
  console.log("2");
  ```

- module.js

  ```javascript
  console.log("module");
  ```

実行結果は、以下のようになる。したがって、上記の予想と同じ挙動である。

```
module
1
2
```

このような結果になる理由は、ES6の`import`は静的なインポートを行う仕様であり、スクリプト本文が実行される前に`import`による外部モジュールの解決が先に行われるためであると考えられる。
