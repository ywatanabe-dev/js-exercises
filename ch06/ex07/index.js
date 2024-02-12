export function assign(target, ...sources) {
  for (const source of sources) {
    for (const prop of Reflect.ownKeys(source).filter((p) =>
      Object.propertyIsEnumerable.call(source, p)
    )) {
      target[prop] = source[prop];
    }
  }
}
