## バンドル結果と元のコードとの比較

バンドルされた結果のjsコードを以下に示す(整形済み)。なお、バンドル時の設定は`production`である。

```javascript
(() => {
  'use strict';
  var e = {
    d: (t, n) => {
      for (var o in n)
        e.o(n, o) &&
          !e.o(t, o) &&
          Object.defineProperty(t, o, {enumerable: !0, get: n[o]});
    },
    o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
  };
  function t(e, t) {
    for (let r = 0; r < n; r++)
      for (let n = 0; n < o; n++) {
        const o = t[r][n];
        e.beginPath(),
          e.rect(n * l, r * l, l, l),
          (e.fillStyle = o ? 'black' : 'white'),
          e.fill(),
          e.stroke();
      }
  }
  e.d({}, {_1: () => o, $u: () => l, Ir: () => n});
  const n = 50,
    o = 50,
    l = 10,
    r = document.querySelector('#screen'),
    c = r.getContext('2d'),
    i = document.querySelector('#start'),
    a = document.querySelector('#pause');
  (r.width = n * l), (r.height = o * l);
  let u = null;
  const d = new Audio('/ch15.04-10/ex10/decision1.mp3');
  let f = new Array(n)
    .fill(null)
    .map(() =>
      new Array(o).fill(null).map(() => !!Math.floor(2 * Math.random()))
    );
  function s() {
    (f = (function (e) {
      const t = e.map(e => [...e]),
        l = (t, l) => {
          let r = 0;
          return (
            t > 0 && l > 0 && e[t - 1][l - 1] && r++,
            l > 0 && e[t][l - 1] && r++,
            t < n - 1 && l > 0 && e[t + 1][l - 1] && r++,
            t > 0 && e[t - 1][l] && r++,
            t < n - 1 && e[t + 1][l] && r++,
            t > 0 && l < o - 1 && e[t - 1][l + 1] && r++,
            l < o - 1 && e[t][l + 1] && r++,
            t < n - 1 && l < o - 1 && e[t + 1][l + 1] && r++,
            r
          );
        };
      for (let r = 0; r < n; r++)
        for (let n = 0; n < o; n++) {
          const o = l(r, n);
          e[r][n] ? (t[r][n] = 2 === o || 3 === o) : (t[r][n] = 3 === o);
        }
      return t;
    })(f)),
      t(c, f),
      (u = requestAnimationFrame(s));
  }
  r.addEventListener('click', function (e) {
    const n = r.getBoundingClientRect(),
      o = e.clientX - n.left,
      i = e.clientY - n.top,
      a = Math.floor(i / l),
      u = Math.floor(o / l);
    (f[a][u] = !f[a][u]), d.cloneNode().play(), t(c, f);
  }),
    i.addEventListener('click', () => {
      u || s();
    }),
    a.addEventListener('click', () => {
      u && (cancelAnimationFrame(u), (u = null));
    }),
    t(c, f);
})();
```

元のコードと比較すると、(改行の有無を除き)以下の違いがあることが分かる。

- 全体の処理がアロー関数の即時実行の形になっており、別ファイルに分かれていた関数が直接埋め込まれている
- 変数名が簡略化されている(一文字変数になっている)

## スクリプトのダウンロード時間、ページの読み込み完了時間

ch15.04-10と比較を行う。
結果は以下のようになった。スクリプトのファイルサイズは異なるものの、2.35KBと3.64KBの違いしかないため、
あまり差が出ない結果となった。より大きなソースコードの場合は差が大きくなるかもしれない。

### ch15.04-10

- スクリプトのダウンロード時間: 1 ~ 3ms程度
- ページの読み込み完了時間:　20 ~ 40ms程度

### ch17-05

- スクリプトのダウンロード時間: 1 ~ 3ms程度
- ページの読み込み完了時間: 20 ~ 40ms程度
