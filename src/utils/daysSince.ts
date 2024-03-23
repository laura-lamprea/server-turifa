export function DaysSince(date: Date): number {
  const today = new Date();
  const dateWithoutMilliseconds = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const differenceInMilliseconds = today.getTime() - dateWithoutMilliseconds.getTime();
  const hours = differenceInMilliseconds / (1000 * 3600 * 24);
  return hours;
}