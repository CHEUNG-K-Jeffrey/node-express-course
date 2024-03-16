const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

// here is a function that splits url parameters and creates a lookup table
const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let color = "white";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style='background-color:${color}':>
  <p style="font-size: 50px; -webkit-text-stroke-width: 3px; -webkit-text-stroke-color: white">Welcome!</p>
  <form method="POST">
  <select name="color">
    <option ${color === "black"? "selected": null} value="black">Black</option>
    <option ${color === "red"? "selected": null} value="red">Red</option>
    <option ${color === "green"? "selected": null} value="green">Green</option>
    <option ${color === "blue"? "selected": null} value="blue">Blue</option>
    <option ${color === "white"? "selected": null} value="white">White</option>
    <option ${color === "cyan"? "selected": null} value="cyan">Cyan</option>
    <option ${color === "yellow"? "selected": null} value="yellow">Yellow</option>
    <option ${color === "magenta"? "selected": null} value="magenta">Magenta</option>
  </select>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["color"]) {
        color = body["color"];
      } else {
        color = "black";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event recieved: ", req.method, req.url);
})
server.listen(3000);
console.log("The server is listening on port 3000.");
