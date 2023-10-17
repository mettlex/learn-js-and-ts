import process from "node:process";

function fibo(a = 0n, b = 1n, n = 0, callback) {
  if (n < 1) {
    return callback(b);
  }

  process.nextTick(() => {
    fibo(b, a + b, n - 1, callback);
  });
}

export function fibonacciFast(n) {
  return fibo(0n, 1n, n - 1, (x) => {
    console.log(x);
  });
}

