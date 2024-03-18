import { newHashTable } from "./index.js";

describe("HashTable", () => {
  it("sample", () => {
    const hashTable = newHashTable();
    hashTable.put("key1", "value1");
    hashTable.put("key2", { value: "value2" });

    // console.log(`size=${hashTable.size}`); // => size=2
    expect(hashTable.size).toBe(2);
    // console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
    expect(hashTable.get("key1")).toBe("value1");
    // console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}
    expect(hashTable.get("key2")).toStrictEqual({ value: "value2" });

    hashTable.put("key2", "new value");

    // console.log(`key2=${hashTable.get("key2")}`); // => key2=new value
    expect(hashTable.get("key2")).toBe("new value");

    hashTable.remove("key2");

    // console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
    expect(hashTable.get("key2")).toBe(undefined);
    // console.log(`size=${hashTable.size}`); // => size=1
    expect(hashTable.size).toBe(1);
  });

  it("key=''", () => {
    const hashTable = newHashTable();
    hashTable.put("", "value1");
    expect(hashTable.size).toBe(1);
    hashTable.put("", "value2");
    expect(hashTable.size).toBe(1);
    expect(hashTable.get("")).toBe("value2");
    expect(hashTable.remove("")).toBe(true);
    expect(hashTable.size).toBe(0);
    expect(hashTable.get("")).toBe(undefined);
  });

  it("key='0'~'9'", () => {
    const hashTable = newHashTable();
    for (let i = 0; i < 10; i++) {
      hashTable.put(`${i}`, `value${i}`);
    }

    expect(hashTable.size).toBe(10);

    for (let i = 0; i < 10; i++) {
      expect(hashTable.get(`${i}`)).toBe(`value${i}`);
    }

    expect(hashTable.size).toBe(10);

    for (let i = 0; i < 10; i++) {
      hashTable.put(`${i}`, `value${i}_2`);
    }

    expect(hashTable.size).toBe(10);

    for (let i = 0; i < 10; i++) {
      expect(hashTable.get(`${i}`)).toBe(`value${i}_2`);
    }

    for (let i = 0; i < 10; i++) {
      expect(hashTable.remove(`${i}`)).toBe(true);
    }

    expect(hashTable.size).toBe(0);
  });

  it("key='key0'~'key9'", () => {
    const hashTable = newHashTable();
    for (let i = 0; i < 10; i++) {
      hashTable.put(`key${i}`, `value${i}`);
    }

    expect(hashTable.size).toBe(10);

    for (let i = 0; i < 10; i++) {
      expect(hashTable.get(`key${i}`)).toBe(`value${i}`);
    }

    expect(hashTable.size).toBe(10);

    for (let i = 0; i < 10; i++) {
      hashTable.put(`key${i}`, `value${i}_2`);
    }

    expect(hashTable.size).toBe(10);

    for (let i = 0; i < 10; i++) {
      expect(hashTable.get(`key${i}`)).toBe(`value${i}_2`);
    }

    for (let i = 0; i < 10; i++) {
      expect(hashTable.remove(`key${i}`)).toBe(true);
    }

    expect(hashTable.size).toBe(0);
  });
});
