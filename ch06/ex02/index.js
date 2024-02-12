const obj = {
  a: 10,
  b: 20,
};

const new_obj = Object.create(obj);

console.log(Object.getPrototypeOf(new_obj)); // => { a: 10, b: 20 }
