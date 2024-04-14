export class C {
  constructor() {
    this.C.method = () => 5;
    this.C.prototype = {
      method: () => 6,
    };
  }

  static method() {
    return 1;
  }

  method() {
    return 2;
  }

  static C = function () {};
  C = function () {};
}

C.C.method = () => 3;
C.C.prototype.method = () => 4;
