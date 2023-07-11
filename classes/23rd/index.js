import { runAsync } from "./sleep.js";

// #1 contender: setTimeout
setTimeout(() => {
  console.log("me setTimeout");
}, 0);

// #2 contender: Promise API
runAsync();

// #3 contender: synchronous
console.log("me only sync");
