export function addMyCall(f) {
  f["myCall"] = (obj, ...argv) => {
    return f.bind(obj)(...argv);
  };
}
