import { my_equals } from "./index.ts";

describe("my_equals", () => {
  it("0.3 - 0.2 is 0.1", () => {
    expect(my_equals(0.3 - 0.2, 0.1)).toBeTruthy();
  });

  it("0.2 - 0.1 is 0.1", () => {
    expect(my_equals(0.2 - 0.1, 0.1)).toBeTruthy();
  });

  it("0.301 - 0.2 is not 0.1", () => {
    expect(my_equals(0.301 - 0.2, 0.1)).toBeFalsy();
  });

  it("0.201 - 0.1 is not 0.1", () => {
    expect(my_equals(0.201 - 0.1, 0.1)).toBeFalsy();
  });
});
