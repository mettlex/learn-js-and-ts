// Functions are values in JS

// ES2015 = ES6 introduces Arrow Function
const add1 = (a, b) => {
  return a + b;
}

// ES5
var add2 = function(a, b) {
  return a + b;
}

// ES5
function add3(a, b) {
  return a + b;
}

console.log(add1(1, 2));
console.log(add2(1, 2));
console.log(add3(1, 2));
