export function withResource(obj, f) {
  try {
    f(obj);
  } finally {
    obj.close();
  }
}
