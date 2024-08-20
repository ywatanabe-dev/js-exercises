tailwind CSSは、ユーティリティファースト[1]を標榜するCSSフレームワークである。

従来、CSSを使ってwebページにカスタムデザインを適用する場合は、cssファイルにカスタムCSSを用意する必要があった。

(例)ex01のAddボタンの要素に適用されるカスタムCSS

```css
/* ボタンのデザイン */
button {
  padding: 5px 10px; /* ボタン内側の余白のサイズ */
  border: 2px solid #00ff00; /* 境界線のデザイン */
  background-color: #000; /* ボタン内側の色 */
  color: #00ff00; /* ボタン内文字の色 */
  font-weight: bold; /* ボタン内文字の太さ */
  cursor: pointer; /* ボタンに合わせた時のカーソルのスタイル */
}
```

tailwind CSSを使う場合は、既存のクラス(ユーティリティクラス)をHTMLに直接適用して要素の描画を行う。

(例)ex02のAddボタンのHTML要素

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">
  Add
</button>
```

この方法を使う利点は、以下の3点が挙げられる。

1. クラス名を考える苦労がなくなる。
2. 従来は新しい機能を追加するたびにCSSファイルにクラスを追加していく必要があったが、ユーティリティクラスは再利用可能のため新しく追加する必要がほとんどない。
3. CSSはグローバルのため、変更した際の他の部分への副作用が予測しにくい。一方、HTML内に記述されたクラスはローカルなので、他の部分を壊す心配がなくなる。

[1]: https://tailwindcss.com/docs/utility-first
