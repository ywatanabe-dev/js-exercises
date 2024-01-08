import { equalArrays } from "./index.js";

describe("equalArrays", () => {
  it("return true with two different arguments", () => {
    expect(equalArrays({ a: 0 }, {})).toBe(true);
  });
});
