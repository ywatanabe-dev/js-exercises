export function f(lambda) {
  const argv = [...Array(10)].map((_, i) => `$${i + 1}`);
  return new Function(...argv, " return (() => " + lambda + " )()");
}
