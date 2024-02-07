export function convertUtcToGMT7(utcTime: Date): Date {
  const utcOffset: number = 0;
  const gmt7Offset: number = 7;

  const offsetDiff: number = gmt7Offset - utcOffset;

  const gmt7Time: Date = new Date(utcTime.getTime() + (offsetDiff * 60 * 60 * 1000));

  return gmt7Time;
}