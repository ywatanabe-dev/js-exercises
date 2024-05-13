export function sortJapanese(input) {
  const collator = new Intl.Collator(undefined, { sensitivity: "base" })
    .compare;
  return input.sort(collator);
}

export function toJapaneseDateString(date) {
  const opts = { dateStyle: "long", calendar: "japanese" };
  return Intl.DateTimeFormat("ja-JP", opts).format(date);
}
