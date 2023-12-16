import fs from "node:fs";

let count = 0;

console.log(
  fs.readFile("sample.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(data);
  }),
);

console.log("Hello World");

// synchronous
// while (true) {}

// asynchronous
const interval = setInterval(() => {
  console.log(++count);

  if (count === 20) {
    clearInterval(interval);
  }
}, 1000);

// asynchronous
const timeout = setTimeout(() => {
  console.log("timeout");
}, 4000);
