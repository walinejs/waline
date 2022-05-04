import { WalineDateLocale } from '../typings';

const padWithZeros = (vNumber: number, width: number): string => {
  let numAsString = vNumber.toString();

  while (numAsString.length < width) {
    numAsString = '0' + numAsString;
  }

  return numAsString;
};

export const dateFormat = (date: Date): string => {
  const vDay = padWithZeros(date.getDate(), 2);
  const vMonth = padWithZeros(date.getMonth() + 1, 2);
  const vYear = padWithZeros(date.getFullYear(), 2);

  return `${vYear}-${vMonth}-${vDay}`;
};

export const getTimeAgo = (
  date: Date | string,
  now: Date,
  locale: WalineDateLocale
): string => {
  if (!date) return '';

  const time =
    typeof date === 'string'
      ? new Date(date.indexOf(' ') !== -1 ? date.replace(/-/g, '/') : date)
      : date;

  const timepassed = now.getTime() - time.getTime();

  const days = Math.floor(timepassed / (24 * 3600 * 1000));

  if (days === 0) {
    // 计算相差小时数

    // 计算天数后剩余的毫秒数
    const leave1 = timepassed % (24 * 3600 * 1000);
    const hours = Math.floor(leave1 / (3600 * 1000));

    if (hours === 0) {
      //计算相差分钟数

      // 计算小时数后剩余的毫秒数
      const leave2 = leave1 % (3600 * 1000);
      const minutes = Math.floor(leave2 / (60 * 1000));

      // 计算相差秒数
      if (minutes === 0) {
        // 计算分钟数后剩余的毫秒数
        const leave3 = leave2 % (60 * 1000);
        const seconds = Math.round(leave3 / 1000);

        return `${seconds} ${locale.seconds}`;
      }

      return `${minutes} ${locale.minutes}`;
    }

    return `${hours} ${locale.hours}`;
  }

  if (days < 0) return locale.now;

  if (days < 8) return `${days} ${locale.days}`;

  return dateFormat(time);
};
