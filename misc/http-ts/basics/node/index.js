import http from "node:http";

const port = 8000;

function handleRequest(request, response) {
  console.log(request.url);
  response.end("Hi Bro!");
}

http.createServer(handleRequest).listen(port, "localhost", () => {
  console.log(`ami ${port} e shunte pacchi`);
});
