import express from "express";
import { products } from "./data.cjs";
import { ServerSentEventGenerator } from "datastar-ssegen";

const app = express();
console.log("Express Tutorial");
app.use(express.static("./public"));

const filterByProductName = (products, name) => {
  // Filter by product name
  if (name) {
    return products.filter((product) => product.name.includes(name));
  }
  return products;
};

const filterByDescription = (products, description) => {
  // Filter by description
  if (description) {
    return products.filter((product) => product.desc.includes(description));
  }
  return products;
};

const filterByMinPrice = (products, minPrice) => {
  // Filter by min price
  if (minPrice) {
    return products.filter((product) => product.price >= +minPrice);
  }
  return products;
};

const filterByMaxPrice = (products, maxPrice) => {
  // Filter by min price
  if (maxPrice) {
    return products.filter((product) => product.price <= +maxPrice);
  }
  return products;
};

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

    let results = products;

    results = filterByProductName(results, query.search);

    results = filterByDescription(results, query.desc);

    results = filterByMinPrice(results, query.minPrice);

    results = filterByMaxPrice(results, query.maxPrice);

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
  let results = products;

  results = filterByProductName(results, req.query.search);

  results = filterByDescription(results, req.query.desc);

  results = filterByMinPrice(results, req.query.minPrice);

  results = filterByMaxPrice(results, req.query.maxPrice);

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
