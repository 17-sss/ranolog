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

export const valueOrLastItem = <T>(value: T | T[]) => {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }
  return value;
};

export const changeFirstCharUpperCase = (str: string): string =>
  str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());

export const removeDuplicateValues = <T extends string | number>(values: T[]): T[] => {
  const set = new Set(values);
  return Array.from(set);
};
