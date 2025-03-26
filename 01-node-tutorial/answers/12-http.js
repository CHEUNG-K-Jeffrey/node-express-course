import http, { Server } from "node:http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write(`<!DOCTYPE html>
    <html>
      <head>
      <title>App</title>
      </head>
    <body>
    <p>Hello</p>
    </body
    </html>`);
  res.end();
});

server.listen(3000);
