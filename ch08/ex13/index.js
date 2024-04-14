// グローバルオブジェクトのプロパティを作成
globalThis.password = "password";

function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

f("`${(() => { console.log(password);return '';})()}`");
