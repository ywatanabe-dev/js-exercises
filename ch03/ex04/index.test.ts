describe("Hundred Points Symbol", () => {
  it("length", () => {
    expect("💯".length).toBe(2);
  });

  it("UTF-16 code point", () => {
    expect("\uD83D\uDCAF").toBe("💯");
  });

  it("UTF-32 code point", () => {
    expect("\u{0001F4AF}").toBe("💯");
  });
});
