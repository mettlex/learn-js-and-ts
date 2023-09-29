let id = 0;
export function useId(prefix = "") {
  return prefix + "-" + (++id).toString();
}
