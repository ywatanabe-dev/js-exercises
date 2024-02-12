### `void 0`が使われていた理由

グローバルオブジェクトのプロパティ`undefined`は、通常`undefined`の値を持つ。
また、2009年12月に公開されたECMAScript 5th[^1]で、プロパティ`undefined`は以下の属性を持つと規定されている[^2]。

```
{ [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }
```

このうち、属性`Writable`は、プロパティに関連づけられた値を代入演算子で変更することができるかどうかを意味する[^3]。
この仕様により、上記仕様に準拠した処理系では、プロパティ`undefined`の値を書き換えることはできない。

```javascript
// ECMAScript 5th以降は以下のコードを実行しても、`undefined`の値を0にすることはできない
// 厳格モードでは実行時にTypeErrorが発生する
undefined = 0;
```

一方、ECMAScript 5thのひとつ前の規格であるECMAScript 3rd[^4]では、プロパティ`undefined`は以下の属性を持つと規定されており[^5]、代入演算子による変更を禁じていない。

```
{ DontEnum, DontDelete}
```

そのため、ECMAScript 5thに準拠した処理系が使われる前の時代では、プロパティ`undefined`に`undefiened`の値が
入っている確証がなく、確実に`undefiend`の値を返す方法として、代わりに`void 0`が使われていた。
前述したECMAScript 5thで追加された仕様により、現在はこの方法は使われない。

[^1]: https://ecma-international.org/wp-content/uploads/ECMA-262_5th_edition_december_2009.pdf
[^2]: [^1]の15.1.1.3参照
[^3]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#writable
[^4]: https://ecma-international.org/wp-content/uploads/ECMA-262_3rd_edition_december_1999.pdf
[^5]: [^4]の15.1.1.3参照
