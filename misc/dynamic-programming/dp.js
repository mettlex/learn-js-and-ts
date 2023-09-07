/**
 * In Memoization (Top-down approach) of recursive Fibonacci sequence,
 * Time Complexity -> O(n)
 * Space Complexity -> O(n)
 */

function fibonacciUsingMemo(n, memo) {
  if (n <= 1) {
    return n;
  }

  if (!memo[n]) { // memoization - top down approach
    memo[n] = fibonacciUsingMemo(n - 1, memo) + fibonacciUsingMemo(n - 2, memo);
  }

  return memo[n];
}

const memo = {};

/**
 * memo[0] = 0
 * memo[1] = 1
 * memo[2] = 1
 * memo[3] = 2
 * memo[4] = 3
 * memo[5] = 5
 * memo[6] = 8
 */

// 0 + 1 + 1 + 2 + 3 + 5
console.log(fibonacciUsingMemo(6, memo)) // ?

/**
 * In Tabulation (Bottom-up approach) of recursive Fibonacci sequence,
 * Time Complexity -> O(n)
 * Space Complexity -> O(1)
 */

function fibonacciUsingBottomUp(n, a, b) {
  if (n === 0) return a;
  if (n === 1) return b;

  return fibonacciUsingBottomUp(
    n - 1,
    b, /* a = b */
    a + b /* b = a + b */
  )
}

// 0 + 1 + 1 + 2 + 3 + 5
console.log(fibonacciUsingBottomUp(6, 0, 1)) // ?