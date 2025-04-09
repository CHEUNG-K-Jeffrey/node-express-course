//@ts-check
/**
 * @import {Request, Response, NextFunction} from "express";
 * @import {Query} from "./utils/product-query.js"
 */
import express from "express";
import productQuery from "./utils/product-query.js";
import productsRouter from "./routes/products.js";
import peopleRouter from "./routes/people.js";

const app = express();
console.log("Express Tutorial");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./methods-public"));

/**
 * Logs a message on a request
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const logger = (req, res, next) => {
  console.log(`${new Date()} ${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.use("/api/v1/products", productsRouter);
app.get("/api/v1/query", async (req, res) => {
  let results = productQuery(/**@type {Query}*/ (req.query));

  // Limit the number of results
  if (req.query.limit) {
    results = results.slice(0, +req.query.limit);
  }

  return res.json(results);
});
app.get("/api/v1/test", (_req, res) => res.json({ message: "It worked!" }));

// Handle broken axios client in methods-public/
app.all("/api/people", async (_req, res) => {
  return res.redirect("/api/v1/people");
});

app.use("/api/v1/people", peopleRouter);

app.all("/*", (_req, res) => {
  res.sendStatus(500);
});

app.listen(3000);
