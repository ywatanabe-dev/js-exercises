function equalBytes(array: Uint8Array, magicbyte: Uint8Array): boolean {
  for (let i = 0; i < magicbyte.length; i++) {
    if (magicbyte[i] !== array[i]) {
      return false;
    }
  }

  return true;
}

export function detectFileType(buffer: ArrayBuffer): string {
  const array = new Uint8Array(buffer);
  if (
    equalBytes(
      array,
      new Uint8Array([
        0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xc3, 0xa4,
        0xc3, 0xbc, 0xc3, 0xb6,
      ])
    )
  ) {
    return "PDF";
  }

  if (
    equalBytes(
      array,
      new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x00, 0x00, 0x00])
    ) ||
    equalBytes(array, new Uint8Array([0x50, 0x4b, 0x05, 0x06, 0x00, 0x00])) ||
    equalBytes(array, new Uint8Array([0x50, 0x4b, 0x07, 0x08, 0x00, 0x00]))
  ) {
    return "ZIP";
  }

  if (
    equalBytes(
      array,
      new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x37, 0x61, 0x00, 0x00])
    ) ||
    equalBytes(
      array,
      new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x00, 0x00])
    )
  ) {
    return "GIF";
  }

  if (
    equalBytes(
      array,
      new Uint8Array([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00,
      ])
    )
  ) {
    return "PNG";
  }

  return "UNKNOWN";
}
