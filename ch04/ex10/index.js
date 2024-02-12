const array = ["r", "i", "c", "o", "h"];
// "o"を削除することにより、arrayは疎な配列となる
delete array[3];
console.log(array); // => [ 'r', 'i', 'c', <1 empty item>, 'h' ]
console.log(array.length); // => 5
