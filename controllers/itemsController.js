import { body, matchedData, validationResult } from "express-validator";
import db from "../db/queries.js";

const getItems = async (req, res) => {
  const items = await db.getAllItems();

  res.render("allItems", { allItems: items });
};

const postItems = [
  body("model").notEmpty().trim().escape(),
  body("category").notEmpty().trim().escape(),
  body("producer").notEmpty().trim().escape(),
  body("quantity").notEmpty().trim().isInt({ min: 0 }).escape(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    const { model, category, producer, quantity } = matchedData(req);

    const categoryId = (await db.getCategoryByName(category))[0].category_id;
    const producerId = (await db.getProducerByName(producer))[0].producer_id;

    await db.addItem(model, categoryId, producerId, quantity);

    res.redirect("items");
  },
];

const getItemsId = (req, res) => {
  res.render("item", { item: {} });
};

const deleteItemsId = (req, res) => {
  // TODO
};

const getItemsNew = async (req, res) => {
  const producers = await db.getAllProducers();
  const categories = await db.getAllCategories();

  res.render("addItem", { producers: producers, categories: categories });
};

export default {
  getItems,
  postItems,

  getItemsId,
  deleteItemsId,

  getItemsNew,
};
