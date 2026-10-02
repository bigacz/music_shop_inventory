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
    .withMessage("categoryId cant be empty")
    .trim()
    .isInt()
    .withMessage("categoryId must be an integer")
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
    .withMessage("categoryId cant be empty")
    .trim()
    .isInt()
    .withMessage("categoryId must be an integer")
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
  body("categoryName")
    .notEmpty()
    .withMessage("Category name can't be empty!")
    .trim()
    .escape(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json(result.array());
    }

    const { categoryName } = matchedData(req);

    try {
      const query = await db.addCategory(categoryName);
    } catch (error) {
      if (error.code === "23505") {
        res
          .status(400)
          .json([{ msg: "There is already a category with this name" }]);
        return;
      } else {
        throw error;
      }
    }

    res.status(200).send();
  },
];

const deleteCategory = [
  param("categoryId")
    .notEmpty()
    .withMessage("categoryId cant be empty")
    .trim()
    .isInt()
    .withMessage("categoryId must be an integer")
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
    .withMessage("categoryId can't be empty")
    .trim()
    .isInt()
    .withMessage("categoryId must be an integer")
    .escape(),
  body("newCategory")
    .notEmpty()
    .withMessage("Category name can't be empty")
    .trim()
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { categoryId, newCategory } = matchedData(req);

    try {
      const query = await db.updateCategoryById(categoryId, newCategory);
    } catch (error) {
      if (error.code === "23505") {
        res
          .status(400)
          .json([{ msg: "There is already a category with this name" }]);
        return;
      } else {
        throw error;
      }
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
