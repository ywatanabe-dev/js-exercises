export function convertToBigEndian(bytes: Uint32Array): Uint32Array {
  const result = new Uint32Array(bytes);
  const view = new DataView(
    result.buffer,
    result.byteOffset,
    result.byteLength
  );
  for (
    let offset = 0;
    offset < result.byteLength;
    offset += result.BYTES_PER_ELEMENT
  ) {
    const int = view.getUint32(offset, true);
    view.setUint32(offset, int, false);
  }
  return result;
}

export function convertToLittleEndian(bytes: Uint32Array): Uint32Array {
  const result = new Uint32Array(bytes);
  const view = new DataView(
    result.buffer,
    result.byteOffset,
    result.byteLength
  );
  for (
    let offset = 0;
    offset < result.byteLength;
    offset += result.BYTES_PER_ELEMENT
  ) {
    const int = view.getUint32(offset, false);
    view.setUint32(offset, int, true);
  }
  return result;
}
