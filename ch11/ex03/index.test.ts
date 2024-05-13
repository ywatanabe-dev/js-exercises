import { convertToBigEndian, convertToLittleEndian } from "./index.ts";

describe("convertToBigEndian", () => {
  test("00 00 00 01 => 01 00 00 00", () => {
    const bytes = new Uint32Array([1]);
    expect(convertToBigEndian(bytes)[0]).toBe(16777216);
  });

  test("00 00 01 01 => 01 01 00 00", () => {
    const bytes = new Uint32Array([257]);
    expect(convertToBigEndian(bytes)[0]).toBe(16842752);
  });

  test("00 10 00 10 => 10 00 10 00", () => {
    const bytes = new Uint32Array([1048592]);
    expect(convertToBigEndian(bytes)[0]).toBe(268439552);
  });

  test("10 00 00 10 => 10 00 00 10", () => {
    const bytes = new Uint32Array([268435472]);
    expect(convertToBigEndian(bytes)[0]).toBe(268435472);
  });

  test("[1, 257, 1048592, 268435472] => [16777216, 16842752, 268439552, 268435472]", () => {
    const bytes = new Uint32Array([1, 257, 1048592, 268435472]);
    expect(convertToBigEndian(bytes)).toStrictEqual(
      new Uint32Array([16777216, 16842752, 268439552, 268435472])
    );
  });
});

describe("convertToLittleEndian", () => {
  test("00 00 00 01 => 01 00 00 00", () => {
    const bytes = new Uint32Array([16777216]);
    expect(convertToLittleEndian(bytes)[0]).toBe(1);
  });

  test("00 00 01 01 => 01 01 00 00", () => {
    const bytes = new Uint32Array([16842752]);
    expect(convertToLittleEndian(bytes)[0]).toBe(257);
  });

  test("00 10 00 10 => 10 00 10 00", () => {
    const bytes = new Uint32Array([268439552]);
    expect(convertToLittleEndian(bytes)[0]).toBe(1048592);
  });

  test("10 00 00 10 => 10 00 00 10", () => {
    const bytes = new Uint32Array([268435472]);
    expect(convertToLittleEndian(bytes)[0]).toBe(268435472);
  });

  test("[1, 257, 1048592, 268435472] => [16777216, 16842752, 268439552, 268435472]", () => {
    const bytes = new Uint32Array([16777216, 16842752, 268439552, 268435472]);
    expect(convertToLittleEndian(bytes)).toStrictEqual(
      new Uint32Array([1, 257, 1048592, 268435472])
    );
  });
});
