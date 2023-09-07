Deno.serve((_request) => {
  const response = new Response(`{ "success": true }`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json"
    }
  })

  return response
});
