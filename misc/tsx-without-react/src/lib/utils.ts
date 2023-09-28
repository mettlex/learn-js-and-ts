export function iifeForEvent<T extends Event>(fn: (event: T) => void): string {
  return `(${fn.toString()}).bind(this)(event)`;
}

let id = 0;
export function useId(prefix = "") {
  return prefix + "-" + (++id).toString();
}
