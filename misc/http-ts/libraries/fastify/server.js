import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

// Declare a route: / means root
fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  // console.log(`Server is now listening on ${address}`);
});
