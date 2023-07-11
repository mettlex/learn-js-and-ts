function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}

const interval = setInterval(() => {
  console.log("this");
}, 500);

await sleep(3);

clearInterval(interval);
