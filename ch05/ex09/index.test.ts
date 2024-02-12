import { parseJson } from "./index.ts";

describe("parseJson", () => {
  it("parse {} => {}", () => {
    expect(parseJson("{}")).toStrictEqual({ success: true, data: {} });
  });

  it('parse { "a": 0, "b": "", "c": true } => {}', () => {
    expect(parseJson('{ "a": 0, "b": "", "c": true }')).toStrictEqual({
      success: true,
      data: { a: 0, b: "", c: true },
    });
  });

  it("parse { => Error", () => {
    expect(parseJson("{ ")).toMatchObject({
      success: false,
      error: /.*/,
    });
  });

  it("parse { a } => Error", () => {
    expect(parseJson("{ a }")).toMatchObject({
      success: false,
      error: /.*/,
    });
  });
});
