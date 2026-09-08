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

async function addItem(model, category_id, producer_id, quantity) {
  const query = await pool.query(
    "INSERT INTO items(model, category_id, producer_id, quantity) VALUES($1, $2, $3, $4)",
    [model, category_id, producer_id, quantity],
  );
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

export default {
  getAllItems,
  getAllProducers,
  getAllCategories,

  addItem,

  getCategoryByName,
  getProducerByName,

  getAllItemsByCategoryId,
  getAllItemsByProducerId,
};
