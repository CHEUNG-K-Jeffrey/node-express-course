const { products, people } = require("./data.js");
const peopleRouter = require("./routes/people.js");
const express = require("express");
console.log("Express Tutorial");

const app = express();

const logger = (req, res, next) => {
  console.log(`${Date.now()} ${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.use(express.static("./methods-public"));

app.get("/api/v1/products/:productID", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.productID));
  res
    .status(product ? 200 : 404)
    .json(product ?? { message: "That product was not found." });
});

app.get("/api/v1/products/", (req, res) => {
  res.json(products);
});

app.get("/api/v1/query", (req, res) => {
  const response = products
    .filter((product) => {
      if (!req.query.search) {
        return true;
      }
      if (product.name.startsWith(req.query.search)) {
        return true;
      }
    })
    .filter((product) => {
      if (!req.query.maxPrice) {
        return true;
      }
      if (req.query.maxPrice && product.price <= Number(req.query.maxPrice)) {
        return true;
      }
    })
    .slice(0, req.query.limit);
  res.json(response);
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

// app.get("/api/v1/people", (req, res) => {
//   res.json(people);
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/people", peopleRouter);

// app.post("/api/v1/people", (req, res) => {
//   if (!req.body.name) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide a name" });
//   }

//   people.push({ id: people.length + 1, name: req.body.name });
//   res.status(201).json({ succcess: true, name: req.body.name });
// });

app.listen(3000, () => console.log("Listening on port 3000"));
