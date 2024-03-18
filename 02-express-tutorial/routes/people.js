const express = require("express");
const router = express.Router();
const {
  addPerson,
  getPerson,
  getPeople,
  updatePerson,
  deletePerson,
} = require("../controllers/people.js");

router.get("/:id", (req, res) => {
  getPerson(req, res);
});

router.put("/:id", (req, res) => {
  updatePerson(req, res);
});

router.delete("/:id", (req, res) => {
  deletePerson(req, res);
});

router.get("/", (req, res) => {
  getPeople(req, res);
});

router.post("/", (req, res) => {
  addPerson(req, res);
});

module.exports = router;
