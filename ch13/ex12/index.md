### 予想

awaitで待ちが入ると、その間に別の実行に制御が移る。
よって、おおむね1秒後に"Hello, world!"が表示される。

### 結果

どれだけ待っても"Hello, world!"は表示されない。

### 上記の結果になる理由

以下、^[1]を参照した。

JavaScriptの実行環境では、一度のイベントループごとにひとつずつキューに積まれたタスクを実行していく。
タスクは、以下のものが該当する。

- コンソールや、\<script\>タグから直接実行されたJavaScriptコード
- イベントが発生した時に実行されるコールバック
- setTimeout()、setInterval()によって実行されるコールバック

ループの中で実行中のタスクが完了する(実行スタックが空になる)と、処理系は次にマイクロタスクキューを見に行く。
マイクロタスクキューに積まれるマイクロタスクは、Promise()で登録されたコールバックや、MutationObserver()で登録されたコールバックが該当する。

イベントループでは、マイクロタスクキューが全て無くなるまでマイクロタスクを実行し続ける。すなわち、マイクロタスクが別のマイクロタスクをキューに追加し続けると永遠に処理が止まらなくなる。今回のコードはこの場合に該当する。

今回のコードのこの部分をPromiseで書き換えると、

```javascript
async () => {
  while (true) {
    await null;
  }
};
```

以下のようになり、無限にPromise()を生成するようになる。

```javascript
new Promise(() =>
  Promise.resolve(null).then(() =>
    Promise.resolve(null).then(() =>
      Promise.resolve(null).then(() =>
        Promise.resolve(null).then(() => Promise.resolve(null).then(()=>
        ...
        ))
      )
    )
  )
);
```

これによりマイクロタスクキューがつきなくなり、どれだけ待っても次のタスクが実行されなくなる。

[1]: https://developer.mozilla.org/ja/docs/Web/API/HTML_DOM_API/Microtask_guide
