const express = require("express");
const router = express.Router();
const {
  addPerson,
  getPerson,
  getPeople,
  updatePerson,
  deletePerson,
} = require("../controllers/people.js");

router
  .get("/:id", (req, res) => {
    getPerson(req, res);
  })
  .put("/:id", (req, res) => {
    updatePerson(req, res);
  })
  .delete("/:id", (req, res) => {
    deletePerson(req, res);
  })
  .get("/", (req, res) => {
    getPeople(req, res);
  })
  .post("/", (req, res) => {
    addPerson(req, res);
  });

module.exports = router;
