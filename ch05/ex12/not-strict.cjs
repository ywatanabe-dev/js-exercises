// with文の使用
const a = {
  b: {
    x: 0,
    y: 1,
    z: 2,
  },
};
with (a.b) {
  (x = 1), (y = 2), (z = 3);
}

// 宣言していない変数の使用
// (strictモードではReferenceErrorがスローされる)
b = 0;

function f() {
  this.console.log("f()");
}
// 関数として呼び出された関数中でthisはグローバルオブジェクトとなる
f();

// call()、apply()の第1引数をnull、undefinedで呼び出すと
// thisはグローバルオブジェクトとして扱われる
f.call(null);
f.apply(undefined);

// 書き込み不可(nonwritable)なプロパティへの代入
//globalThis.undefined = 0;

// 外からeval内部のスコープの変数にアクセス
const c = {};
eval('c["a"] = 10');
console.log(c.a);

// 引数とargumentsの要素が同一の参照を持つ
function g(a, b, c) {
  console.log(arguments);
  arguments[0] = { x: 0, y: 1 };
  console.log(a.x);
}
g(0, 1, 2);

// 変数の識別子をdeleteできる
const d = 0;
console.log(delete d);

// 再定義不可のプロパティを削除
console.log(delete globalThis.undefined);

// オブジェクトリテラルで、同じ名前で複数のプロパティを定義可能
const e = { a: 0, a: 1 };

// 関数宣言時、同じ名前で複数のパラメータを定義可能
function h(a, a) {}

// 8進数リテラルが使用できる
console.log(010);

// evalやarguments識別子の値を変更可能
eval = 0;
arguments = 0;

// arguments.caller/calleeを呼び出し可能
// Function.caller/Function.argumentsを呼び出し可能
function i() {
  j(0);
}
function j(a) {
  console.log(arguments.caller); // 廃止
  console.log(arguments.callee); // Function jを返す
  console.log(j.caller); // Function iを返す
  console.log(j.arguments); // { '0': 0 }を返す
}
i();
