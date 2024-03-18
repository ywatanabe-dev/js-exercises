export function f(lambda) {
  const argv = [...Array(10)].map((i) => `$${i + 1}`);
  return new Function(...argv, lambda);
}
