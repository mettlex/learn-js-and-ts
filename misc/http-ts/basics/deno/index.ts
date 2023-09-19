Deno.serve(
  {
    port: 3000,
  },
  (req) => {
    console.log(req.url);
    return new Response("Hi Friend!");
  },
);
