## グローバルオブジェクトを参照する方法(ブラウザ内、Node内、ブラウザnode問わず)

### ブラウザ内

ブラウザでは、グローバルオブジェクトとして、`Window`オブジェクトが用意されている。
`Window`オブジェクトを参照するには、自己を参照する`window`プロパティを使えばよい。

### Node内

Nodeでグローバルオブジェクトを参照するには、`global`プロパティを使う。

### ブラウザnode問わず

ES2020からは、ブラウザ・Node問わずにグローバルオブジェクトを参照するためのプロパティとして、
`globalThis`が用意されている。

## ブラウザ独自のグローバルオブジェクトのプロパティやメソッドの例

- window.customElements[^1]
- window.document[^2]
- window.frames[^3]
- window.history[^4]
- window.innerHeight[^5]
- window.menubar[^6]
- window.navigator[^7]
- window.moveTo[^8]
- window.scroll[^9]
- window.onclick[^10]

## `undefined`について、過去のES仕様で起きた問題

Node環境で`Object.getOwnPropertyNames(global)`、ブラウザ環境で`Object.getOwnPropertyNames(window)`を実行すると、プロパティ`undefined`(値は`undefined`)が定義されていることが分かる。

グローバルオブジェクトのプロパティの`undefined`について、es3以前は{ DontEnum, DontDelete}(列挙不可、削除不可)の属性のみ付与されていた[^12]ため、`undefined`プロパティを書き換えることが可能であり、値が常に`undefined`である保証がなかった。

es5以降は属性{ [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }が付与されている[^11]。これにより、`undefined`プロパティの値が後から書き換えられることはなくなった(ローカルスコープで同名の変数を定義した場合を除く)。

[1]: https://developer.mozilla.org/docs/Web/API/Window/customElements
[2]: https://developer.mozilla.org/docs/Web/API/Window/document
[3]: https://developer.mozilla.org/docs/Web/API/Window/frames
[4]: https://developer.mozilla.org/docs/Web/API/Window/history
[5]: https://developer.mozilla.org/docs/Web/API/Window/innerHeight
[6]: https://developer.mozilla.org/docs/Web/API/Window/menubar
[7]: https://developer.mozilla.org/docs/Web/API/Window/navigator
[8]: https://developer.mozilla.org/docs/Web/API/Window/moveTo
[9]: https://developer.mozilla.org/docs/Web/API/Window/scroll
[10]: https://developer.mozilla.org/ja/docs/Web/API/Element/click_event
[11]: https://tc39.es/ecma262/multipage/global-object.html#sec-undefined
[12]: https://www-archive.mozilla.org/js/language/E262-3.pdf
