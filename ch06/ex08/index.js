export function restrict(target, template) {
  const props = Object.getOwnPropertyNames(target);
  for (const prop of props) {
    if (!Object.prototype.hasOwnProperty.call(template, prop)) {
      delete target[prop];
    }
  }
  return target;
}

export function substract(target, ...sources) {
  const props = Object.getOwnPropertyNames(target);
  for (const prop of props) {
    for (const source of sources) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        delete target[prop];
      }
    }
  }
  return target;
}
