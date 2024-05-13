// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
  const map = new WeakMap();
  // この関数を実装する
  return (obj) => {
    if (map.has(obj)) {
      return map.get(obj);
    }
    const result = f(obj);
    map.set(obj, result);
    return result;
  };
}
