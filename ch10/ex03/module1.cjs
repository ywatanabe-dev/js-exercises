module.exports = class Module1 {
  #a;
  #b;
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
};
