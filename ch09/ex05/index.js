export function instanceOf(object, constructor) {
  let prototype = Object.getPrototypeOf(object);
  while (prototype !== null) {
    if (prototype.constructor === constructor) {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}
