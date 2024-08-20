- 開発者ツールで CSS に関して実行できる操作を検索エンジンで調べ、便利だと思ったもの

  以下、Firefoxの開発ツールの機能について紹介する。

  - レイアウト(ボックスモデル)[1]

    margin, border, paddingのpxをUI上で動的に変更し、確認することができる。

  - フィルターエディタ[2]

    CSSのfilter属性をUI上で動的に変更し、確認することができる。

  - シェイプパスエディタ[3]

    CSSのclip-path属性やshape-outside属性を使って描画された図形をUI上で動的に編集することができる。

- 15.4-10.2 のアプリの body 要素に対し、元々 HTML および JS 内で利用していなかった Tailwind CSS のクラスを開発者ツールから追加しても変更されない理由

  15.4-10.2で生成された`style.css`でテキスト内検索をすると、例にある`border-gray-300`は含まれてないことが分かる。このことから、元のhtmlやjsファイルで呼ばれているユーティリティクラス以外は、生成される`style.css`に含まれていないと思われる。そのため、後から開発者ツールを使って呼び出しても反映されないと考えられる。

[1]: https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/ui_tour/index.html#layout-view
[2]: https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/edit_css_filters/index.html#edit-css-filters
[3]: https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/edit_css_shapes/index.html#edit-shape-paths-in-css
