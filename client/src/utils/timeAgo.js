function timeAgo(date,locale) {
  if(!date) {
    return;
  }

  try {
    if(typeof date === 'string') {
      date = new Date(date);
    }
    const oldTime = date.getTime();
    const currTime = new Date().getTime();
    const diffValue = currTime - oldTime;

    const days = Math.floor(diffValue / (24 * 3600 * 1000));
    if (days === 0) {
      //计算相差小时数
      const leave1 = diffValue % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      const hours = Math.floor(leave1 / (3600 * 1000));
      if (hours === 0) {
        //计算相差分钟数
        const leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        const minutes = Math.floor(leave2 / (60 * 1000));
        if (minutes === 0) {
          //计算相差秒数
          const leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
          const seconds = Math.round(leave3 / 1000);
          return seconds + ` ${locale['timeago']['seconds']}`;
        }
        return minutes + ` ${locale['timeago']['minutes']}`;
      }
      return hours + ` ${locale['timeago']['hours']}`;
    }
    if (days < 0) {
      return locale['timeago']['now'];
    }
    if (days < 8) {
      return days + ` ${locale['timeago']['days']}`;
    } else {
      return dateFormat(date)
    }
  } catch (error) {
    console.log(error)
  }
}


const dateFormat = (date) => {
  var vDay = padWithZeros(date.getDate(), 2);
  var vMonth = padWithZeros(date.getMonth() + 1, 2);
  var vYear = padWithZeros(date.getFullYear(), 2);
  return `${vYear}-${vMonth}-${vDay}`;
}


const padWithZeros = (vNumber, width) => {
  var numAsString = vNumber.toString();
  while (numAsString.length < width) {
      numAsString = '0' + numAsString;
  }
  return numAsString;
}

module.exports = timeAgo