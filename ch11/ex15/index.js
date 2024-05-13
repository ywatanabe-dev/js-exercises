export function modifyUrl(url) {
  let base;
  try {
    base = new URL(url.base);
  } catch {
    throw new Error();
  }
  if (url.path) {
    base.pathname = url.path;
  }

  if (!url.addQuery) {
    return base.href;
  }

  for (const query of url.addQuery) {
    base.searchParams.set(query[0], query[1]);
  }

  return base.href;
}
