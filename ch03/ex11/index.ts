function symbolExample1() {
  const prop1 = Symbol("propname");
  const prop2 = Symbol("propname");

  const obj: Record<symbol, unknown> = {};
  obj[prop1] = 1;
  obj[prop2] = 2;

  console.log(obj[prop1]); // => 1
  console.log(obj[prop2]); // => 2
}

function symbolExample2() {
  const prop1 = Symbol.for("propname");
  const prop2 = Symbol.for("propname"); // prop1 === prop2

  const obj: Record<symbol, unknown> = {};
  obj[prop1] = 1;
  obj[prop2] = 2; // 前の行で代入した値を上書き

  console.log(obj[prop1]); // => 2
  console.log(obj[prop2]); // => 2
}

symbolExample1();
symbolExample2();
