const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router
  .get("/:id", getTask)
  .patch("/:id", updateTask)
  .delete("/:id", deleteTask)
  .post("/", createTask)
  .get("/", getAllTasks);

module.exports = router;
