let { people } = require("../data.js");

let addPerson = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  people.push({ id: people.length + 1, name: req.body.name });
  res.status(201).json({ succcess: true, name: req.body.name });
};

let getPerson = (req, res) => {
  const person = people.find((person) => person.id === req.params.id * 1);
  return res
    .status(person ? 200 : 404)
    .json(person ?? { success: false, message: "That person was not found" });
};

let updatePerson = (req, res) => {
  const index = people.findIndex((person) => person.id === req.params.id * 1);
  if (!index) {
    res.status(404);
    return res.json({ success: false, message: "That person was not found" });
  }
  if (!req.body.name) {
    res.status(400);
    return res.json({
      success: false,
      message: "Name in the body was not found",
    });
  }
  const person = { ...people[index] };
  person.id = req.params.id * 1;
  person.name = req.body.name;
  people[index] = person;
  console.log(people[index]);
  res
    .status(person ? 200 : 404)
    .json(person ?? { success: false, message: "That person was not found" });
};

let getPeople = (req, res) => {
  res.json(people);
};

let deletePerson = (req, res) => {
  const matchingPersonById = (person) => person.id === req.params.id * 1;
  const person = people.find(matchingPersonById);
  people = people.filter((person) => !matchingPersonById(person));
  res.status(person ? 200 : 404).json(
    person
      ? { success: true }
      : {
          success: false,
          message: "Failed to delete non-existent person",
        }
  );
};

module.exports = {
  addPerson,
  getPerson,
  updatePerson,
  getPeople,
  deletePerson,
};
