import { body, matchedData, param, validationResult } from "express-validator";
import db from "../db/queries.js";

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

export default {
  getProducer,
  getProducerEdit,
  getAllProducers,
  getProducerNew,

  postProducer,

  deleteProducer,
};
