import { addEscapeSequence1, addEscapeSequence2 } from "./index.ts";

describe("addEscapeSequence1", () => {
  it("\0\b\t\n\v\f\r\"'\\", () => {
    expect(addEscapeSequence1("\0\b\t\n\v\f\r\"'\\")).toBe(
      "\\0\\b\\t\\n\\v\\f\\r\\\"\\'\\\\"
    );
  });

  it("\\'", () => {
    expect(addEscapeSequence1("\\'")).toBe("\\\\\\'");
  });

  it("abcdef\n", () => {
    expect(addEscapeSequence1("abcdef\n")).toBe("abcdef\\n");
  });
});

describe("addEscapeSequence2", () => {
  it("\0\b\t\n\v\f\r\"'\\", () => {
    expect(addEscapeSequence2("\0\b\t\n\v\f\r\"'\\")).toBe(
      "\\0\\b\\t\\n\\v\\f\\r\\\"\\'\\\\"
    );
  });

  it("\\'", () => {
    expect(addEscapeSequence1("\\'")).toBe("\\\\\\'");
  });

  it("abcdef\n", () => {
    expect(addEscapeSequence1("abcdef\n")).toBe("abcdef\\n");
  });
});
