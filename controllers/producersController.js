import db from "../db/queries.js";

const getAllProducers = async (req, res) => {
  const producers = await db.getAllProducers();

  return res.render("allProducers", { producers });
};

const getProducer = async (req, res) => {
  const producerId = req.params.id;

  const items = await db.getAllItemsByProducerId(producerId);

  res.render("producer", { items });
};

const postProducer = async (req, res) => {};

export default {
  getAllProducers,
  getProducer,
  postProducer,
};
