import { convertCRLFtoLF, convertLFtoCRLF } from "./index.ts";

describe("Conversion of newline code", () => {
  it("LF to CRLF", () => {
    expect(convertLFtoCRLF("\n")).toBe("\r\n");
  });

  it("LF to CRLF", () => {
    expect(convertLFtoCRLF("\n\r\n\n\r\n\n")).toBe("\r\n\r\n\r\n\r\n\r\n");
  });

  it("CRLF to LF", () => {
    expect(convertCRLFtoLF("\r\n")).toBe("\n");
  });

  it("CRLF to LF", () => {
    expect(convertCRLFtoLF("\n\r\n\n\r\n\n")).toBe("\n\n\n\n\n");
  });
});
