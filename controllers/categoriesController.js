import { body, matchedData, validationResult } from "express-validator";
import db from "../db/queries.js";

const getAllCategories = async (req, res) => {
  const categories = await db.getAllCategories();

  return res.render("allCategories", { categories });
};

const getCategory = async (req, res) => {
  const categoryId = req.params.id;

  const items = await db.getAllItemsByCategoryId(categoryId);

  res.render("category", { items });
};

const getCategoryNew = async (req, res) => {
  res.render("addCategory");
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

export default {
  getAllCategories,
  getCategory,
  postCategories,
  getCategoryNew,
};
