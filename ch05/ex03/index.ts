type WeekDay = "月" | "火" | "水" | "木" | "金" | "土" | "日";

// if-elseを使う場合
export function isWeekEnd1(day: WeekDay): boolean {
  if (day === "土" || day === "日") {
    return true;
  } else {
    return false;
  }
}

// switchを使う場合
export function isWeekEnd2(day: WeekDay): boolean {
  switch (day) {
    case "土":
    case "日":
      return true;
    default:
      return false;
  }
}
