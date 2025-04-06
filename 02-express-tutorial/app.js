import express from "express";
import productQuery from "./controller/product-query.js";
import { products } from "./data.cjs";
import { ServerSentEventGenerator } from "datastar-ssegen";

const app = express();
console.log("Express Tutorial");
app.use(express.static("./public"));

app.get("/api/v1/products", async (req, res) => {
  const headers = req.headers;
  if (
    headers.accept === "text/event-stream" &&
    headers["datastar-request"] === "true"
  ) {
    const sse = ServerSentEventGenerator(req, res);

    let query;
    if (req.query?.datastar) {
      try {
        query = JSON.parse(req.query.datastar);
      } catch (error) {
        console.error(error);
      }
    }

    let results = productQuery(query);

    let resultFragment = "";
    results.forEach(
      (product) =>
        (resultFragment += `<div id="product-${product.id}"> <img src="${product.image}"/> ${product.name} $${product.price}
          <div>${product.desc}</div></div>`)
    );
    sse.MergeFragments(`
      <div id="results">${resultFragment}</div>
      `);
    return res.end();
  }
  return res.json(products);
});

app.get("/api/v1/products/:productID", async (req, res) => {
  const product = products.find(
    (product) => product.id === +req.params.productID
  );

  // Product guard statement
  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  // Passed guard
  return res.json(product);
});
app.get("/api/v1/query", async (req, res) => {
  let results = productQuery;

  // Limit the number of results
  if (req.query.limit) {
    results = results.slice(0, req.query.limit);
  }

  return res.json(results);
});
app.get("/api/v1/test", (_req, res) => res.json({ message: "It worked!" }));
app.all("/*", (_req, res) => {
  res.sendStatus(404);
});

app.listen(3000);
