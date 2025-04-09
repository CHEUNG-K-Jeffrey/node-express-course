//@ts-check
/**
 * @import {Request, Response} from "express"
 */
import { ServerSentEventGenerator } from "datastar-ssegen";
import productQuery from "../utils/product-query.js";
import { products } from "../data.cjs";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getProducts = (req, res) => {
  const headers = req.headers;
  if (
    headers.accept === "text/event-stream" &&
    headers["datastar-request"] === "true"
  ) {
    const sse = ServerSentEventGenerator(req, res);
    let query;

    if (req.query?.datastar) {
      try {
        query = JSON.parse(/** @type {string} */ (req.query.datastar));
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
};

/**
 * @import {ProductIdRequest} from "../routes/products.js"
 * @param {ProductIdRequest} req
 * @param {Response} res
 * @returns
 */
const getProduct = (req, res) => {
  const product = products.find(
    (product) => product.id === +req.params.productId
  );

  // Product guard statement
  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  // Passed guard
  return res.json(product);
};

export { getProducts, getProduct };
