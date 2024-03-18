const m = function (...arg) {
  console.log(arg[1]);
};

const m_arrow = (...arg) => console.log(arg[1]);

m("a", "b");
m_arrow("a", "b");
