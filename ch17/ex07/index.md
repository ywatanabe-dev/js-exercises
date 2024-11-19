## `@babel/preset-typescript`と`tsc`の比較

`@babel/preset-typescript`[1]は、Babel[2]のプリセット設定の一つである。
Babelは主にECMAScript 2015+のコードを古い環境で動かすためのツールチェインであり、以下の機能を有する[3]。

- 構文変換(ES6の構文をES5やそれ以前でも使える構文に変換するなど)
- core-js[4]などのポリフィルによる言語機能の補完
- ソースコード変換

また、Babelの機能の中にはFlowやTypeScriptによる型アノテーションを取り除くものも含まれている(この時使われるのが前述した`@babel/preset-typescript`である)。
ただし、Babel自体は型チェックを行わないことに注意が必要である。

`@babel/preset-typescript`(正確には`preset-typescript`に含まれる`@babel/plugin-transform-typescript`[5])はTypeScriptの型構文に対応しているものの、`tsc`でサポートされているオプショナルチェイニング（`?.`）、null合体演算子（`??`）、クラスプロパティ（`this.#x`）といったJavaScript側のプロポーザルには対応していない。これは、これらの構文がTypeScriptの型構文のみで使われる機能ではないからである。また、前述したようにこのプラグイン自体には方チェックの機能は含まれていない。

以上から、`@babel/preset-typescript`はあくまでTypeScriptコードの型アノテーションを取り除くトランスパイラの役割であり、型チェックまで含めて実行する`tsc`とは用途が異なる。

[1]: https://babeljs.io/docs/babel-preset-typescript
[2]: https://babeljs.io/
[3]: https://babeljs.io/docs
[4]: https://github.com/zloirock/core-js
[5]: https://babeljs.io/docs/babel-plugin-transform-typescript
