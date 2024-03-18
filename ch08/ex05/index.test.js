import { sequenceToObject } from "./index.js";

describe("sequenceToObject", () => {
  it('sequenceToObject("a", 1, "b", 2) => {a: 1, b: 2}', () => {
    expect(sequenceToObject("a", 1, "b", 2)).toStrictEqual({ a: 1, b: 2 });
  });

  it('sequenceToObject("a", "a", "b", "b") => {a: "a", b: "b"}', () => {
    expect(sequenceToObject("a", "a", "b", "b")).toStrictEqual({
      a: "a",
      b: "b",
    });
  });

  it('sequenceToObject("a", {x: 1, y:"a"}, "b", {x: 2, y: "b"}) => {a: {x: 1, y: "a"}, b: {x: 2, y: "b"}}', () => {
    expect(
      sequenceToObject("a", { x: 1, y: "a" }, "b", { x: 2, y: "b" })
    ).toStrictEqual({
      a: { x: 1, y: "a" },
      b: { x: 2, y: "b" },
    });
  });

  it('sequenceToObject("a", 1, "b") throws error', () => {
    expect(() => sequenceToObject("a", 1, "b")).toThrow(
      new Error("Length of argument array is not even")
    );
  });

  it('sequenceToObject("a", 1, 2, 3) throws error', () => {
    expect(() => sequenceToObject("a", 1, 2, 3)).toThrow(
      new Error("Argument of even index is not a string")
    );
  });

  it('sequenceToObject(...["a", 1, "b", 2]) throws error', () => {
    expect(sequenceToObject(...["a", 1, "b", 2])).toStrictEqual({ a: 1, b: 2 });
  });
});
