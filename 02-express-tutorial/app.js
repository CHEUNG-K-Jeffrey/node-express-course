//@ts-check
/**
 * @import {Request, Response, NextFunction} from "express-serve-static-core";
 * @import {Query} from "./utils/product-query.js"
 */
import express from "express";
import productQuery from "./utils/product-query.js";
import productsRouter from "./routes/products.js";
import peopleRouter from "./routes/people.js";
import cookieParser from "cookie-parser";

const app = express();
console.log("Express Tutorial");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./methods-public"));

/**
 * Auth middleware
 * @typedef {Request & {user?: Record<string, any>}} AuthRequest
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const auth = (req, res, next) => {
  if (!req.cookies.name) {
    return res.status(401).json({ success: false, message: "unathorized" });
  }
  req.user = req.cookies.name;
  next();
};

/**
 * Logs a message on a request
 * @param {Request} req
 * @param {Response} _res
 * @param {NextFunction} next
 */
const logger = (req, _res, next) => {
  console.log(`${new Date()} ${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.post("/logon", async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is missing in body" });
  }
  return res
    .cookie("name", req.body.name)
    .status(201)
    .json({ message: `Hello ${req.body.name}` });
});

app.delete("/logoff", async (_req, res) => {
  return res.clearCookie("name").status(200).json("User is logged off");
});

app.get("/test", auth, async (/**@type {AuthRequest} */ req, res) => {
  return res.status(200).json({ message: `Welcome ${req.user}` });
});

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
