import pool from "./pool.js";

async function getAllItems() {
  const query = await pool.query(
    `SELECT * FROM items 
    INNER JOIN producers ON items.producer_id=producers.producer_id 
    INNER JOIN categories ON items.category_id=categories.category_id;`,
  );

  return query.rows;
}

async function getAllProducers() {
  const query = await pool.query(`SELECT * FROM producers;`);

  return query.rows;
}

async function getAllCategories() {
  const query = await pool.query(`SELECT * FROM categories;`);

  return query.rows;
}

async function getItemById(itemId) {
  const query = await pool.query(
    `SELECT * FROM items 
    INNER JOIN producers ON items.producer_id=producers.producer_id 
    INNER JOIN categories ON items.category_id=categories.category_id 
    WHERE item_id=$1 `,
    [itemId],
  );

  return query.rows;
}

async function addItem(model, category_id, producer_id, quantity) {
  const query = await pool.query(
    "INSERT INTO items(model, category_id, producer_id, quantity) VALUES($1, $2, $3, $4)",
    [model, category_id, producer_id, quantity],
  );
}

async function addProducer(producer, location, email) {
  const query = await pool.query(
    "INSERT INTO producers(producer_name, location, email) VALUES($1, $2, $3)",
    [producer, location, email],
  );
}

async function addCategory(categoryName) {
  await pool.query("INSERT INTO categories(category) VALUES($1)", [
    categoryName,
  ]);
}

async function getCategoryByName(categoryName) {
  const query = await pool.query(
    "SELECT * FROM categories WHERE category=$1;",
    [categoryName],
  );

  return query.rows;
}

async function getAllItemsByCategoryId(categoryId) {
  const query = await pool.query(
    `SELECT * FROM items 
    INNER JOIN producers ON items.producer_id=producers.producer_id 
    INNER JOIN categories ON items.category_id=categories.category_id 
    WHERE items.category_id=$1;`,
    [categoryId],
  );

  return query.rows;
}

async function getAllItemsByProducerId(producerId) {
  const query = await pool.query(
    `SELECT * FROM items 
    INNER JOIN producers ON items.producer_id=producers.producer_id 
    INNER JOIN categories ON items.category_id=categories.category_id 
    WHERE items.producer_id=$1;`,
    [producerId],
  );

  return query.rows;
}

async function getProducerByName(producerName) {
  const query = await pool.query(
    "SELECT * FROM producers WHERE producer_name=$1;",
    [producerName],
  );

  return query.rows;
}

async function getProducerById(producerId) {
  const query = await pool.query(
    "SELECT * FROM producers WHERE producer_id=$1;",
    [producerId],
  );

  return query.rows;
}

async function deleteItemById(itemId) {
  await pool.query("DELETE FROM items WHERE item_id=$1", [itemId]);
}

async function deleteCategoryById(categoryId) {
  await pool.query("DELETE FROM items WHERE category_id=$1", [categoryId]);
  await pool.query("DELETE FROM categories WHERE category_id=$1", [categoryId]);
}

async function deleteProducerById(producerId) {
  await pool.query("DELETE FROM items WHERE producer_id=$1", [producerId]);
  await pool.query("DELETE FROM producers WHERE producer_id=$1", [producerId]);
}

export default {
  getAllItems,
  getAllProducers,
  getAllCategories,

  addItem,
  addProducer,
  addCategory,

  getCategoryByName,
  getProducerByName,

  getItemById,
  getProducerById,

  deleteItemById,
  deleteCategoryById,
  deleteProducerById,

  getAllItemsByCategoryId,
  getAllItemsByProducerId,
};
