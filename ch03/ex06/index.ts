export function substring(
  str: string,
  indexStart: number,
  indexEnd: number | undefined
) {
  const start = Number.isNaN(indexStart) ? 0 : Math.floor(indexStart);
  const end =
    indexEnd !== undefined
      ? Number.isNaN(indexEnd)
        ? 0
        : Math.floor(indexEnd)
      : str.length;
  return [...str]
    .filter((_, i) => i >= Math.min(start, end) && i < Math.max(start, end))
    .join("");
}

export function slice(
  str: string,
  indexStart: number | undefined,
  indexEnd: number | undefined
) {
  const start =
    indexStart !== undefined
      ? Number.isNaN(indexStart)
        ? 0
        : indexStart < 0
        ? Math.ceil(indexStart) + str.length
        : Math.floor(indexStart)
      : 0;
  const end =
    indexEnd !== undefined
      ? Number.isNaN(indexEnd)
        ? 0
        : indexEnd < 0
        ? Math.ceil(indexEnd) + str.length
        : Math.floor(indexEnd)
      : str.length;
  return [...str].filter((_, i) => i >= start && i < end).join("");
}

export function padStart(
  str: string,
  targetLength: number,
  padString: string | undefined
) {
  const padstr = padString ?? " ";
  const repeat = Math.floor((targetLength - str.length) / padstr.length);
  let result = "";
  for (let i = 0; i < repeat; i++) {
    result += padstr;
  }
  result += substring(padstr, 0, (targetLength - str.length) % padstr.length);
  result += str;
  return result;
}

export function trim(str: string) {
  const start = [...str].findIndex(
    (c) => !/\s|\u{000a}|\u{000d}|\u{2028}|\u{2029}/.test(c)
  );
  const end = [...str]
    .reverse()
    .findIndex((c) => !/\s|\u{000a}|\u{000d}|\u{2028}|\u{2029}/.test(c));
  return substring(str, start, str.length - end);
}
