// このプログラムでは正規表現のパターンを関数として表現する (以下 "パターン関数" と呼ぶ)。
//
// 例えば "HELLO" という文字列にマッチする正規表現は quote 関数を利用して以下のように作成する。
//
// ```
// const pattern = quote("HELLO");
// ```
//
// 上記の `pattern` は関数である。パターン関数は以下の3つを引数として受け取る:
//
// - 文字列: パターンがマッチするか調査する文字列
// - インデックス: 文字列の何文字目からパターンのマッチを判定するかを示す整数
// - 継続: パターンにマッチした後に実行する関数 (引数は文字列とインデックス、返り値は真偽値)
//
// パターン関数は引数に対して自身がマッチした場合は引数の継続を実行し、その結果を返す。
//
// 以下の `Pattern` は TypeScript の型でパターン関数を記述したものである:
//
// ```
// type Continuation = (s: string, index: number) => boolean;
// type Pattern = (s: string, index: number, k: Continuation) => boolean;
// ```
//
// 注意: 簡単のためサロゲートペアや合字については考えないものとする
//
// 以下に簡単な例を示す:
//
// ```
// const p = quote("HELLO");
// const debug = (s, p) => { console.log(p); return true; };
//
// // 以下の式は true ("5" が出力される)
// p("HELLOWORLD", 0, debug);
//
// // 以下の式は false (何も出力されない)
// p("HELLOWORLD!", 1, debug);
//
// 以下の式は true ("8" が出力される)
// p("ABCHELLOABC", 3, debug);
// ```
//
// match 関数は文字列がパターンとマッチするか調べ真偽値を返す
//
// ```
// const pattern = quote("HELLO");
// console.log(match(pattern, "HELLO")); // true
// console.log(match(pattern, "ABCDE")); // false
// ```

export function quote(s) {
  // strのposからの位置がsに一致するか
  return (str, pos, k) => str.indexOf(s, pos) === pos && k(str, pos + s.length);
}

// seq2(first, second) は first の次に second がマッチする正規表現を表現する
export function seq2(lhs, rhs) {
  return (str, pos, k) => lhs(str, pos, (nstr, npos) => rhs(nstr, npos, k));
}

// alt2(first, second) は first または second がマッチする正規表現を表現する
export function alt2(lhs, rhs) {
  return (str, pos, k) => lhs(str, pos, k) || rhs(str, pos, k);
}

// パターン p が s にマッチするか調べる (マッチ後に全ての文字を消化したか確認する継続を渡している)
export function match(pat, s) {
  return pat(s, 0, (nstr, pos) => nstr.length === pos);
}

// ここまでの関数だけで /Hello, (world|World)!/ というパターンは以下のような式で表現できる
//
// const hw = seq2(
//   quote("Hello, "),
//   seq2(alt2(quote("world"), quote("World")), quote("!"))
// );
//
// console.log(match(hw, "Hello, world!")); // true
// console.log(match(hw, "Hello")); // false
//
// たった4つの関数で正規表現らしきものが動作している。もっと複雑なパターンを書くために以下の関数を定義しよう。
// いずれの関数も数行程度で実装可能である。

// seq2 の可変長引数版
export function seq(...pats) {
  // HINT: seq(p1, p2, p3, p4) = seq2(seq2(seq2(p1, p2), p3), p4)
  if (pats.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (str, pos, k) => str.length === pos;
  }
  if (pats.length === 1) {
    return (str, pos, k) => pats[0](str, pos, k);
  }
  if (pats.length === 2) {
    return seq2(pats[0], pats[1]);
  }
  return seq2(seq(...pats.slice(0, -1)), pats[pats.length - 1]);
}

// alt2 の可変長引数版
export function alt(...pats) {
  // HINT: alt(p1, p2, p3, p4) =  alt2(alt2(alt2(p1, p2), p3), p4)
  if (pats.length === 1) {
    return (str, pos, k) => pats[0](str, pos, k);
  }
  if (pats.length === 2) {
    return alt2(pats[0], pats[1]);
  }
  return alt2(alt(...pats.slice(0, -1)), pats[pats.length - 1]);
}

// 任意の1文字にマッチ
export function dot() {
  // HINT: quote の実装を参考にすると良い
  return (str, pos, k) => k(str, pos + 1);
}

// [...] に対応 (例: [abc] は charFrom("abc"))
export function charFrom(s) {
  // HINT: quote の実装を参考にすると良い
  return (str, pos, k) =>
    [...s].some((val) => val === str[pos]) && k(str, pos + 1);
}

// [^...] に対応
export function charNotFrom(s) {
  // HINT: quote の実装を参考にすると良い
  return (str, pos, k) =>
    [...s].every((val) => val !== str[pos]) && k(str, pos + 1);
}

// 繰り返し (min 回数以上 max 回数以下)
export function repeat(pat, min = 0, max = Infinity) {
  // HINT: 再帰を上手く使うこと
  // パターン P の繰り返し `P{min,max}` は min > 0 の時 `(P)(P{min-1,max-1})` と分解できる
  // seq2, alt2 を上手く使うと良い
  if (min === 0) {
    if (max === 0) {
      return (str, pos, k) => k(str, pos);
    } else {
      return (str, pos, k) => {
        if (pos > str.length) {
          return false;
        }
        return alt2(
          (str, pos, k) => k(str, pos),
          seq2(pat, repeat(pat, 0, max - 1))
        )(str, pos, k);
      };
    }
  }
  return seq2(pat, repeat(pat, min - 1, max - 1));
}

// 正規表現 /([Jj]ava([Ss]cript)?) is fun/ は以下
// const p = seq(
//   seq(
//     charFrom("Jj"),
//     quote("ava"),
//     repeat(seq(charFrom("Ss"), quote("cript")), 0, 1)
//   ),
//   quote(" is fun")
// );
//
// console.log(match(p, "JavaScript is fun")); // true
