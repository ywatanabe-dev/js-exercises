// with文の使用
// => 直接アクセスする
const a = {
  b: {
    x: 0,
    y: 1,
    z: 2,
  },
};
a.b.x = 1;
a.b.y = 2;
a.b.z = 3;

// 宣言していない変数の使用
// (strictモードではReferenceErrorがスローされる)
// => constで修飾して宣言にする
const b = 0;

function f() {
  this.console.log("f()");
}
// 関数として呼び出された関数中でthisはグローバルオブジェクトとなる
// => globalThisのプロパティにして呼び出す
globalThis["f"] = f;
globalThis.f();

// call()、apply()の第1引数をnull、undefinedで呼び出すと
// thisはグローバルオブジェクトとして扱われる
// => globalThisを渡す
f.call(globalThis);
f.apply(globalThis);

// 書き込み不可(nonwritable)なプロパティへの代入
// => 書き込み権限の変更は不可なため、修正不可能
// globalThis.undefined = 0;

// 外からeval内部のスコープの変数にアクセス
// => eval内部からはアクセスできる
const c = {};
eval('c["a"] = 10; console.log(c.a)');

// 引数とargumentsの要素が同一の参照を持つ
// => strictモードでは引数とargumentsの要素は参照が異なるため、引数を直接書き換える
function g(a, b, c) {
  console.log(arguments);
  a = { x: 0, y: 1 };
  console.log(a.x);
}
g(0, 1, 2);

// 変数の識別子をdeleteできる
// => 修正不可能
// const d = 0;
// console.log(delete d);

// 再定義不可のプロパティを削除
// => 修正不可能
// console.log(delete globalThis.undefined);

// オブジェクトリテラルで、同じ名前で複数のプロパティを定義可能
// => 修正不可能
// const e = { a: 0, a: 1 };

// 関数宣言時、同じ名前で複数のパラメータを定義可能
// => 修正不可能
// function h(a, a) {}

// 8進数リテラルが使用できる
// => strictモードでも0oで8進数リテラルが表せられる
console.log(0o10);

// evalやarguments識別子の値を変更可能
// => 修正不可能
// eval = 0;
// arguments = 0;

// arguments.caller/calleeを呼び出し可能
// Function.caller/Function.argumentsを呼び出し可能
// => 修正不可能
function i() {
  j(0);
}
function j(a) {
  // console.log(arguments.caller); // 廃止
  // console.log(arguments.callee); // Function jを返す
  // console.log(j.caller); // Function iを返す
  // console.log(j.arguments); // { '0': 0 }を返す
}
i();
