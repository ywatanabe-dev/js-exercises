class Example {
  number: number;
  string: string;

  constructor(n: number, s: string) {
    this.number = n;
    this.string = s;
  }

  valueOf() {
    return this.number;
  }

  toString() {
    return this.string;
  }
}

const obj = new Example(10, "example");

console.log(Number(obj)); // => 10
console.log(String(obj)); // => "example"
