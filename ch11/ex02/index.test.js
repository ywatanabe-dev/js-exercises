import { cache } from "./index.js";

describe("cache", () => {
  test("cache symol value", () => {
    class Foo {
      get a() {
        return Symbol();
      }
    }

    const foo = new Foo();
    const f = (foo) => foo.a;
    const cachedF = cache(f);
    const result = cachedF(foo);
    expect(f(foo)).not.toBe(result);
    expect(cachedF(foo)).toBe(result);
  });
});
