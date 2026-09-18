import { body, matchedData, param, validationResult } from "express-validator";
import db from "../db/queries.js";

const getItem = [
  param("itemId").notEmpty().trim().isInt().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }
    const { itemId } = matchedData(req);

    const items = await db.getItemById(itemId);

    res.render("item/item", { item: items[0] });
  },
];

const getItems = async (req, res) => {
  const items = await db.getAllItems();

  res.render("item/allItems", { allItems: items });
};

const getItemsNew = async (req, res) => {
  const producers = await db.getAllProducers();
  const categories = await db.getAllCategories();

  res.render("item/addItem", { producers: producers, categories: categories });
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

const deleteItem = [
  param("itemId")
    .notEmpty()
    .withMessage("Field cant be empty")
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    const { itemId } = matchedData(req);

    await db.deleteItemById(itemId);

    res.redirect("items");
  },
];

const patchItem = [
  param("itemId")
    .notEmpty()
    .withMessage("Field can't be empty")
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  body("newModel")
    .notEmpty()
    .withMessage("Field can't be empty")
    .trim()
    .isAlpha()
    .withMessage("Field must be alphanumeric")
    .escape(),
  body("newCategoryId")
    .notEmpty()
    .withMessage("Field can't be empty")
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  body("newProducerId")
    .notEmpty()
    .withMessage("Field can't be empty")
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  body("newQuantity").escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { itemId, newModel, newCategoryId, newProducerId, newQuantity } =
      matchedData(req);
    try {
      await db.updateItemById(
        itemId,
        newModel,
        newCategoryId,
        newProducerId,
        newQuantity,
      );
    } catch (error) {
      res.status(500).send("Internal server error");
      console.error(error);
    }

    res.status(200).send();
  },
];

export default {
  getItems,
  getItem,
  getItemsNew,

  postItems,

  deleteItem,

  patchItem,
};
