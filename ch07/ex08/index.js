export function reverse(str) {
  // 書記素単位で分割する。注：ロケール依存
  const segmenter = new Intl.Segmenter("ja-JP");
  const segments = segmenter.segment(str);
  return Array.from(segments)
    .map((x) => x.segment)
    .reverse()
    .join("");
}
