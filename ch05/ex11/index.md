### Nodeでのdebugger文を使ったデバッグ法

Node.jsでは、`debugger`文はデバッガ使用時にbreak pointとして振る舞う。

Node.jsでデバッガを起動するには、`node inspect`コマンドを使う[^1]。

具体的な例では、以下のプログラムに対して`node inspect`をそのまま実行すると、

```javascript
const x = 0;
const y = 1;
(() => {
  debugger;
  const z = 2;
})();
debugger;
```

次のように、1行目の手前でdebuggerがブレイクする。

```
Break on start in index.js:1
> 1 const x = 0;
  2 const y = 1;
  3
```

ブレイクした後、`n`を入力すると次の実行ステップに移動する。上の場合だと、1行目の実行後に移動する。
以降、続けて`n`を入力する度に、順次次の実行ステップに移動する。
`n`の代わりに`c`を入力すると、次のbreak pointまで一気に移動する。
例えば、上記の1行目の手前でブレイクする状態で`c`を入力すると、

```
break in index.js:5
  3
  4 (() => {
> 5   debugger;
  6   const z = 2;
  7 })();
```

5行目の`debugger`文まで移動してからブレイクする。この状態で再度`c`を入力すると、

```
break in index.js:8
  6   const z = 2;
  7 })();
> 8 debugger;
  9
```

8行目の`debugger`文まで移動してからブレイクする。

`node inspect`コマンドを実行する際に、環境変数`NODE_INSPECT_RESUME_ON_START`を`1`に設定すると、
プログラム起動時に1行目の手前でブレイクせずに、初めのbreak pointまで移動してからブレイクする。
今回のコードの場合だと、プログラム起動と同時に5行目の`debugger`文まで一気に移動する。

[^1]: https://nodejs.org/api/debugger.html
