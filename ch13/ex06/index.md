jQuery Deferredは、jQueryで提供される非同期実行のための仕組みであり、
後にes6で追加されたJavaScriptのPromiseと近い機能を持つ。
以下、jQuery Deferredに含まれる機能を紹介し、es6のPromiseでは何に対応するかを説明する。

### jQuery.Deferred()^[1]

`jQuery.Deferred()`は`Deferred`オブジェクトを生成するファクトリメソッドである。

```javascript
const jquery = require("jquery");
const $ = jquery(dom.window);

// Deferredオブジェクトを生成
const d = $.Deferred();
```

`Deferred`オブジェクトははじめ`pending`状態である。後述する`then()`や`always()`、`done()`、`fail()`メソッドを
使ってコールバックを登録することができる。

`resolve()`や`resolveWith()`メソッドを呼び出すと、`Deferred`オブジェクトは`resolved`状態に遷移し、
登録されている"doneCallbacks"が実行される。

一方、`reject()`や`rejectWith()`メソッドを呼び出すと、`Deferred`オブジェクトは`rejected`状態に遷移し、
登録されている"failCallbacks"が実行される。

`Deferred`オブジェクトが一度`resolved`状態もしくは`rejected`状態になると、その状態は維持され続ける。
さらにコールバックを追加することもでき、そのコールバックはただちに実行される。

```javascript
// 実行すると、
// B
// A
// の順に表示される

const d = $.Deferred();
// コールバックを登録 resolved状態になると実行される
d.then(() => {
  console.log("A");
});
console.log("B");
d.resolve(); // resolved状態に遷移
```

es6の`Promise`コンストラクタと機能は似るが、`Promise`コンストラクタは引数の関数内で状態遷移まで書く必要がある。

```javascript
const p = new Promise((resolve) => {
  console.log("B");
  resolve();
});
p.then(() => {
  console.log("A");
});
```

### deferred.then()^[2]

`Deferred`オブジェクトがresolvedになった、rejectedになった、または進行中の状態のときに呼び出されるハンドラを登録する。

```javascript
// 実行すると、
// A
// B
// C
// の順に表示される
const d = $.Deferred();
d.then(
  () => {
    // doneCallbacks
    console.log("C");
  },
  null, // failCallbacks
  () => {
    // progressCallbacks
    console.log("B");
  }
);
console.log("A");
d.notify(); // progressCallbacksを呼ぶ
d.resolve(); // doneCallbacksを呼ぶ
```

返り値は`Promise`オブジェクトである。これは`Deferred`オブジェクトの提供するメソッドのうち一部のみを提供するオブジェクトであって、es6の`Promise`とは異なる。

es6の`Promise`の`then()`と同様、チェーンを作ることができる。

```javascript
// 実行すると、
// A
// B
// C
// の順に表示される
const d = $.Deferred();
d.then((value) => {
  console.log(value);
  return "C";
}).then((value) => {
  console.log(value);
});
console.log("A");
d.resolve("B");
```

### deferred.done()^[3]

`Deferred`オブジェクトがresolvedになったときに呼び出されるハンドラを登録する。

返り値として元の`Deferred`オブジェクトを返すので、Builderパターンの要領でハンドラを複数登録できる。(`then()`のチェーンとは異なる)

```javascript
// 実行すると、
// A
// B
// の順に表示される
const d = $.Deferred();
d.done((value) => {
  console.log(value);
}).done((value) => {
  console.log("B");
});
d.resolve("A");
```

es6の`Promise`で同じことをする場合は以下のようにする。

```javascript
const p = new Promise((resolve) => {
  resolve();
});
p.then(() => {
  console.log("A");
});
p.then(() => {
  console.log("B");
});
```

### deferred.fail()^[4]

`done()`と同様、`Deferred`オブジェクトがrejectedになったときに呼び出されるハンドラを登録する。

```javascript
// 実行すると、
// A
// B
// の順に表示される
const d = $.Deferred();
d.fail((value) => {
  console.log(value);
}).fail((value) => {
  console.log("B");
});
d.reject("A");
```

es6の`Promise`で同じことをする場合は以下のようにする。

```javascript
const p = new Promise((resolve, reject) => {
  reject();
});
p.catch(() => {
  console.log("A");
});
p.catch(() => {
  console.log("B");
});
```

### deferred.always()^[5]

`Deferred`オブジェクトがresolved、もしくはrejectedになったときに呼び出されるハンドラを登録する。

```javascript
// 実行すると、
// A
// B
// の順に表示される
const d = $.Deferred();
d.always((value) => {
  console.log(value);
}).always((value) => {
  console.log("B");
});
d.resolve("A");
//d.reject("A"); // rejectの場合も同じ動作になる
```

es6の`Promise`で同じことをする場合は以下のようにする。

```javascript
const p = new Promise((resolve, reject) => {
  resolve();
  //reject(); // rejectの場合も同じ動作になる
});
const f = () => {
  console.log("A");
};

const g = () => {
  console.log("B");
};
p.then(f, f);
p.then(g, g);
```

### deferred.progress()^[6]

`Deferred`オブジェクトが進行中であるという通知を受け取る時に呼び出されるハンドラを登録する。

```javascript
const d = $.Deferred();
// コールバックを登録 進行中の状態で、notify()が呼び出されたとき実行される
d.progress(() => {
  console.log("A");
}).progress(() => {
  console.log("B");
});
d.notify(); // A、Bが表示される
d.notify(); // A、Bが表示される
d.resolve(); // resolved状態に遷移
d.notify(); // A、Bは表示されない
```

es6の`Promise`では同じ機能はない。

### deferred.state()^[7]

`Deferred`オブジェクトの現在の状態を返す。

```javascript
const d = $.Deferred();
d.progress(() => {
  console.log("A");
});

d.done(() => {
  console.log("B");
});
d.notify(); // Aが表示される
console.log(d.state()); // pending
d.resolve(); // Aが表示される
console.log(d.state()); // resolved
```

es6の`Promise`では同じ機能はない。

### deferred.promise()^[8]

元となる`Deferred`オブジェクトから、状態を変更するメソッド(`resolve()`, `reject()`, `notify()`など)を除いた
`Promise`オブジェクトを返す。

es6の`Promise`では同じ機能はない。

### まとめ

そのほか、`resolve()`, `reject()`, `notify()`とは別に、`resolveWith()`, `rejectWith()`, `notifyWith()`という
メソッドが用意されている。これらは、単にコールバックの引数だけでなく、コールバック実行時のcontext(`this`)にも同じ値を渡すことができるメソッドである。これも、es6の`Promise`では同じ機能はない。

以上のように、jQuery Deferredはes6のPromiseと機能的には似るが、es6にはない機能も含まれている。

[1]: https://api.jquery.com/jQuery.Deferred/
[2]: https://api.jquery.com/deferred.then/
[3]: https://api.jquery.com/deferred.done/
[4]: https://api.jquery.com/deferred.fail/
[5]: https://api.jquery.com/deferred.always/
[6]: https://api.jquery.com/deferred.progress/
[7]: https://api.jquery.com/deferred.state/
[8]: https://api.jquery.com/deferred.promise/
