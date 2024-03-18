### `𠮷野家"[0]`、`"👨‍👨‍👧‍👧"[0]`の結果

```
> "𠮷野家"[0]
'\ud842'
```

```
> "👨‍👨‍👧‍👧"[0]
'\ud83d'
```

### `"𠮷野家"[0]`の結果について

ECMAScriptにおいて、文字列はUTF-16コード単位の並びとして表現される。UTF-16コード単位は16bit(2Byte)長であるため、
2Byteで表せられないコードポイントを持つ文字を扱う際は、コード単位のペアを用いる。両者を区別するため、コード単位のペアで文字を表現する場合は、単一のコード単位をエンコードする際に使われない領域(`0xD800`〜`0xDFFF`)の値を二つ組み合わせて表す。

具体的には、`0xD800`〜`0xDBFF`の範囲の高サロゲートと、`0xDC00`〜`0xDFFF`の範囲の低サロゲートと呼ばれる二つのコード単位のペアによって一つのコードポイントが表現される([参考](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_%E6%96%87%E5%AD%97%E3%80%81unicode_%E3%82%B3%E3%83%BC%E3%83%89%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%80%81%E6%9B%B8%E8%A8%98%E7%B4%A0%E3%82%AF%E3%83%A9%E3%82%B9%E3%82%BF%E3%83%BC))。

文字列`"𠮷野家"`を、`charCodeAt()`[^1]によりUTF-16コード単位で切り出すと、次のようになる。

```javascript
console.log("𠮷野家".charCodeAt(0).toString(16)); // => d842
console.log("𠮷野家".charCodeAt(1).toString(16)); // => dfb7
console.log("𠮷野家".charCodeAt(2).toString(16)); // => 91ce
console.log("𠮷野家".charCodeAt(3).toString(16)); // => 5bb6
console.log("𠮷野家".charCodeAt(4).toString(16)); // => NaN (文字の外)
```

上記の値のうち、"𠮷"のコードポイントを表すのは`0xD842`と`0xDFB7`のサロゲートペアであり、"野"および"家"のコードポイントはそれぞれ一つのコード単位`0x91CE`と、`0x5BB6`で表される。

以上より、`"𠮷野家"[0]`が`\ud842`を返すのは、

- ECMAScriptの文字列はUTF-16コード単位の並びとして表現され、
- "𠮷野家"の0番目の要素は"𠮷"を表すサロゲートペア(リテラル表現`\ud842\udfb7`)のうちの高サロゲートの値である

ためであると考えられる。

### `"👨‍👨‍👧‍👧"[0]`の結果について

ユーザが１文字として認識するものは、単一のUnicodeコードポイントだけで表されるもの以外に、複数のUnicodeコードポイントから構成されるものも含まれる。このような文字を扱うために、「書記素クラスター(grapheme cluster)」が使われる[^2]。

Unicodeの絵文字の場合、`ZWJ`(ゼロ幅接合子:U+200D)を絵文字と絵文字の間に挟むことで絵文字シーケンスを形成でき[^3]、これらは単一の書記素クラスターとして扱われる[^4]。

```
emoji_sequence :=
  emoji_core_sequence
| emoji_zwj_sequence
| emoji_tag_sequence

emoji_zwj_sequence :=
  emoji_zwj_element ( ZWJ emoji_zwj_element )+

ZWJ := \x{200d}
```

さて、"👨‍👨‍👧‍👧"は、UTF-16コード単位で表すと以下のようになる。

```javascript
console.log("👨‍👨‍👧‍👧".charCodeAt(0).toString(16)); // => d83d
console.log("👨‍👨‍👧‍👧".charCodeAt(1).toString(16)); // => dc68
console.log("👨‍👨‍👧‍👧".charCodeAt(2).toString(16)); // => 200d
console.log("👨‍👨‍👧‍👧".charCodeAt(3).toString(16)); // => d83d
console.log("👨‍👨‍👧‍👧".charCodeAt(4).toString(16)); // => dc68
console.log("👨‍👨‍👧‍👧".charCodeAt(5).toString(16)); // => 200d
console.log("👨‍👨‍👧‍👧".charCodeAt(6).toString(16)); // => d83d
console.log("👨‍👨‍👧‍👧".charCodeAt(7).toString(16)); // => dc67
console.log("👨‍👨‍👧‍👧".charCodeAt(8).toString(16)); // => 200d
console.log("👨‍👨‍👧‍👧".charCodeAt(9).toString(16)); // => d83d
console.log("👨‍👨‍👧‍👧".charCodeAt(10).toString(16)); // => dc67
console.log("👨‍👨‍👧‍👧".charCodeAt(11).toString(16)); // => NaN (文字の外)
```

`0x200D`はゼロ幅接合子であるから、この絵文字は実質`0xD83D`と`0xDC68`のサロゲートペアのコードポイント("👨")と`0xD83D`と`0xDC67`のサロゲートペアのコードポイント("👧")で構成される書記素クラスターである。

以上より、`"👨‍👨‍👧‍👧"[0]`は"👨"を表すサロゲートペア(リテラル表現`\ud83d\udc68`)のうちの高サロゲートの値が返ることが分かる。

[^1]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
[^2]: https://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries
[^3]: https://www.unicode.org/reports/tr51/#def_emoji_zwj_sequence
[^4]: https://www.unicode.org/reports/tr51/#def_emoji_sequence
