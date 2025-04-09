//@ts-check
/**
 * @import {Request, Response} from "express";
 * @import {PersonIdRequest} from "../routes/people.js"
 */
import { people } from "../data.cjs";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const addPerson = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }
  people.push({ id: people.length + 1, name: req.body.name });
  return res.status(201).json({ success: true, name: req.body.name });
};

/**
 *
 * @param {PersonIdRequest} req
 * @param {Response} res
 * @returns
 */
const getPerson = (req, res) => {
  const person = people.find((person) => {
    if (person.id !== +req.params.personId) {
      return false;
    }
    return true;
  });
  if (!person) {
    return res
      .status(404)
      .json({ sucess: false, message: "The person was not found" });
  }
  return res.json({ data: person });
};

/**
 *
 * @param {PersonIdRequest} req
 * @param {Response} res
 * @returns
 */
const putPerson = (req, res) => {
  const person = people.find((person) => {
    if (person.id !== +req.params.personId) {
      return false;
    }
    return true;
  });
  if (!person) {
    return res
      .status(404)
      .json({ sucess: false, message: "The person was not found" });
  }
  Object.assign(person, req.body);
  return res.json({ data: person });
};

/**
 *
 * @param {PersonIdRequest} req
 * @param {Response} res
 * @returns
 */
const deletePerson = (req, res) => {
  const person = people.findIndex((person) => {
    if (person.id !== +req.params.personId) {
      return false;
    }
    return true;
  });
  if (person == -1) {
    return res
      .status(404)
      .json({ sucess: false, message: "The person was not found" });
  }
  people.splice(person, 1);
  return res.json({ data: person });
};

/**
 *
 * @param {Request} _req
 * @param {Response} res
 * @returns
 */
const getPeople = (_req, res) => {
  return res.json({ data: people });
};

export { getPerson, addPerson, putPerson, deletePerson, getPeople };
