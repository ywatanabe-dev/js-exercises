import { DynamicSizeArray } from "./index.js";

function push_num_to_array(array, n) {
  for (let i = 0; i < n; i++) {
    array.push(i);
  }
}

function push_char_to_array(array, n) {
  for (let i = 0; i < n; i++) {
    array.push(String(i));
  }
}

function add_one_to_array(array) {
  for (let i = 0; i < array.len; i++) {
    array.set(i, array.get(i) + 1);
  }
}

function add_char_one_to_array(array) {
  for (let i = 0; i < array.len; i++) {
    array.set(i, String(Number(array.get(i)) + 1));
  }
}

describe("DynamicSizeArray", () => {
  it("create array [0]", () => {
    const array = new DynamicSizeArray();
    push_num_to_array(array, 1);
    expect(array.get(0)).toBe(0);
    expect(array.len).toBe(1);
    add_one_to_array(array);
    for (let i = 0; i < array.len; i++) {
      expect(array.get(i)).toBe(i + 1);
    }
  });

  it("create array [0, 1]", () => {
    const array = new DynamicSizeArray();
    push_num_to_array(array, 2);
    expect(array.get(1)).toBe(1);
    expect(array.len).toBe(2);
    add_one_to_array(array);
    for (let i = 0; i < array.len; i++) {
      expect(array.get(i)).toBe(i + 1);
    }
  });

  it("create array [0, 1, 2, 3, 4]", () => {
    const array = new DynamicSizeArray();
    push_num_to_array(array, 5);
    expect(array.get(4)).toBe(4);
    expect(array.len).toBe(5);
    add_one_to_array(array);
    for (let i = 0; i < array.len; i++) {
      expect(array.get(i)).toBe(i + 1);
    }
  });

  it("create array [0, 1, 2, 3, 4, 5, 6, 7, 8]", () => {
    const array = new DynamicSizeArray();
    push_num_to_array(array, 9);
    expect(array.get(8)).toBe(8);
    expect(array.len).toBe(9);
    add_one_to_array(array);
    for (let i = 0; i < array.len; i++) {
      expect(array.get(i)).toBe(i + 1);
    }
  });

  it("create array [0, 1, 2, 3, ..., 16]", () => {
    const array = new DynamicSizeArray();
    push_num_to_array(array, 17);
    expect(array.get(16)).toBe(16);
    expect(array.len).toBe(17);
    add_one_to_array(array);
    for (let i = 0; i < array.len; i++) {
      expect(array.get(i)).toBe(i + 1);
    }
  });

  it("create array ['0']", () => {
    const array = new DynamicSizeArray();
    push_char_to_array(array, 1);
    expect(array.get(0)).toBe("0");
    expect(array.len).toBe(1);
    add_char_one_to_array(array);
    for (let i = 0; i < array.len; i++) {
      expect(array.get(i)).toBe(String(i + 1));
    }
  });

  it("create array [0, 1]", () => {
    const array = new DynamicSizeArray();
    push_char_to_array(array, 2);
    expect(array.get(1)).toBe("1");
    expect(array.len).toBe(2);
    add_char_one_to_array(array);
    for (let i = 0; i < array.len; i++) {
      expect(array.get(i)).toBe(String(i + 1));
    }
  });

  it("create array [0, 1, 2, 3, 4]", () => {
    const array = new DynamicSizeArray();
    push_char_to_array(array, 5);
    expect(array.get(4)).toBe("4");
    expect(array.len).toBe(5);
    add_char_one_to_array(array);
    for (let i = 0; i < array.len; i++) {
      expect(array.get(i)).toBe(String(i + 1));
    }
  });

  it("get error", () => {
    const array = new DynamicSizeArray();
    push_num_to_array(array, 5);

    expect(() => {
      array.get(5);
    }).toThrow(new Error(`Array index out of range: 5`));
  });

  it("set error", () => {
    const array = new DynamicSizeArray();
    push_num_to_array(array, 5);

    expect(() => {
      array.set(5);
    }).toThrow(new Error(`Array index out of range: 5`));
  });
});
