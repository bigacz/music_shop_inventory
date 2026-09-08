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

const postCategories = async (req, res) => {};

export default {
  getAllCategories,
  getCategory,
  postCategories,
};
