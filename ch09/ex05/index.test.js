import { instanceOf } from "./index.js";

class A {}
class B extends A {}
class C extends B {}
class D extends C {}
class E extends B {}

describe("instanceOf", () => {
  test("[] instanceof Array", () => {
    expect(instanceOf([], Array)).toBe([] instanceof Array);
  });

  test("new Map() instanceof Map", () => {
    expect(instanceOf(new Map(), Map)).toBe(new Map() instanceof Map);
  });

  test("new Date() instanceof Date", () => {
    expect(instanceOf(new Date(), Date)).toBe(new Date() instanceof Date);
  });

  test("{} instanceof Object", () => {
    expect(instanceOf({}, Object)).toBe({} instanceof Object);
  });

  test("[] instanceof Object", () => {
    expect(instanceOf([], Object)).toBe([] instanceof Object);
  });

  test("new Map() instanceof Object", () => {
    expect(instanceOf(new Map(), Object)).toBe(new Map() instanceof Object);
  });

  test("new Date() instanceof Date", () => {
    expect(instanceOf(new Date(), Object)).toBe(new Date() instanceof Object);
  });

  test("class A instance", () => {
    expect(instanceOf(new A(), A)).toBe(new A() instanceof A);
    expect(instanceOf(new A(), B)).toBe(new A() instanceof B);
    expect(instanceOf(new A(), C)).toBe(new A() instanceof C);
    expect(instanceOf(new A(), D)).toBe(new A() instanceof D);
    expect(instanceOf(new A(), E)).toBe(new A() instanceof E);
  });

  test("class B instance", () => {
    expect(instanceOf(new B(), A)).toBe(new B() instanceof A);
    expect(instanceOf(new B(), B)).toBe(new B() instanceof B);
    expect(instanceOf(new B(), C)).toBe(new B() instanceof C);
    expect(instanceOf(new B(), D)).toBe(new B() instanceof D);
    expect(instanceOf(new B(), E)).toBe(new B() instanceof E);
  });

  test("class C instance", () => {
    expect(instanceOf(new C(), A)).toBe(new C() instanceof A);
    expect(instanceOf(new C(), B)).toBe(new C() instanceof B);
    expect(instanceOf(new C(), C)).toBe(new C() instanceof C);
    expect(instanceOf(new C(), D)).toBe(new C() instanceof D);
    expect(instanceOf(new C(), E)).toBe(new C() instanceof E);
  });

  test("class D instance", () => {
    expect(instanceOf(new D(), A)).toBe(new D() instanceof A);
    expect(instanceOf(new D(), B)).toBe(new D() instanceof B);
    expect(instanceOf(new D(), C)).toBe(new D() instanceof C);
    expect(instanceOf(new D(), D)).toBe(new D() instanceof D);
    expect(instanceOf(new D(), E)).toBe(new D() instanceof E);
  });

  test("class E instance", () => {
    expect(instanceOf(new E(), A)).toBe(new E() instanceof A);
    expect(instanceOf(new E(), B)).toBe(new E() instanceof B);
    expect(instanceOf(new E(), C)).toBe(new E() instanceof C);
    expect(instanceOf(new E(), D)).toBe(new E() instanceof D);
    expect(instanceOf(new E(), E)).toBe(new E() instanceof E);
  });
});
