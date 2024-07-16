export function setLogToMethodCall(obj) {
  const log = [];
  const handler = {
    get(target, property, receiver) {
      if (typeof obj[property] === "function") {
        return new Proxy(target[property], {
          apply(target, receiver, args) {
            log.push({
              date: new Date(),
              name: property,
              args,
            });
            return Reflect.apply(target, receiver, args);
          },
        });
      }
      return Reflect.get(target, property, receiver);
    },
  };

  return [new Proxy(obj, handler), log];
}
