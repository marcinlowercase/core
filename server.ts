Deno.serve((req: Request) => {
  const url = new URL(req.url);

  // When a browser asks for outsync.css, read the file and serve it
  if (url.pathname === "/outsync.css") {
    try {
      const cssContent = Deno.readTextFileSync("./outsync.css");
      return new Response(cssContent, {
        status: 200,
        headers: {
          "Content-Type": "text/css",
          // This CORS header is crucial: it allows your other domains to load this file
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch {
      return new Response("File not found", { status: 404 });
    }
  }

  // If they ask for anything else, return a simple 404
  return new Response("Core Assets Server", { status: 404 });
});
