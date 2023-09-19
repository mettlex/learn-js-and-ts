const port = 5000;

console.log("Listening on " + port);

Bun.serve({
  port,
  fetch(req) {
    console.log(req.url);
    return new Response("Hi Neighbor!");
  },
});
