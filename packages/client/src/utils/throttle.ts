export function throttle(func: (...args: any[]) => void, timeout = 300) {
  let timer: number | null;
  return (...args: []) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      func(...args);
      timer = null;
    }, timeout);
  };
}