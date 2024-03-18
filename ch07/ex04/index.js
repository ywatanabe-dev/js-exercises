const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

const math_all = data.map((x) => x.math).reduce((x, y) => x + y);
console.log(`mathの全員の合計点: ${math_all}`);

const class_a = data.filter((x) => x.class === "A");
const class_a_chemistry_ave =
  class_a.map((x) => x.chemistry).reduce((x, y) => x + y) / class_a.length;
console.log(`クラスAのchemistryの平均点: ${class_a_chemistry_ave}`);

const class_c = data.filter((x) => x.class === "C");
const class_c_total_ave =
  class_c
    .map((x) => x.math + x.chemistry + x.geography)
    .reduce((x, y) => x + y, 0) / class_c.length;
console.log(`3科目合計点のクラスC内での平均点: ${class_c_total_ave}`);

const total = (x) => x.math + x.chemistry + x.geography;
const top_total = data.reduce((x, y) => (total(x) > total(y) ? x : y)).name;
console.log(`3科目合計点が最も高い人のname: ${top_total}`);

const geography_all_ave =
  data.map((x) => x.geography).reduce((x, y) => x + y) / data.length;
const geography_all_standard = Math.sqrt(
  data
    .map((x) => (x.geography - geography_all_ave) ** 2)
    .reduce((x, y) => x + y) / data.length
);
console.log(`全体のgeographyの標準偏差: ${geography_all_standard}`);
