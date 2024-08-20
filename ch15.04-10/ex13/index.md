## hashbangが使われた理由

フラグメント識別子#の後に!を加えた記法を使っていた理由は、以前のGoogleのクローラーの仕様によるものである。

かつてGoogleは、Ajaxで構成されたサイトを検索エンジンがクロール、インデックスできるようにするための方法を開発者に提供していた[1]。

具体的には、以下のような方法である。

1. ステートフル(状態を持つ)なAjaxページのURLフラグメントに`!`を付与する。

   `https://example.com/page?query#state` → `https://example.com/page?query#!state`

2. サーバ側でヘッドレスブラウザを用いて、指定された状態でのHTMLのスナップショットを生成するようにする。

3. 検索エンジンのクローラから上記のフラグメントをエスケープしたURLにリクエストがあった場合、HTMLコードを生成のためにヘッドレスブラウザを使うようサーバーに伝え、HTMLのスナップショットを得る。

   エスケープしたURLの例：`https://example.com/page?query&_escaped_fragment_=state`

3.でリクエストを送るためのURLを生成するにあたり、クローラ側に1.の`#!`を含んだURLを渡す必要があったため、hashbangが使われるようになった。現在はこの仕様は廃止された[2]ため、使われることはない。

[1]: https://developers.google.com/search/blog/2009/10/proposal-for-making-ajax-crawlable
[2]: https://developers.google.com/search/blog/2015/10/deprecating-our-ajax-crawling-scheme?hl=ja
