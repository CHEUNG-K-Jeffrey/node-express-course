//@ts-check
/**
 * @import {Request} from "express";
 */
import express from "express";
import {
  getPerson,
  addPerson,
  putPerson,
  deletePerson,
  getPeople,
} from "../controllers/people.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return getPeople(req, res);
});

/**
 * @typedef {Request & {params: {personId: string}}} PersonIdRequest
 */
router.get("/:personId", async (/**@type PersonIdRequest**/ req, res) => {
  return getPerson(req, res);
});

router.put("/:personId", async (/**@type PersonIdRequest**/ req, res) => {
  return putPerson(req, res);
});

router.delete("/:personId", async (/**@type PersonIdRequest**/ req, res) => {
  return deletePerson(req, res);
});

router.post("/", async (req, res) => {
  addPerson(req, res);
});

export default router;
