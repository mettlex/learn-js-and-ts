// typeof

console.log(typeof 1234);
console.log(typeof "hi mom!");

const list = []; // [] is square brackets, [] is empty array

console.log(list);
console.log(list.length);

list.push("Hi");

console.log(list);
console.log(list.length);

list.push("There!");

console.log(list);
console.log(list.length);

const quotes = ["Save trees.", "Save animals."];
console.log(quotes);

// Arrays are mutable
const letters = ["A", "B", "C"];

console.log(letters.join(""));
console.log(typeof letters.join(""));

const word = letters.join("");
console.log(typeof word);

word[0] = "B";
console.log(word);

console.log(word[0]); // index 0 = 1st index
console.log(word[1]); // index 1 = 2nd index
console.log(word[2]); // index 2 = 3rd index

// Strings are immutable
word[2] = "D";
console.log(word);

console.log(letters);

letters[0] = "B";

console.log(letters);

console.log(letters.join(""));

// This is not mutating/changing
console.log("B" + word[1] + word[2]);
console.log(`B${word[1]}${word[2]}`);

// Mutated <- Mutation <- Mutate (verb) <- Mutable (adjective)