import { body, matchedData, param, validationResult } from "express-validator";
import db from "../db/queries.js";

const redirectNonIntegers = [
  param("param").trim().isInt().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("notFound");
    }

    next();
  },
];

const getProducer = [
  param("producerId")
    .notEmpty()
    .withMessage("Field cant be empty")
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.set("content-type", "application/json");

      return res.json({ errors: errors.array() });
    }

    const { producerId } = matchedData(req);

    const items = await db.getAllItemsByProducerId(producerId);
    const producerInfo = (await db.getProducerById(producerId))[0];

    if (!producerInfo) {
      return res.render("notFound");
    }

    res.render("producer/producer", { items, producerInfo });
  },
];

const getProducerEdit = [
  param("producerId")
    .notEmpty()
    .withMessage("Field cant be empty")
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.set("content-type", "application/json");

      return res.json({ errors: errors.array() });
    }

    const { producerId } = matchedData(req);

    const producerInfo = (await db.getProducerById(producerId))[0];

    if (!producerInfo) {
      return res.render("notFound");
    }

    res.render("producer/editProducer", { producerInfo });
  },
];

const getAllProducers = async (req, res) => {
  const producers = await db.getAllProducers();

  return res.render("producer/allProducers", { producers });
};

const getProducerNew = async (req, res) => {
  return res.render("producer/addProducer");
};

const postProducer = [
  body("producer").notEmpty().trim().escape(),
  body("location").notEmpty().trim().escape(),
  body("email").notEmpty().trim().isEmail().escape(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    const { producer, location, email } = matchedData(req);

    await db.addProducer(producer, location, email);

    res.redirect("producers");
  },
];

const deleteProducer = [
  param("producerId")
    .notEmpty()
    .withMessage("Field cant be empty")
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.set("content-type", "application/json");

      return res.json({ errors: errors.array() });
    }

    const { producerId } = matchedData(req);

    await db.deleteProducerById(producerId);

    res.status(200).end();
  },
];

const patchProducer = [
  param("producerId")
    .notEmpty()
    .withMessage("Field can't be empty")
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  body("newProducer")
    .notEmpty()
    .withMessage("Field can't be empty")
    .trim()
    .escape(),
  body("newEmail")
    .notEmpty()
    .withMessage("Field can't be empty")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email")
    .escape(),
  body("newLocation")
    .notEmpty()
    .withMessage("Field can't be empty")
    .trim()
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { producerId, newProducer, newEmail, newLocation } = matchedData(req);
    try {
      await db.updateProducerById(
        producerId,
        newProducer,
        newEmail,
        newLocation,
      );
    } catch (error) {
      res.status(500).send("Internal server error");
      console.error(error);
    }

    res.status(200).send();
  },
];

export default {
  redirectNonIntegers,

  getProducer,
  getProducerEdit,
  getAllProducers,
  getProducerNew,

  postProducer,

  deleteProducer,

  patchProducer,
};
