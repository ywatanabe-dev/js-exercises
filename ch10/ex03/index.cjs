const Module1 = require("./module1.cjs");
const Module2 = require("./module2.cjs");

const module1 = new Module1("a", "b");
console.log(module1.getA()); // => a
console.log(module1.getB()); // => b

console.log(Module2.a); // => true
console.log(Module2.b); // => "module2"
