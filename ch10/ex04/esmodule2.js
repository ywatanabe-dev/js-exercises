import { default as EsModule1, test1 as test3, test2 } from "./esmodule1.js";
// import EsModule1, { test1, test2 } from "./esmodule1.js"; とも書ける
export { default as EsModule1, test1 as test3, test2 } from "./esmodule1.js";

const esm1 = new EsModule1("a", "b");
console.log(esm1.getA()); // => a
console.log(esm1.getB()); // => b
test3(); // => test1
console.log(test2.prop1); // => true
console.log(test2.prop2); // => 0
