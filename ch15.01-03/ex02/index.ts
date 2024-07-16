function importScript(url: string) {
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.onload = () => {
      resolve();
    };
    s.onerror = (e) => {
      reject(e);
    };
    s.src = url;
    document.head.append(s);
  });
}

(async () => {
  await importScript("http://localhost:3000/ch15.01-03/ex02/test_src.js");
  console.log("import ok.");
})();
