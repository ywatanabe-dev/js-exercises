## TypeScriptとFlowについて、どちらが主流となっているか

それぞれのnpmパッケージのダウンロード数で比較すると、

- TypeScript[1]: 2023-11-06〜2023-11-12の期間で45,790,627DL
- flow-bin[2]: 2023-11-06〜2023-11-12の期間で386,289DL

それぞれ利用する際に使われるのが必ずしも上記のパッケージとは限らないため、これだけで単純な比較はできないが、
二つのパッケージ間でDL数に大きな差があることが分かる。
そのほか、Homebrew[3]のFormulaeのDL数で比較すると、

- TypeScript[4]: 最近30日で3,169DL
- flow[5]: 最近30日で514DL

となっている。これらのことから、現在ではTypeScriptの方がより普及しているといえる。

このようになった理由の一つとして、Flow(v0.1.0が2014/11/19公開)はTypeScript(v0.8.1が2012/11/15公開)よりも後発であり、既存のライブラリに対する型定義リポジトリ[6][7]の登録数もTypeScriptの方が多くなっているため、今後開発を進めていく上で積極的に型を利用したい場合はTypeScriptの方を選ぶケースが多くなるからだと思われる。

[1]: https://www.npmjs.com/package/typescript
[2]: https://www.npmjs.com/package/flow-bin
[3]: https://brew.sh/
[4]: https://formulae.brew.sh/formula/typescript
[5]: https://formulae.brew.sh/formula/flow
[6]: https://github.com/DefinitelyTyped/DefinitelyTyped
[7]: https://github.com/flow-typed/flow-typed
