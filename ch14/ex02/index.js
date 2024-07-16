export class MyArrayLike {
  get length() {
    return Object.getOwnPropertyNames(this).length;
  }
  // lengthは常に今のオブジェクトを見て長さを返すので、setは無視する。
  set length(value) {}
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
