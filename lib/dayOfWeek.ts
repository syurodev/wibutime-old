export const daysOfWeek = [
  {
    value: "Sun",
    label: "CN"
  },
  {
    value: "Mon",
    label: "T2"
  },
  {
    value: "Tues",
    label: "T3"
  },
  {
    value: "Wed",
    label: "T4"
  },
  {
    value: "Thurs",
    label: "T5"
  },
  {
    value: "Fri",
    label: "T6"
  },
  {
    value: "Sat",
    label: "T7"
  },
]

export function convertDayOfWeek(value: DaysOfTheWeek) {
  const foundDay = daysOfWeek.find(day => day.value.toLowerCase() === value.toLowerCase());
  return foundDay ? foundDay.label : null;
}