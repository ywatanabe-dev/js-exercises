export function nestedUnwritableObj() {
  return Object.seal({ c: Object.seal({ d: Object.seal({ e: 3 }) }) });
}

export function unwritableAndUnconfigurableObj() {
  return Object.freeze({ a: 1 });
}

export function writableAndUnconfigurableObj() {
  return Object.seal({ b: 2 });
}
