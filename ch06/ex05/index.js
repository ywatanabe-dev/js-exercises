const obj1 = {
  3: "obj1:3",
  2: "obj1:2",
  1: "obj1:1",
  d: "obj1:d",
  c: "obj1:c",
  b: "obj1:b",
};

Object.defineProperty(obj1, "enumerable", {
  value: "obj1:enumerable",
  writable: true,
  configurable: true,
  enumerable: true,
});

const obj2 = Object.create(obj1);

obj2[4] = "obj2:4";
obj2[2] = "obj2:2";
obj2[0] = "obj2:0";
obj2["e"] = "obj2:e";
obj2["c"] = "obj2:c";
obj2["a"] = "obj2:a";

Object.defineProperty(obj2, "enumerable", {
  value: "obj2:enumerable",
  writable: true,
  configurable: true,
  enumerable: false,
});

/**
 * 以下のように表示される。
 * 適用される表示規則は、
 * 独自プロパティ→プロトタイプオブジェクトのプロパティ
 * 非負の整数→文字列
 * 非負の整数は小さい順に列挙
 * 文字列は追加順
 * リテラルで定義された場合は、リテラル中での記述順
 * ただし、一度列挙されたプロパティと同名のプロパティは列挙しない
 *
 * 0 obj2:0
 * 2 obj2:2
 * 4 obj2:4
 * e obj2:e
 * c obj2:c
 * a obj2:a
 * 1 obj1:1
 * 3 obj1:3
 * d obj1:d
 * b obj1:b
 */
for (const prop in obj2) {
  console.log(prop, obj2[prop]);
}
