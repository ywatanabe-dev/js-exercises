// 予想
// typeof undefined => undefined
// typeof null => object
// typeof (オブジェクト) => object
// typeof NaN => number
// typeof (数値) => number
// typeof (関数) => function
// 実際の結果
console.log(typeof undefined); // => undefined
console.log(typeof null); // => object
console.log(typeof {}); // => object
console.log(typeof NaN); // => number
console.log(typeof 0); // => number
console.log(typeof (() => {})); // => function
