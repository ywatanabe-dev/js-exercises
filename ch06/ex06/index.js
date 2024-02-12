export function getProperties(o) {
  const result = Reflect.ownKeys(o);
  for (const prop in o) {
    if (!Object.prototype.hasOwnProperty.call(o, prop)) {
      result.push(prop);
    }
  }
  return result;
}
