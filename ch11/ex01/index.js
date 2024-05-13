export class TypeMap {
  #map;

  constructor() {
    this.#map = new Map();
  }

  set(type, value) {
    if (
      (type === String && typeof value === "string") ||
      (type === Number && typeof value === "number") ||
      (type === BigInt && typeof value === "bigint") ||
      (type === Boolean && typeof value === "boolean") ||
      (type === Symbol && typeof value === "symbol") ||
      value instanceof type
    ) {
      this.#map[type] = value;
      return;
    }

    throw new Error();
  }

  get(type) {
    return this.#map[type];
  }
}
