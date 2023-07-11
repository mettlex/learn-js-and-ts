export function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}

export async function runAsync() {
  await sleep(0);
  console.log("me runAsync");
}
