function f(input) {
  console.log(input);
}

const g = (input) => console.log(input);

const h = console.log;

console.log(f.toString());
console.log(g.toString());
console.log(console.log.toString());
console.log(h.toString());
