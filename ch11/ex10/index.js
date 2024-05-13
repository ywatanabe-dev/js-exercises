export function numberOfDays(year, month) {
  // ローカル時間でyear/month/月末最終日(UTCは9時間前)
  const date = new Date(year, month, 0);
  return date.getDate();
}

export function numberOfWeekdays(day1, day2) {
  let result = 0;
  const date1 = new Date(day1);
  const date2 = new Date(day2);
  if (date2.getTime() - date1.getTime() < 0) {
    return result;
  }

  for (let i = 0; ; i++) {
    if (date1.getDay() !== 0 && date1.getDay() !== 6) {
      result++;
    }
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      break;
    }
    date1.setDate(date1.getDate() + 1);
  }

  return result;
}

export function getLocalDay(day, locale) {
  return Intl.DateTimeFormat(locale, { weekday: "long" }).format(new Date(day));
}

export function getLastMonthFirst() {
  const now = new Date().toISOString();
  const date = now.match(/^(?<year>\d+)-(?<month>\d+).*$/);
  const year = Number(date.groups.year);
  const month = Number(date.groups.month);
  const prev_year = month !== 0 ? year : year - 1;
  const prev_month = month !== 0 ? month - 1 : 11;
  return new Date(prev_year, prev_month, 1);
}
