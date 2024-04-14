export class C {
  #x = 42;

  getX() {
    return this.#x;
  }
}

export function C_Closure() {}

C_Closure.prototype = (() => {
  const x = 42;

  return {
    getX: () => {
      return x;
    },
  };
})();
