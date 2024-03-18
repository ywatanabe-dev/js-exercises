export function counterGroup() {
  const counters = [];
  return {
    newCounter: function () {
      let n = 0;
      const counter = {
        count: function () {
          return n++;
        },
        reset: function () {
          n = 0;
        },
        getCount: function () {
          return n;
        },
      };
      counters.push(counter);
      return counter;
    },
    total: function () {
      return counters
        .map((counter) => counter.getCount())
        .reduce((x, y) => x + y, 0);
    },
  };
}
