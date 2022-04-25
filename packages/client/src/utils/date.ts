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
