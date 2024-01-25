export function getDayOfWeek(date: Date): DaysOfTheWeek {
  const daysOfWeek: DaysOfTheWeek[] = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex] || "Sun"; // Nếu không phải số từ 0-6, mặc định là "Sun"
}