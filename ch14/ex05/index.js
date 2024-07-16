export function getType(strings, ...values) {
  if (values.length !== 1) {
    throw new Error();
  }
  return typeof values[0];
}
