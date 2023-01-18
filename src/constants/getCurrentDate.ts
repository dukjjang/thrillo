export function getCurrentDate() {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const newDate = new Date();
  const date = newDate.getDate();
  const month = monthNames[newDate.getMonth()];
  const year = newDate.getFullYear();
  return { date, month, year };
}
