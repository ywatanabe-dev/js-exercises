// 必要なモジュールへの参照を取得する。
const stats = require("./stats.cjs");
const BitSet = require("./sets.cjs").BitSet;
// モジュールを使ってコードを記述する。
const s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
const average = stats.mean([...s]); // averageは20。
