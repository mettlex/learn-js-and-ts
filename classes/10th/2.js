// primitive
const a = 1; // number
const b = "js"; // string
const c = true; // boolean

// non-primitive
const d = {
  name: "John Wick",
}; // object
const e = [1, 2, 3]; // array

const change = (param) => {
  console.log("inside fn", { param });
  // d.name = "Neo";
  param[2] = 4;
  console.log("inside fn after change", { param });
};

// change(d); // pass by reference: pointer, memory
change(e); // pass by reference: pointer, memory

// console.log("outside fn", { d });
console.log("outside fn", { e });
