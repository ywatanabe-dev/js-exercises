### p.276の例

276ページでは、以下のように`modules`オブジェクトに各モジュール名のプロパティを作り、それぞれ即時実行関数の結果を持たせている。即時実行関数は、それぞれのモジュール内でエクスポートしたい値をプロパティに含む`exports`オブジェクトを返す。

```javascript
const modules = {};
function require(moduleName) { return modules[moduleName]; }
modules["sets.js"] = (function() {
    const exports = {};
    // sets.jsファイルの内容をここに記述する。
    exports.BitSet = class BitSet { ... };
    return exports;
}());
modules["stats.js"] = (function() {
    const exports = {};
    // stats.jsファイルの内容をここに記述する。
    const sum = (x, y) => x + y;
    const square = x = > x * x;
    exports.mean = function(data) { ... };
    exports.stddev = function(data) { ... };
    return exports;
}());
```

### mode=noneの場合

webpackをmode=noneで実行した場合、以下のようなコードが生成される(簡略化してある)。p.276の例と比較して、各モジュールの`exports`オブジェクトを格納しているオブジェクトが配列になっている違いがある。

```javascript
var __webpack_modules__ = ([
    ,
    ((__unused_webpack_module, exports) => {
        const sum = (x, y) => x + y;
        const square = x = > x * x;
        exports.mean = function(data) { ... };
        exports.stddev = function(data) { ... };
    }),
    ((__unused_webpack_module, exports) => {
        exports.BitSet = class BitSet { ... };
        exports.BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
        exports.BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);
    })
])

function __webpack_require__(moduleId) {
    var module = {
        exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
}
```

### mode=developmentの場合

webpackをmode=developmentで実行した場合、以下のようなコードが生成される(簡略化してある)。p.276の例と比較して、こちらは各モジュール(およびモジュールの呼び出し先)の実装が`eval()`に渡される文字列として表現されている。

```javascript
var __webpack_modules__ = {
  "./ch10/ex01/index.cjs": (
    __unused_webpack_module,
    __unused_webpack_exports,
    __webpack_require__
  ) => {
    eval(
      'const stats = __webpack_require__(/*! ./stats.cjs */ "./ch10/ex01/stats.cjs");\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ "./ch10/ex01/sets.cjs").BitSet);\nconst s = new BitSet(100);\ns.insert(10);\ns.insert(20);\ns.insert(30);\nconst average = stats.mean([...s]);\n\n\n//# sourceURL=webpack://preset-ts/./ch10/ex01/index.cjs?'
    );
  },
  "./ch10/ex01/sets.cjs": (__unused_webpack_module, exports) => {
    eval(
      "exports.BitSet = class BitSet extends AbstractWritableSet { ... };\n\nexports.BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\nexports.BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);\n\n\n//# sourceURL=webpack://preset-ts/./ch10/ex01/sets.cjs?"
    );
  },
  "./ch10/ex01/stats.cjs": (__unused_webpack_module, exports) => {
    eval(
      "const sum = (x, y) => x + y;\nconst square = (x) => x * x;\nexports.mean = (data) => data.reduce(sum) / data.length;\nexports.stddev = function (d) { ... };\n\n\n//# sourceURL=webpack://preset-ts/./ch10/ex01/stats.cjs?"
    );
  },
};

function __webpack_require__(moduleId) {
  var module = {
    exports: {},
  };
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  return module.exports;
}

var __webpack_exports__ = __webpack_require__("./ch10/ex01/index.cjs");
```

### mode=productionの場合

バンドルされた結果のコードは難読化される。
