### 結果の予想

```
false true
true false
```

### 実際の結果

```
false true
true false
```

### この実行結果になる理由

`obj.om()`を呼び出すと、呼び出し先で`nest.nm()`と、`nest.arrow()`が呼ばれる。
`nm()`は通常の関数のため、実行時に呼び出し元のオブジェクトが`this`としてセットされる。
よって、`this === nest`が成り立つため一つ目の`console.log()`は`false, true`となる。
`arrow()`はアロー関数のため、関数が定義された箇所での`this`の値がそのまま実行時の`this`の値にセットされる。
よって、`this === obj`が成り立つため二つ目の`console.log()`は`true, false`となる。
