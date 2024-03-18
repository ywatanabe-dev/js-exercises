// キー(string)をハッシュ化する関数
// 文字列の1byte目の数値をハッシュとする
function hash(key) {
  if (key === "") return 0;
  return Buffer.from(key)[0];
}

export function newHashTable() {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: [], // マッピングを格納する配列
    get(key) {
      // keyにマップされた値を取得する
      const list = this.entries[hash(key)];
      if (list === undefined) {
        return undefined;
      }
      for (let i = 0; i < list.length; i++) {
        if (key === list[i][0]) {
          return list[i][1];
        }
      }
      return undefined;
    },
    put(key, value) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
      const index = hash(key);
      if (this.entries[index] === undefined) {
        this.entries[index] = [];
      }
      const list = this.entries[index];
      for (let i = 0; i < list.length; i++) {
        if (key === list[i][0]) {
          list[i][1] = value;
          return;
        }
      }
      list.push([key, value]);
      this.size++;
    },
    remove(key) {
      // keyのマッピングを削除する
      const list = this.entries[hash(key)];
      if (list === undefined) {
        return false;
      }
      for (let i = 0; i < list.length; i++) {
        if (key === list[i][0]) {
          list.splice(i, 1);
          this.size--;
          return true;
        }
      }
      return false;
    },
  };
}
