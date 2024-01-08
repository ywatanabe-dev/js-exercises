/**
 * Record<string,number>型のオブジェクトを比較し、
 * プロパティが全て同一であればtrue、それ以外の場合はfalseを返す関数。
 */
export function equals(
  obj1: Record<string, number>,
  obj2: Record<string, number>
): boolean {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (const prop in obj1) {
    if (obj1[prop] !== obj2[prop]) {
      return false;
    }
  }
  return true;
}

/** 
 * 参照は異なるが、同一のプロパティを持つオブジェクト`obj1`と`obj2`の比較をするコード。
 * 厳密等価演算子===(参照が同一かどうか判定)での比較と、equals()関数での比較の結果は下記の通り。
 * 
function main() {
  const obj1: Record<string, number> = {
    x: 1,
  };

  obj1.y = 2;

  const obj2: Record<string, number> = {
    x: 1,
    y: 2,
  };

  console.log(obj1 === obj2); // => false
  console.log(equals(obj1, obj2)); // => true
}
*/
