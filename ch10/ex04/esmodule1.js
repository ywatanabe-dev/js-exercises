export default class DefalutClass {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  getA() {
    return this.a;
  }

  getB() {
    return this.b;
  }
}

export function test1() {
  console.log("test1");
}

export const test2 = {
  prop1: true,
  prop2: 0,
};
