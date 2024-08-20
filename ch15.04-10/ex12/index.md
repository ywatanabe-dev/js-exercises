### Active や Completed を選択後にブラウザのリロードを行った際の挙動

#### hashchange

そのまま同じページが表示される。状態遷移に伴って新たにリクエストは行われない。

#### pushState

現在のURLに対してリクエストが発生し、404となる。

#### サーバで必要な対応

`(base-URL)/active`や、`(base-URL)/completed`へのリクエストを`(base-URL)`へのリクエストにマップするようルーティングする。(ただし、ブラウザで実行されるJavaScript側で、URLに応じて各状態を再現する必要がある。)
