//@ts-check
import { products } from "../data.cjs";
import ProductFilter from "../controller/product-filter.js";

/**
 * @typedef {object} Query
 * @property {string} search
 * @property {string} desc
 * @property {string} minPrice
 * @property {string} maxPrice
 */

/**
 * @param {Query} query
 */
const productQuery = (query) => {
  const results = new ProductFilter(products);
  return results
    .filterByName(query?.search)
    .filterByDescription(query?.desc)
    .filterByMinPrice(+query?.minPrice)
    .filterByMaxPrice(+query?.maxPrice)
    .result();
};

export default productQuery;
