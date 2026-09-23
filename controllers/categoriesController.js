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

const getCategory = [
  param("categoryId")
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

    const { categoryId } = matchedData(req);

    const items = await db.getAllItemsByCategoryId(categoryId);
    const category = (await db.getCategoryById(categoryId))[0];

    if (!category) {
      return res.render("notFound");
    }

    res.render("category/category", { items, category });
  },
];

const getCategoryEdit = [
  param("categoryId")
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

    const { categoryId } = matchedData(req);

    const categoryInfo = (await db.getCategoryById(categoryId))[0];

    if (!categoryInfo) {
      return res.render("notFound");
    }

    res.render("category/editCategory", { categoryInfo });
  },
];

const getAllCategories = async (req, res) => {
  const categories = await db.getAllCategories();

  return res.render("category/allCategories", { categories });
};

const getCategoryNew = async (req, res) => {
  res.render("category/addCategory");
};

const postCategories = [
  body("categoryName").notEmpty().trim().escape(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return { errors: result.array() };
    }

    const { categoryName } = matchedData(req);

    await db.addCategory(categoryName);

    res.redirect("categories");
  },
];

const deleteCategory = [
  param("categoryId")
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

    const { categoryId } = matchedData(req);

    await db.deleteCategoryById(categoryId);

    res.status(200).end();
  },
];

const patchCategory = [
  param("categoryId")
    .notEmpty()
    .withMessage("Field can't be empty")
    .trim()
    .isInt()
    .withMessage("Field must be an integer")
    .escape(),
  body("newCategory")
    .notEmpty()
    .withMessage("Field can't be empty")
    .trim()
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { categoryId, newCategory } = matchedData(req);
    try {
      await db.updateCategoryById(categoryId, newCategory);
    } catch (error) {
      res.status(500).send("Internal server error");
      console.error(error);
    }

    res.status(200).send();
  },
];

export default {
  redirectNonIntegers,

  getCategory,
  getCategoryEdit,
  getAllCategories,
  getCategoryNew,

  postCategories,

  deleteCategory,

  patchCategory,
};
