import pool from "../pool.js";

async function getCategoryByName(categoryName) {
  const query = await pool.query(
    "SELECT * FROM categories WHERE category=$1;",
    [categoryName],
  );

  return query.rows;
}

async function getCategoryById(categoryId) {
  const query = await pool.query(
    "SELECT * FROM categories WHERE category=$1;",
    [categoryId],
  );

  return query.rows;
}

async function getAllCategories() {
  const query = await pool.query(`SELECT * FROM categories;`);

  return query.rows;
}

async function addCategory(categoryName) {
  await pool.query("INSERT INTO categories(category) VALUES($1)", [
    categoryName,
  ]);
}

async function deleteCategoryById(categoryId) {
  await pool.query("DELETE FROM items WHERE category_id=$1", [categoryId]);
  await pool.query("DELETE FROM categories WHERE category_id=$1", [categoryId]);
}

export default {
  getCategoryByName,
  getCategoryById,
  getAllCategories,

  addCategory,

  deleteCategoryById,
};
