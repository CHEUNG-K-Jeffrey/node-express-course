import { products } from "../data.cjs";
import ProductFilter from "../controller/product-filter.js";

const productQuery = (query) => {
  const results = new ProductFilter(products);
  return results
    .filterByName(query?.search)
    .filterByDescription(query?.desc)
    .filterByMinPrice(query?.minPrice)
    .filterByMaxPrice(query?.maxPrice)
    .result();
};

export default productQuery;
