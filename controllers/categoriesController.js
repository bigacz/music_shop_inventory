import { body, matchedData, param, validationResult } from "express-validator";
import db from "../db/queries.js";

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

export default {
  getCategory,
  getCategoryEdit,
  getAllCategories,
  getCategoryNew,

  postCategories,

  deleteCategory,
};
