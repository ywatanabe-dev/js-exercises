###　予想
プログラムが止まり、"Hello, world!"はいつまでも表示されない。

### 実行結果

予想通り、"Hello, world!"はいつまでも表示されず、プログラムが止まった状態になった。

### JavaScriptのタスクと上の結果について

JavaScriptでは、コードをタスクという形式にし、タスクキューに追加していくことでスケジューリングしている。

タスクがタスクキューに追加される場合は以下の通り[1]。

1. 新しいJavaScriptプログラムやサブプログラムが実行された時。
2. イベントが発生し、そのコールバック関数がタスクキューに追加された(実行待ちとなった)場合。
3. `setTimeout()`、`setInterval()`で作成されたタイムアウト・インターバルに達した場合に、そのコールバックがタスクキューに追加される。

JavaScriptのイベントループでは、1度の反復でタスクキューのタスクを一つ取り出し実行する。

今回は上記の3.の場合でタスクがタスクキューに積まれたが、それが実行される手前の反復で無限ループが起きてしまった結果、いつまでも積まれたタスク("Hello, world!"の表示)が実行されなくなってしまう。
