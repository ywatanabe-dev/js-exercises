import { eq, lte } from "./index.js"; // typescript で書く場合は "./index.ts"

class Test {
  constructor(str, value) {
    this._str = str;
    this._value = value;
  }

  toString() {
    return this._str;
  }
  valueOf() {
    return this._value;
  }
}

function testFunc(str, value) {
  const fn = () => {};
  fn.toString = () => str;
  fn.valueOf = () => value;
  return fn;
}

const hoge1 = new Test("hoge", 1);
const hoge2 = new Test("hoge", 1);

const date1 = new Date("2024-01-12T00:00:00Z");
const date2 = new Date("2024-02-16T00:00:00Z");

function eqTestCase(a, b) {
  return [a, b, a == b];
}

function lteTestCase(a, b) {
  return [a, b, a <= b];
}

// tests for eq
test.each([
  eqTestCase(hoge1, hoge1),
  eqTestCase(hoge1, hoge2),

  eqTestCase("foo", "bar"),
  eqTestCase("bar", "foo"),
  eqTestCase("foo", "foo"),

  eqTestCase(123, 123),
  eqTestCase(123, 456),
  eqTestCase(+0, -0),
  eqTestCase(123, NaN),
  eqTestCase(NaN, NaN),
  eqTestCase(Infinity, Infinity),
  eqTestCase(Infinity, -Infinity),

  eqTestCase(true, true),
  eqTestCase(true, false),
  eqTestCase(false, true),
  eqTestCase(false, false),

  eqTestCase(123, "123"),
  eqTestCase("123", 123),
  eqTestCase(123, "456"),
  eqTestCase("123", 456),

  eqTestCase(true, 1),
  eqTestCase(true, "1"),
  eqTestCase(true, 0),
  eqTestCase(true, ""),
  eqTestCase(false, 1),
  eqTestCase(false, "1"),
  eqTestCase(false, 0),
  eqTestCase(false, ""),

  eqTestCase(1, true),
  eqTestCase("1", true),
  eqTestCase(0, true),
  eqTestCase("", true),
  eqTestCase(1, false),
  eqTestCase("1", false),
  eqTestCase(0, false),
  eqTestCase("", false),

  eqTestCase(0, null),
  eqTestCase(0, undefined),
  eqTestCase(null, undefined),
  eqTestCase(null, 0),
  eqTestCase(undefined, 0),
  eqTestCase(undefined, null),
  eqTestCase(null, null),
  eqTestCase(undefined, undefined),

  eqTestCase(new Test("foo", 1), 1),
  eqTestCase(new Test("foo", 2), 1),
  eqTestCase(new Test("1", {}), 1),
  eqTestCase(new Test("2", {}), 1),
  eqTestCase(new Test("foo", null), 1),
  eqTestCase(new Test("foo", undefined), 1),

  eqTestCase(1, new Test("foo", 1)),
  eqTestCase(1, new Test("foo", 2)),
  eqTestCase(1, new Test("1", {})),
  eqTestCase(1, new Test("2", {})),
  eqTestCase(1, new Test("foo", null)),
  eqTestCase(1, new Test("foo", undefined)),

  eqTestCase(testFunc("foo", 1), 1),
  eqTestCase(testFunc("foo", 2), 1),
  eqTestCase(testFunc("1", {}), 1),
  eqTestCase(testFunc("2", {}), 1),
  eqTestCase(testFunc("foo", null), 1),
  eqTestCase(testFunc("foo", undefined), 1),

  eqTestCase(1, testFunc("foo", 1)),
  eqTestCase(1, testFunc("foo", 2)),
  eqTestCase(1, testFunc("1", {})),
  eqTestCase(1, testFunc("2", {})),
  eqTestCase(1, testFunc("foo", null)),
  eqTestCase(1, testFunc("foo", undefined)),

  eqTestCase(date1, date1.toString()),
  eqTestCase(date1, date1.getTime()),
  eqTestCase(date1.toString(), date1),
  eqTestCase(date1.getTime(), date1),
])("eq(%p, %p) => %p", (a, b, expected) => {
  expect(eq(a, b)).toBe(expected);
});

// tests for lte
test.each([
  lteTestCase(1, 2),
  lteTestCase(2, 1),
  lteTestCase(1, 1),

  lteTestCase("foo", "bar"),
  lteTestCase("bar", "foo"),
  lteTestCase("foo", "foo"),

  lteTestCase(true, true),
  lteTestCase(true, false),
  lteTestCase(false, true),
  lteTestCase(false, false),

  lteTestCase(true, 0),
  lteTestCase(true, 1),
  lteTestCase(null, 0),
  lteTestCase(null, 1),
  lteTestCase(undefined, 3),
  lteTestCase(3, undefined),
  lteTestCase(3, NaN),
  lteTestCase(NaN, 3),

  lteTestCase(new Test("10", 1), 2),
  lteTestCase(new Test("10", 1), 1),
  lteTestCase(new Test("10", {}), 2),
  lteTestCase(new Test("10", {}), 10),
  lteTestCase(new Test("10", null), 10),
  lteTestCase(new Test("10", undefined), 10),

  lteTestCase(2, new Test("10", 1)),
  lteTestCase(1, new Test("10", 1)),
  lteTestCase(2, new Test("10", {})),
  lteTestCase(10, new Test("10", {})),
  lteTestCase(10, new Test("10", null)),
  lteTestCase(10, new Test("10", undefined)),

  lteTestCase(testFunc("10", 1), 2),
  lteTestCase(testFunc("10", 1), 1),
  lteTestCase(testFunc("10", {}), 2),
  lteTestCase(testFunc("10", {}), 10),
  lteTestCase(testFunc("10", null), 10),
  lteTestCase(testFunc("10", undefined), 10),

  lteTestCase(2, testFunc("10", 1)),
  lteTestCase(1, testFunc("10", 1)),
  lteTestCase(2, testFunc("10", {})),
  lteTestCase(10, testFunc("10", {})),
  lteTestCase(10, testFunc("10", null)),
  lteTestCase(10, testFunc("10", undefined)),

  lteTestCase(date1, date2),
  lteTestCase(date1, date2.getTime()),
  lteTestCase(date1.getTime(), date2),

  lteTestCase(date2, date1),
  lteTestCase(date2.getTime(), date1),
  lteTestCase(date2, date1.getTime()),
])("lte(%p, %p) => %p", (a, b, expected) => {
  expect(lte(a, b)).toBe(expected);
});
