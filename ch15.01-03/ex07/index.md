## トップページを読み込むとエラーになる理由

実際にYoutubeのトップページをiframeの中で読み込もうとすると、以下のメッセージが表示され、読み込まれない。(Firefoxの場合)

```
フレーム内の “https://www.youtube.com/” の読み込みが “X-Frame-Options” ディレクティブの設定値 “sameorigin” により拒否されました。
```

`X-Frame-Options`とは、httpのレスポンスヘッダーであり、ブラウザが`iframe`内でこのページを表示することを許可するかどうかを示す[1]。`X-Frame-Options`には二つの有効なディレクティブ`DENY` `SAMEORIGIN`が用意されており、`DENY`の時は全てのサイトからの読み込みを、`SAMEORIGIN`の時は同一オリジン以外のサイトからの読み込みを禁止する。

この`X-Frame-Options`をレスポンスヘッダーとして返すことで、クリックジャッキング[2]に利用されるのを防ぐことができる。クリックジャッキングは攻撃者が用意したサイトの上に`iframe`で見た目を透明にして別サイトの表示を重ねることで、ユーザーが意図せず別サイトの方で操作するように仕向ける攻撃である。

## 同一オリジンポリシーがない場合に起きうる問題

同一オリジンポリシーがなく、iframe内の他サイトのDOM変更が可能な仕様がある場合、iframeで読み出した別サイトからユーザーの情報を盗み出せてしまう可能性がある。例えばiframe内のサイトでログインしている状態の場合、ユーザーしか知り得ない情報がその中に含まれている場合があり、DOM操作でその情報が取得できてしまう。

[1]: https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-Frame-Options
[2]: https://www.ipa.go.jp/security/vuln/websecurity/clickjacking.html
