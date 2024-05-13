const sum = (x, y) => x + y;
const square = (x) => x * x;
exports.mean = (data) => data.reduce(sum) / data.length;
exports.stddev = function (d) {
  const m = exports.mean(d);
  return Math.sqrt(
    d
      .map((x) => x - m)
      .map(square)
      .reduce(sum) /
      (d.length - 1)
  );
};
