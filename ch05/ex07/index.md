### 予想される出力

`true`

### 実際の実行結果

`false`

### 上記の結果になった理由

3行目のreturn文でtry節を抜ける前に、finally文が実行される。

```javascript
function f() {
  try {
    return true;
  } finally {
    return false;
  }
}
```

そのため、finally節にある`return false`が先に実行され、関数の返り値として`false`が渡る。
