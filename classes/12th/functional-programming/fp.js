// 1. For same arguments/input, the result or the returned value/output will always be the same.

// 2. No side effects.

// 3. Internal state/variable is not modified/changed/reassigned.

const todos = [
  { text: "Have tea", done: true },
  { text: "Have dinner", done: false },
];

let output1 = "";

// not functional, imperative, how
for (let i = 0; i < todos.length; i++) {
  output1 += todos[i].text;

  if (i !== todos.length - 1) {
    output1 += ", ";
  }
}

console.log(output1);

// functional, declarative, what
const output2 = todos.reduce(
  (final, todo, i) => final + todo.text + (i !== todos.length - 1 ? ", " : ""),
  ""
);

console.log(output2);
