import { detectFileType } from "./index.ts";

// see: https://en.wikipedia.org/wiki/List_of_file_signatures

const testdata = [
  // PDF
  {
    // https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf の先頭
    data: new Uint8Array([
      0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xc3, 0xa4,
      0xc3, 0xbc, 0xc3, 0xb6,
    ]),
    expected: "PDF",
  },
  // ZIP
  {
    data: new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x00, 0x00, 0x00]),
    expected: "ZIP",
  },
  {
    data: new Uint8Array([0x50, 0x4b, 0x05, 0x06, 0x00, 0x00]),
    expected: "ZIP",
  },
  {
    data: new Uint8Array([0x50, 0x4b, 0x07, 0x08, 0x00, 0x00]),
    expected: "ZIP",
  },
  // GIF
  {
    data: new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x37, 0x61, 0x00, 0x00]),
    expected: "GIF",
  },
  {
    data: new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x00, 0x00]),
    expected: "GIF",
  },
  // PNG
  {
    data: new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00,
    ]),
    expected: "PNG",
  },
  // UNKNOWN (よくわからなければ UNKNOWN を返す)
  {
    data: new Uint8Array([0x00, 0x00, 0x00, 0x00]),
    expected: "UNKNOWN",
  },
];

test.each(testdata)(
  "detectFileType(...) === $expected",
  ({ data, expected }) => {
    expect(detectFileType(data.buffer)).toStrictEqual(expected);
  }
);
