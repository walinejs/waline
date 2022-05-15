export function throttle(
  func: (...args: any[]) => void,
  timeout = 300
): (...args: []) => void {
  let timer: number | null;
  return (...args: []): void => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      func(...args);
      timer = null;
    }, timeout);
  };
}
