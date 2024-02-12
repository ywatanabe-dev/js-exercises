const document = {
  forms: [
    {
      name: { value: "test1" },
      address: { value: "test1" },
      email: { value: "test1" },
    },
    {
      name: { value: "test2" },
      address: { value: "test2" },
      email: { value: "test2" },
    },
    {
      name: { value: "test3" },
      address: { value: "test3" },
      email: { value: "test3" },
    },
    {
      name: { value: "test4" },
      address: { value: "test4" },
      email: { value: "test4" },
    },
    {
      name: { value: "test5" },
      address: { value: "test5" },
      email: { value: "test5" },
    },
  ],
};

function main() {
  let n, a, e;
  const start = process.hrtime.bigint();
  with (document.forms[0]) {
    n = name.value;
    a = address.value;
    e = email.value;
  }
  const end = process.hrtime.bigint();
  console.log(`${Number(end - start) / 1e6}ms`);
}

main();
