console.log(Number.MAX_SAFE_INTEGER); // max int value.
console.log(Number.MIN_SAFE_INTEGER); // min int value.

console.log(Number.MAX_SAFE_INTEGER + 1); // max + 1 int value.
console.log(Number.MAX_SAFE_INTEGER + 2); // max + 2 int value.

/**
 * JavaScriptの「安全な整数」の最大値+1と+2を比較した結果.
 * どちらも2^53になり, trueが返る. この結果になる理由は以下の通り.
 *
 * JavaScriptの「安全な整数」は以下のように定義される。
 *
 * - 正確に IEEE-754 倍精度数として表現することができる
 * - その IEEE-754 表現は、他の整数を IEEE-754 の表現に適合するように、丸めた結果にはならない
 * (出典: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)
 *
 * IEEE-754 表現は最大で2^53まで表すことができ, 2^53+1以上は2^53に丸められる.
 * よって「安全な整数」の二つ目の条件まで満たす最大の数値(=Number.MAX_SAFE_INTEGER)は2^53-1となり,
 * Number.MAX_SAFE_INTEGER+1=2^53
 * Number.MAX_SAFE_INTEGER+2=2^53(丸められた結果)
 * となるため, 両者が等しい値と判定される.
 */
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2);
