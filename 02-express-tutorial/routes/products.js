//@ts-check
/**
 * @import {Request, Response} from "express";
 */
import express from "express";
import { getProducts, getProduct } from "../controllers/products.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return getProducts(req, res);
});

/**
 * @typedef {Request & {params: {productId: string}}} ProductIdRequest
 */
router.get("/:productId", async (/**@type ProductIdRequest**/ req, res) => {
  return getProduct(req, res);
});

export default router;
