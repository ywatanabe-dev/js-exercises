const obj = {};

Object.defineProperty(obj, "prop1", {
  value: 0,
  writable: true,
  configurable: true,
  enumerable: true,
});

obj.prop1 = 10;
console.log(Object.prototype.hasOwnProperty.call(obj, "prop1")); // => true
console.log(Object.prototype.propertyIsEnumerable.call(obj, "prop1")); // => true
console.log(delete obj.prop1); // => true

Object.defineProperty(obj, "prop2", {
  value: 0,
  writable: false,
  configurable: true,
  enumerable: true,
});

// obj.prop2 = 10; // => TypeError: Cannot assign to read only property
console.log(Object.prototype.hasOwnProperty.call(obj, "prop2")); // => true
console.log(Object.prototype.propertyIsEnumerable.call(obj, "prop2")); // => true
console.log(delete obj.prop2); // => true

Object.defineProperty(obj, "prop3", {
  value: 0,
  writable: true,
  configurable: false,
  enumerable: true,
});

obj.prop3 = 10;
console.log(Object.prototype.hasOwnProperty.call(obj, "prop3")); // => true
console.log(Object.prototype.propertyIsEnumerable.call(obj, "prop3")); // => true
// console.log(delete obj.prop3); // => TypeError: Cannot delete property

Object.defineProperty(obj, "prop4", {
  value: 0,
  writable: true,
  configurable: true,
  enumerable: false,
});

obj.prop4 = 10;
console.log(Object.prototype.hasOwnProperty.call(obj, "prop4")); // => true
console.log(Object.prototype.propertyIsEnumerable.call(obj, "prop4")); // => false
console.log(delete obj.prop4); // => true
