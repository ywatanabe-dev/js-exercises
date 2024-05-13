import { EsModule1, test3, test2 } from "./esmodule2.js";

const esm1 = new EsModule1("a", "b");
console.log(esm1.getA()); // => a
console.log(esm1.getB()); // => b
test3(); // => test1
test2.prop1 = false;
console.log(test2.prop1); // => false
console.log(test2.prop2); // => 0
