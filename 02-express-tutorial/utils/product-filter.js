//@ts-check
/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} desc
 * @property {string} image
 * @property {number} price
 */

/**
 * @param {Product[]} products
 * @param {string} name
 * @returns {Product[]}
 */
const filterByName = (products, name) => {
  if (name) {
    return products.filter((product) => product.name.includes(name));
  }
  return products;
};

/**
 * @param {Product[]} products
 * @param {string} description
 * @returns {Product[]}
 */
const filterByDescription = (products, description) => {
  if (description) {
    return products.filter((product) => product.desc.includes(description));
  }
  return products;
};

/**
 * @param {Product[]} products
 * @param {number} minPrice
 * @returns {Product[]}
 */
const filterByMinPrice = (products, minPrice) => {
  if (minPrice) {
    return products.filter((product) => product.price >= +minPrice);
  }
  return products;
};

/**
 * @param {Product[]} products
 * @param {number} maxPrice
 * @returns {Product[]}
 */
const filterByMaxPrice = (products, maxPrice) => {
  if (maxPrice) {
    return products.filter((product) => product.price <= +maxPrice);
  }
  return products;
};

class ProductFilter {
  products;

  /**
   * Pass products array to create new ProductFilter.
   * Use method chaining to filter.
   * @param {Product[]} products
   */
  constructor(products) {
    this.products = products;
  }

  /**
   * Filters by name
   * @param {string} name
   * @returns {ProductFilter}
   */
  filterByName = (name) => {
    this.products = filterByName(this.products, name);
    return this;
  };

  /**
   * Filters by description
   * @param {string} description
   * @returns {ProductFilter}
   */
  filterByDescription = (description) => {
    this.products = filterByDescription(this.products, description);
    return this;
  };

  /**
   * Filters by min price
   * @param {number} minPrice
   * @returns {ProductFilter}
   */
  filterByMinPrice = (minPrice) => {
    this.products = filterByMinPrice(this.products, minPrice);
    return this;
  };

  /**
   * Filters by max price
   * @param {number} maxPrice
   * @returns {ProductFilter}
   */
  filterByMaxPrice = (maxPrice) => {
    this.products = filterByMaxPrice(this.products, maxPrice);
    return this;
  };

  /**
   * Return the final result
   * @returns Product[]
   */
  result = () => {
    return this.products;
  };
}

export const createDebugFunctions = () => {
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv && nodeEnv !== "development") {
    throw new Error(
      `Expected NODE_ENV to be "development", got ${nodeEnv} instead`
    );
  }
  return {
    filterByName,
    filterByDescription,
    filterByMinPrice,
    filterByMaxPrice,
  };
};

export default ProductFilter;
