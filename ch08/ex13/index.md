### 以下のコードが問題となる理由

```javascript
function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}
```

上記のコードに対してユーザーが任意の引数`input`を渡せる場合、以下のように任意コードが実行できる。

```javascript
// グローバルオブジェクトのプロパティを作成
globalThis["password"] = "password";

function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

f("`${(() => { console.log(password);return '';})()}`"); // password\nHello, と表示される
```

上記の例では、`Function`コンストラクターの引数にアロー関数の即時実行式の文字列を渡すことで、
グローバルオブジェクトにあるプロパティ`password`の値を表示させている。
このように、`Function`コンストラクターに渡される文字列がJavaScriptコードとして評価されることを利用して、
ユーザーの入力次第で様々なコードが実行できてしまう。

任意のコードが実行できるという点ではch04/ex07で扱った`eval()`に近いが、
`Function`コンストラクターはグローバルスコープしか捕捉できない点が異なる。
そのため、上の場合でも、例えば`f()`の内側で定義された変数の捕捉は不可能である。
