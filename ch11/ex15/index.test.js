import { modifyUrl } from "./index.js";

describe("modifyUrl", () => {
  it("returns URL string", () => {
    expect(() => {
      modifyUrl({
        base: "invalid format",
      });
    }).toThrow();
    expect(
      modifyUrl({
        base: "https://example.com/foo?a=b",
      })
    ).toBe("https://example.com/foo?a=b");
    expect(
      modifyUrl({
        base: "https://example.com/foo?a=b",
        addQuery: [
          ["p", "x"],
          ["パラメータ", "y"],
        ],
      })
    ).toBe(
      "https://example.com/foo?a=b&p=x&%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF=y"
    );
    expect(
      modifyUrl({
        base: "https://example.com/foo?a=b",
        addQuery: [["foo", "bar"]],
        path: "./buz",
      })
    ).toBe("https://example.com/buz?a=b&foo=bar");
  });
});
