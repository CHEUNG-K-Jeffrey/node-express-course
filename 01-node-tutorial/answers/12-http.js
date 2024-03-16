const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Welcome to the home page!");
    } else if (req.url === "/about") {
        res.end("About us:")
    } else {
        res.end("<p> The page was not found </p>");
    }
})

server.listen(3000);