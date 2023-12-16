// non-idempotent
function nonIdempotent(input: number) {
  return Math.random() * input;
}

// idempotent
function impure(input: number) {
  let sum = 0;

  for (let i = 0; i < input; i++) {
    sum += i;
  }

  return sum;
}

// pure + idempotent
function pure(input: number) {
  return Array.from(Array(input).keys()).reduce((sum, i) => sum + i, 0);
}

const input = 100;

console.log("imperative");
console.log(impure(input));

console.log("functional");
console.log(pure(input));

console.log("non-idempotent");
console.log(nonIdempotent(input));
