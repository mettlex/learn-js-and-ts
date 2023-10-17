function fibo(a = 0n, b = 1n, n = 0) {
  if (n < 1) {
    return b;
  }

  return fibo(b, a + b, n - 1);
}

export function fibonacciFast(n) {
  return fibo(0n, 1n, n - 1);
}
