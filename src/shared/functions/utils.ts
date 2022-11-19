interface DebounceParams<T extends any[]> {
  func: (...args: T) => void;
  ms?: number;
}

export const debounce = <T extends any[]>({func, ms = 500}: DebounceParams<T>) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), ms);
  };
};

type ThrottleParams<T extends any[]> = DebounceParams<T>;
export const throttle = <T extends any[]>({func, ms = 500}: ThrottleParams<T>) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: T) => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      func(...args);
      timer = undefined;
    }, ms);
  };
};
