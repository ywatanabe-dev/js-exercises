// JSON の定義の各ルールに対して対応する関数を作成する
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#full_json_grammar
// 上記ページには以下のような ABNF 記法で JSON の定義が記載されている
//
// ```
// ...
// value = false / null / true / object / array / number / string
// false = %x66.61.6c.73.65   ; false
// null  = %x6e.75.6c.6c      ; null
// true  = %x74.72.75.65      ; true
// object = begin-object [ member *( value-separator member ) ]
//          end-object
// ...
// ```
//
// ここでは各ルールに対して関数を作成することにする (関数名は `$ルール名` とする)。
// 各ルールに対応する関数は以下のような形のオブジェクトを引数として受け付けるものとする
//
// ```
// // NOTE: index は「何文字目まで既にパースしたか」を表す
// const input = { source: "[1, 2, 3]", index: 0 };
//
// $array(input);
// ```
//
// 各ルールに対応する関数は以下の結果を返す:
// - パース成功時: { ok: true, value: (パースした結果), next: (残りの入力) }
// - パース失敗時: { ok: false }
//
// 例えば ABNF の array = ... ルールに対応した関数 $array が存在する場合、以下のような挙動を取る
//
// ```
// $array({ source: "[1]", index: 0 });
// // パースは成功し文字列の終端 (index = 3) まで読み込むため以下を返す
// // { ok: true, value: [1], next: { source: "[1]", index: 3 }}
//
// $array({ source: "{}", index: 0 })
// // パースは失敗し { ok: false } を返す
//
// $array({ source: "[1, [2], 3]", index: 4 })
// // 4 文字目から array というルールのいパースすると [2] という部分文字列のパースが完了するため以下を返す
// // { ok: true, value: [2], next: { source: "[1, [2], 3]", index: 7 }}
// ```
//
// 上記のような関数を淡々と定義すればいずれ JSON パーサーは完成する。
// ただ1つ1つ愚直に実装するのは手間であるため、以下に string, concat, alternative, repeat, option, map というユーティリティを定義してある
// これらのユーティリティ関数を使えば、ほぼ ABNF の通りにパーサーを定義できるだろう。

// まずは ABNF 記法 (https://ja.wikipedia.org/wiki/ABNF) に対応した DSL を作成する
// value で与えた文字列ならパースに成功するパーサー
function string(value) {
  return ({ source, index }) => {
    if (source.indexOf(value, index) !== index) {
      return { ok: false };
    }
    return { ok: true, value, next: { source, index: index + value.length } };
  };
}

// 連結 (A B C ...)
// parsers で順に入力をパースし、全て成功すれば成功とする
function concat(...parsers) {
  return (input) => {
    let next = input;
    const value = [];

    for (const p of parsers) {
      const result = p(next);
      if (!result.ok) {
        return { ok: false };
      }

      next = result.next;
      value.push(result.value);
    }
    return { ok: true, next, value };
  };
}

// 択一 (A / B / C / ...)
// parsers のどれか1つでもパースに成功すれば成功扱い
function alternate(...parsers) {
  return (input) => {
    for (const p of parsers) {
      const result = p(input);
      if (result.ok) {
        return result;
      }
    }
    return { ok: false };
  };
}

// 反復 (nRule)
function repeat(parser, min = 0, max = Infinity) {
  return (input) => {
    let next = input;
    const value = [];
    for (let i = 0; i < max; i++) {
      const result = parser(next);
      if (!result.ok && i >= min) {
        break;
      }
      if (!result.ok) {
        return { ok: false };
      }
      next = result.next;
      value.push(result.value);
    }
    return { ok: true, value, next };
  };
}

// オプション ([A])
// パース失敗時は null を返す
function option(parser) {
  return map(repeat(parser, 0, 1), (vs) => (vs.length === 0 ? null : vs[0]));
}

// 値の範囲指定 (%c##-##)
function range(min, max) {
  return ({ source, index }) => {
    const c = source.charCodeAt(index);
    if (isNaN(c) || c < min || max < c) {
      return { ok: false };
    }
    return {
      ok: true,
      value: source.charAt(index),
      next: { source, index: index + 1 },
    };
  };
}

// パース結果の変換
function map(parser, fn) {
  return (input) => {
    const result = parser(input);
    if (!result.ok) {
      return result;
    }
    return { ...result, value: fn(result.value) };
  };
}

// ここから JSON パーサー定義

// 参考にある程度の実装 (配列、文字列、真偽値、null) は用意している。$TODO の箇所を修正しなさい。
// const $TODO = (input) => ({ ok: false });

function $json(input) {
  return alternate($object, $array)(input);
}

const $beginArray = concat($ws, string("["), $ws);
const $beginObject = concat($ws, string("{"), $ws);
const $endArray = concat($ws, string("]"), $ws);
const $endObject = concat($ws, string("}"), $ws);
const $nameSeparator = concat($ws, string(":"), $ws);
const $valueSeparator = concat($ws, string(","), $ws);
function $ws(input) {
  return repeat(
    alternate(string(" "), string("\t"), string("\n"), string("\r"))
  )(input);
}

function $value(input) {
  return alternate(
    $false,
    $null,
    $true,
    $object,
    $array,
    $number,
    $string
  )(input);
}

const $false = map(string("false"), () => false);
const $null = map(string("null"), () => null);
const $true = map(string("true"), () => true);

const $member = map(concat($string, $nameSeparator, $value), (result) => {
  return [result[0], result[2]];
});
const $object = map(
  concat(
    $beginObject,
    option(concat($member, repeat(concat($valueSeparator, $member)))),
    $endObject
  ),
  (result) => {
    const obj = {};
    if (result[1] !== null) {
      // 一個めのproperty
      obj[result[1][0][0]] = result[1][0][1];
      // 二個め以降のproperty(存在すれば)
      result[1][1]?.map((element) => {
        obj[element[1][0]] = element[1][1];
      });
    }
    return obj;
  }
);

function $array(input) {
  return map(
    concat(
      $beginArray,
      option(concat($value, repeat(concat($valueSeparator, $value)))),
      $endArray
    ),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_begin, values, _end]) => {
      if (values === null) {
        return [];
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return [values[0], ...values[1].map(([_, v]) => v)];
    }
  )(input);
}

const $minus = string("-");
const $plus = string("+");
const $zero = string("0");
const $digit19 = range(0x31, 0x39);
const $DIGIT = range(0x30, 0x39);
const $decimalPoint = string(".");
const $int = alternate($zero, concat($digit19, repeat($DIGIT)));
const $frac = concat($decimalPoint, repeat($DIGIT, 1));
const $e = alternate(string("e"), string("E"));
const $exp = concat($e, option(alternate($minus, $plus)), repeat($DIGIT, 1));
const $number = map(
  concat(option($minus), $int, option($frac), option($exp)),
  (result) => {
    let value = "";
    // +-符号
    if (result[0] !== null) {
      value += result[0];
    }
    // 整数部分
    value += result[1][0];
    result[1][1]?.map((element) => {
      value += element;
    });
    // 小数部分
    if (result[2] !== null) {
      value += result[2][0];
      result[2][1]?.map((element) => {
        value += element;
      });
    }
    // 10^n
    if (result[3] !== null) {
      // e
      value += result[3][0];
      // +-符号
      if (result[3][1] !== null) {
        value += result[3][1];
      }
      // n
      result[3][2].map((element) => {
        value += element;
      });
    }
    return Number(value);
  }
);

function $string(input) {
  return map(concat($quotationMark, repeat($char), $quotationMark), (result) =>
    result[1].join("")
  )(input);
}

function $char(input) {
  return alternate(
    $unescaped,
    map(
      concat(
        $escape,
        alternate(
          string('"'),
          string("\\"),
          string("/"),
          map(string("b"), () => "\b"),
          map(string("f"), () => "\f"),
          map(string("n"), () => "\n"),
          map(string("r"), () => "\r"),
          map(string("t"), () => "\t"),
          map(
            concat(string("u"), $HEXDIG, $HEXDIG, $HEXDIG, $HEXDIG),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_, x1, x2, x3, x4]) =>
              String.fromCharCode(parseInt(`${x1}${x2}${x3}${x4}`, 16))
          )
        )
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, c]) => c
    )
  )(input);
}

function $escape(input) {
  return string("\\")(input);
}

function $quotationMark(input) {
  return string('"')(input);
}

function $unescaped(input) {
  return alternate(
    range(0x20, 0x21),
    range(0x23, 0x5b),
    range(0x5d, 0x10ffff)
  )(input);
}

function $HEXDIG(input) {
  return alternate($DIGIT, range(0x41, 0x46), range(0x61, 0x66))(input);
}

export function parseJSON(s) {
  const result = $json({ source: s, index: 0 });
  if (!result.ok || result.next.index !== s.length) {
    throw new Error("Failed to parse");
  }
  return result.value;
}

// 以下を実際に動かしてみると良い (ちゃんと動きます)
// const result = parseJSON('[true, false, null, [], ["HELLO"]]');
// console.log(JSON.stringify(result, null, 2));
