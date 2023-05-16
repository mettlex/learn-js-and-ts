/**
 * String vs Number
 */

// string is written with "" or ''
console.log("Hello");
console.log('Hello');
// what's its data type?
console.log(typeof "Hello");
console.log(typeof 42);
console.log(typeof '42');
console.log(typeof "42");

/**
 * Arithmetic Operations
 */

// number addition
console.log(1 + 2);
// number subtraction
console.log(1 - 2);
// number multiplication
console.log(2 * 2);
// number division
console.log(1 / 2);
// number remainder with % modulo operator
console.log(10 % 2);
console.log(11 % 2);
console.log(15 % 6); // 15 - 12 = 3

/**
 * String operations
 */

// string concatenation
console.log('1' + '2');
console.log("1" + "2");

const x = 1;
const y = 2;

// template string / literal
console.log(`${x}${y}`);
console.log(`${x}${y}`.split("").reverse().join(""));