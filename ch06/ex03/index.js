const o = {};
o.x = 1;
const p = Object.create(o);
p.y = 2;
const q = Object.create(p);
q.z = 3;
console.log(q.x + q.y); // => 3

console.log(Object.prototype.isPrototypeOf.call(o, p)); // => true
console.log(Object.prototype.isPrototypeOf.call(o, q)); // => true
console.log(Object.prototype.isPrototypeOf.call(o, q)); // => true

console.log(Object.prototype.isPrototypeOf.call(Object.prototype, Array)); // => true
console.log(Object.prototype.isPrototypeOf.call(Object.prototype, Date)); // => true
console.log(Object.prototype.isPrototypeOf.call(Object.prototype, Map)); // => true

console.log(Object.prototype.isPrototypeOf.call(Array.prototype, Object)); // => false
console.log(Object.prototype.isPrototypeOf.call(Array.prototype, Date)); // => false
console.log(Object.prototype.isPrototypeOf.call(Array.prototype, Map)); // => false

console.log(Object.prototype.isPrototypeOf.call(Date.prototype, Object)); // => false
console.log(Object.prototype.isPrototypeOf.call(Date.prototype, Array)); // => false
console.log(Object.prototype.isPrototypeOf.call(Date.prototype, Map)); // => false

console.log(Object.prototype.isPrototypeOf.call(Map.prototype, Object)); // => false
console.log(Object.prototype.isPrototypeOf.call(Map.prototype, Array)); // => false
console.log(Object.prototype.isPrototypeOf.call(Map.prototype, Date)); // => false

console.log(Object.getOwnPropertyNames(Array.prototype));

// 以上の結果から、
// Array、Date、MapはいずれもObject.prototypeをプロトタイプチェーンに持つが、
// Date、MapはArray.prototypeをプロトタイプチェーンに持たず、
// Array、MapはDate.prototypeをプロトタイプチェーンに持たず、
// Array、DateはMap.prototypeをプロトタイプチェーンに持たない。
