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

const getItem = [
  param("itemId").notEmpty().trim().isInt().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }
    const { itemId } = matchedData(req);

    const items = await db.getItemById(itemId);

    if (items.length == 0) {
      return res.render("notFound");
    }

    res.render("item/item", { item: items[0] });
  },
];

const getItemEdit = [
  param("itemId").notEmpty().trim().escape(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const { itemId } = matchedData(req);

    const items = await db.getItemById(itemId);
    const categories = await db.getAllCategories();
    const producers = await db.getAllProducers();

    if (items.length == 0) {
      return res.render("notFound");
    }

    res.render("item/editItem", {
      item: items[0],
      categories: categories,
      producers: producers,
    });
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
  body("categoryId")
    .notEmpty()
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  body("producerId")
    .notEmpty()
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  body("quantity").notEmpty().trim().isInt({ min: 0 }).escape(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    const { model, categoryId, producerId, quantity } = matchedData(req);

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
  redirectNonIntegers,
  getItems,
  getItem,
  getItemsNew,
  getItemEdit,

  postItems,

  deleteItem,

  patchItem,
};
