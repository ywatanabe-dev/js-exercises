元記事のmicrobenchmarks fairy tale[^1]の説明を引用して、設問にある現象が起きる理由を説明する。

### ループ普遍コードに対する最適化による影響

コンパイラの最適化の一つに、LCIMと呼ばれるものがある。
この最適化では、ループ中の全てのイテレーションで同じ値を生成する式を見つけ出し、ループの外に追いやる。
今回の例では、`str.length`の呼び出しがLCIMによりループ外に出される。よって`costOfLengthPlusLoop`は`costOfLoop`に対して`str.length`一回分の呼び出しの差しか生まれないことになる。

```javascript
const start = performance.now();
for (let i = 0; i < N; i++) {
  res = str.length; // 実際には、str.lengthの呼び出しはループ外に追いやられる。
}
const end = performance.now();
```

### アセンブラコードレベルでの動きの検証

`costOfLengthPlusLoop`および`costOfLoop`を実際に実行した際に生成されるアセンブラコードを見ると、
ループのイテレーションごとにスタックにレジスタの値を書き込んでいる。
これらはコード中の変数`i`と`res`に該当する値であり、v8は変数が生存期間中のどこかでレジスタに値が退避されることがある場合、定義時にレジスタへ退避させるようにする。
今回の場合では、レジスタに書き込まれた`res`の値はループの後の`Date.now()`の関数呼び出しの際にスタックに退避される。これにより、`i`と`res`の値はループの度に何度も何度もスタックへの書き込みが行われる。

また、それとは別にループ中にプログラムの実行を中断して、ランタイムに実行を移す場合に備えて、ループのイテレーションごとにスタックポインタの値をチェックする処理も行なっている。

実際には上記の二つの処理がループ中の大半の時間を占めており、`str.length`が仮にループ中にあったとしても、ループ全体にかかる時間に対してはごく僅かにすぎない。

### まとめ

上記のmicrobenchmarks fairy taleでの解説より、`costOfLengthPlusLoop`では実際には`str.length`は一回しか呼び出されておらず、またループ中はスタックへのレジスタ値の書き込みに大半の時間が消費されているため、ループ回数が増えると`str.length`の呼び出しによる時間の差は相対的に小さいものになっていくと分かった。これらの要因により、設問で示されていた現象が発生すると思われる。

[^1]: https://mrale.ph/blog/2012/12/15/microbenchmarks-fairy-tale.html