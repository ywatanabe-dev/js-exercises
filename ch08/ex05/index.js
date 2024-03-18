export function sequenceToObject(...values) {
  if (values.length % 2 !== 0) {
    throw new Error("Length of argument array is not even");
  }
  const result = {};
  for (let i = 0; i < values.length; i += 2) {
    if (typeof values[i] !== "string")
      throw new Error("Argument of even index is not a string");
    result[values[i]] = values[i + 1];
  }

  return result;
}
