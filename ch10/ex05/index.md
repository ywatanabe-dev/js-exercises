### 10.3のコード　(Nodeのモジュール方式)で試した場合

VSCodeのリファクタ機能を使い、module1.cjs、module2.cjsを以下のように変更した。

```javascript
// Module1から変更
module.exports = class Module10 {
  #a;
  #b;
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  // getAから変更
  getA0() {
    return this.a;
  }

  // getBから変更
  getB0() {
    return this.b;
  }
};
```

```javascript
// aから変更
exports.a0 = 0;

// bから変更
exports.b0 = {
  a: true,
  b: "module2",
};
```

この変更に伴い、index.cjsは次のように書き換わった。

クラス定義(正確にいうと、コンストラクタ関数定義)を直接読み取って代入している`Module1`は、元のコードで名前が変わっていても影響を受けない。一方、`Module1`のインスタンス`module1`の持つメンバ関数、オブジェクト`Module2`の持つプロパティの名前が元のコードで変更されると、使用先でも自動的に名前が変更される。

```javascript
const Module1 = require("./module1.cjs");
const Module2 = require("./module2.cjs");

const module1 = new Module1("a", "b");
// getAから書き換わり
console.log(module1.getA0()); // => a
// getBから書き換わり
console.log(module1.getB0()); // => b

// aから書き換わり
console.log(Module2.a0); // => true
// bから書き換わり
console.log(Module2.b0); // => "module2"
```

### 10.4のコード(ES6のモジュール方式)で試した場合

VSCodeのリファクタ機能を使い、esmodule1.jsを以下のように変更した。

```javascript
// DefalutClassから変更
export default class DefalutClass1 {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  getA() {
    return this.a;
  }

  getB() {
    return this.b;
  }
}

// test1から変更
export function test10() {
  console.log("test1");
}

// test2から変更
export const test20 = {
  prop1: true,
  prop2: 0,
};
```

この変更に伴い、esmodule2.jsは次のように書き換わった。

コード中のコメントにあるように、デフォルトエクスポートはエクスポート先で名前を付けるため影響なし。それ以外は名前変更に伴い自動的に書き換わるが、再エクスポートではさらなるエクスポート先に影響がないよう、`as 〇〇(変更前の名前)`が自動的に付与される。

```javascript
// デフォルトエクスポートは、"default"の名前のままなので影響なし
// test1 -> test10、test2 -> test20の名前変更は影響あり
// ただし、test1はtest3として名前変更を伴うインポートをしているため、コード本体側には影響なし
import { default as EsModule1, test10 as test3, test20 } from "./esmodule1.js";
// 再エクスポートでは、test2 -> test20の変更の影響が再エクスポート先に及ばないよう、"as test2"が付与される
export {
  default as EsModule1,
  test10 as test3,
  test20 as test2,
} from "./esmodule1.js";

const esm1 = new EsModule1("a", "b");
console.log(esm1.getA()); // => a
console.log(esm1.getB()); // => b
test3(); // => test1
console.log(test20.prop1); // => true
console.log(test20.prop2); // => 0
```
