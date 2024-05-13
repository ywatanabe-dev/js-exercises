CommonJS、ES Module以外のモジュール方式として、[RequireJS](https://requirejs.org/)がある。
RequireJSは、ブラウザだけでなく、Nodeのような実行環境で使うこともできる。

RequireJSを使う場合、`require.js`を取得の上、例えば以下のようなディレクトリ構成にする[^1]。

- project-directory/
  - project.html
  - scripts/
    - main.js
    - require.js
    - helper/
      - util.js

そして、HTMLファイルで以下のように記述する。

```html
<script data-main="scripts/main" src="scripts/require.js"></script>
```

`main.js`では以下のようにモジュールを呼び出すことができる。

```javascript
requirejs(["helper/util"], function(util) {
    // util.jsモジュール内でエクスポートされた値を読み出すことができる
}
```

モジュールを定義する場合の簡単な例[^2]を以下に示す。これらは、モジュールが他のモジュールに依存していない場合の例である。`color`、`size`のプロパティを持つオブジェクトがエクスポートされる。

- 単純なキー/値のペアとして定義する場合

  ```javascript
  define({
    color: "black",
    size: "unisize",
  });
  ```

- 関数として定義する場合

  エクスポートする前に、何らかのセットアップが必要な場合はこちらの方法を使う。

  ```javascript
  define(function () {
    // なんらかのセットアップを行う

    return {
      color: "black",
      size: "unisize",
    };
  });
  ```

[^1]: https://requirejs.org/docs/start.html
[^2]: https://requirejs.org/docs/api.html#define
