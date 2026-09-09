import { body, matchedData, validationResult } from "express-validator";
import db from "../db/queries.js";

const getAllProducers = async (req, res) => {
  const producers = await db.getAllProducers();

  return res.render("producer/allProducers", { producers });
};

const getProducer = async (req, res) => {
  const producerId = req.params.id;

  const items = await db.getAllItemsByProducerId(producerId);

  res.render("producer/producer", { items });
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

export default {
  getAllProducers,
  getProducer,
  postProducer,
  getProducerNew,
};
