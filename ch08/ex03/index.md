## 末尾再帰でスタックオーバーフローが起きなくなる最適化ができる理由

書籍にあるように、関数を呼び出しの際はそれまでの実行コンテキストをスタック(コールスタック)に積む必要がある。
例えば以下のような関数の例について考える。

```javascript
// 引数arrayに含まれる数字の和を求める
function sum(array) {
  if (array === []) {
    return 0;
  }
  const x = array.pop();
  return x + sum(array);
}
```

上記の実装で`sum()`が再帰呼び出しされる際、呼び出し元の関数では`sum()`の返り値に`x`を加えて`return`する処理が残っている。この残った処理を後で実行することを記憶するために、前述したように実行コンテキストをコールスタックに積む必要が出てくる。

この関数と等価な計算を行う末尾再帰関数は次のようになる。

```javascript
function sum(array, result = 0) {
  if (array === []) {
    return result;
  }
  const x = array.pop();
  return sum(array, result + x);
}
```

この関数では、第二引数`result`に和を蓄積していき、最終的に全ての和の値となったときに呼び出し元に返すようにしている。
上記の実装で`sum()`が再帰呼び出しされる際、呼び出し元の関数では`sum()`の返り値を`return`する処理が残っているが、
この処理はそのまま呼び出し先の関数の`return`で置き換えることができる。

すなわち、

```javascript
function sum(array, result = 0) {
  if (array === []) {
    return result;
  }
  const x = array.pop();

  // return sum(array, result + x);
  // 擬似的に、呼び出し先の関数の処理を展開
  result = result + x;
  if (array === []) {
    return result;
  }
  const x = array.pop();
  return sum(array, result + x); // このreturnにより、呼び出し元でreturnしたことと同じになる
}
```

というような置き換えができる。

この置き換えをさらに進めていくと、

```javascript
function sum(array, result = 0) {
  if (array === []) {
    return result;
  }
  const x = array.pop();

  result = result + x;

  if (array === []) {
    return result;
  }
  const x = array.pop();

  /* -- 省略 --- */

  if (array === []) {
    return result;
  }
}
```

のような形になり、実質的には下記のループと等価な処理に変換できる。

```javascript
function sum(array, result = 0) {
  while (array !== []) {
    const x = array.pop();
    result = result + x;
  }

  return result;
}
```

処理系が末尾再帰最適化に対応している場合、以上のような変換が内部的に実行される。

(注：上記の置き換え処理は擬似的なものであり、実際の処理系の厳密な動作とは異なると思われる)

この変換により、コールスタックを消費することがなくなるため、再帰呼び出しを繰り返してもスタックオーバーフローが起きなくなる。

## JavaScript で末尾再帰最適化を実装している処理系

safari 17.3 (for macOS)で動作することを確認。結果は`[LOG]: Infinity `となった。
https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA
