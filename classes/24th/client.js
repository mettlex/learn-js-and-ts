const response = fetch("http://localhost:8000");

response
  .then((res) => {
    return res.json();
  })
  .then((text) => {
    console.log({ text });
  })
  .catch((e) => {
    console.log(e);
  });
