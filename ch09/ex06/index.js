export class TypedMap {
  #map;
  get size() {
    return this.#map.size;
  }

  constructor(keyType, valueType, entries) {
    // entriesが指定されている場合、型をチェックする。
    if (entries) {
      for (const [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
      }
    }
    // (型チェックされた)entriesを使って、スーパークラスを初期化する。
    this.#map = new Map(entries);
    // 次に、型を保存して、サブクラスを初期化する。
    this.keyType = keyType;
    this.valueType = valueType;
  }

  // set()メソッドを再定義して、マップに追加されるキーと値のペアに対して
  // 型チェックを行うようにする。
  set(key, value) {
    // keyやvalueの型が異なっている場合は、エラーをスローする。
    if (this.keyType && typeof key !== this.keyType) {
      console.log(key);
      console.log(typeof key);
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
    // 型が正しい場合、スーパークラスのset()メソッドを呼び出し、
    // エントリをマップに追加する。スーパークラスから返されたものを
    // そのまま返す。
    return this.#map.set(key, value);
  }

  clear() {
    this.#map.clear();
  }

  delete(key) {
    return this.#map.delete(key);
  }

  get(key) {
    return this.#map.get(key);
  }

  has(key) {
    return this.#map.has(key);
  }

  [Symbol.iterator]() {
    return this.#map[Symbol.iterator];
  }

  keys() {
    return this.#map.keys();
  }

  values() {
    return this.#map.values();
  }

  entries() {
    return this.#map.entries();
  }

  forEach(fn) {
    this.#map.forEach(fn);
  }
}
