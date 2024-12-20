### index.js でdocument.cookie プロパティを console.logで表示する

### ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する

いずれの場合も、空文字列が返ってくる。これは、サーバ側でcookieに`HttpOnly`属性[1]を設定しているためである。`HttpOnly`属性が設定されると、クライアント側で`document.cookie`を通してcookieにアクセスすることができなくなる。この属性を設定することで、XSS攻撃によりクッキーの中身が読まれることを防ぐことができる。

### ToDo アプリのタブをリロードする

リロード前のタスク一覧の状態がそのまま表示される。ブラウザに紐づけられたsession idがcookieに保存されており、リクエスト時に以前のsessionが保たれるからである。

### 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する

別のタブやウィンドウでのタスク一覧の状態がそのまま表示される。前述の通り、cookieはブラウザに紐づけられているからである。
ただし、別のタブでフロントエンド側の表示の変更が起きた場合は、リロードして再度サーバに保存している情報を取り直すまで反映されない。

### シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する

初期状態(タスクが一個も登録されていない状態)が表示される。シークレットウィンドウでは、cookieは保存されないため、通常のウィンドウからのリクエストで作られたsessionを持ち越すことができない。また、cookieはブラウザに紐づけられているため、別のブラウザからのアクセスでも同様にsessionを持ち越すことができない。

### http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する

初期状態(タスクが一個も登録されていない状態)が表示される。デフォルトでcookieにアクセスできるのは、ドキュメントのオリジンに制限されており、`127.0.0.1:3000`のドキュメントから`localhost:3000`に紐づいたcookieにはアクセスできないためである。

[1]: https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies#cookie_%E3%81%B8%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%82%92%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF
