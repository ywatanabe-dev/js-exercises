### 実行結果の予想

```
{ answer: 42　}
{ answer: 0 }
```

と表示される。

### 実行結果

Firefox ver.121で実行。
保存したhtmlファイルをブラウザで開き、その後そのタブで開発者ツールを起動した。

```
Object { answer: 0 }
Object { answer: 0 }
```

と表示された。

### 開発者ツールを起動したタブでHTMLファイルを開いた場合

以下のような結果になった。

```
Object { answer: 42 }
Object { answer: 0 }
```

### 常に期待した結果にするには

console.log()にオブジェクト型を渡すと、そのオブジェクトへの参照が保持され、
ツールを開いた時点での参照の指す値が表示される。

参考：https://developer.mozilla.org/ja/docs/Web/API/console/log_static

そのため、HTMLファイルをタブで開く→開発者ツールを開くの順で実行すると、
二つのcosole.log()はいずれも始めにファイルを開いた時の実行で書き換わった値が表示される。
期待通りの表示にするには、オブジェクトを直接渡すのではなく、プリミティブな値にしてから渡すようにする。
具体的には、JSON.stringfy()で文字列に変換してから渡すと、console.log()を呼び出した時点での値が表示されるようになる。

- 変更例

  ```html
  <!doctype html>
  <html>
    <body>
      <script>
        let life = { answer: 42 };
        console.log(JSON.stringify(life));
        life.answer = 0;
        console.log(JSON.stringify(life));
      </script>
    </body>
  </html>
  ```

- 上記のHTMLファイルをタブで開いた後、開発者ツールを開いた際の表示結果

  ```
  {"answer":42}
  {"answer":0}
  ```
