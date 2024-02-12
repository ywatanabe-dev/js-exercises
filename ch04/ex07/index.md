### セイキュリティ上の問題となる例

例えば、以下のようにプログラム上に秘匿する必要のあるデータがある場合に、
`set42()`にユーザーからの入力を渡すような実装があると、隠すべきデータを表示するようなコードが実行できてしまう。

```javascript
const password = "password";

set42("console.log(password); let a");
```

また、以下は、シェルから`ls`コマンドを呼び出している例である。このように、JavaScriptとして有効なコードであれば
入力に応じて何でも実行できるようになってしまうため、セキュリティの観点から`eval()`を使うことは推奨されない。

```javascript
set42(
  "const exec = require('child_process').exec; exec('ls', (err, stdout, stderr) => {console.log(stdout)}); let a"
);
```
