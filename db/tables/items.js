import pool from "../pool.js";

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

async function getAllItems() {
  const query = await pool.query(
    `SELECT * FROM items 
    INNER JOIN producers ON items.producer_id=producers.producer_id 
    INNER JOIN categories ON items.category_id=categories.category_id;`,
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

async function addItem(model, category_id, producer_id, quantity) {
  const query = await pool.query(
    "INSERT INTO items(model, category_id, producer_id, quantity) VALUES($1, $2, $3, $4)",
    [model, category_id, producer_id, quantity],
  );
}

async function deleteItemById(itemId) {
  await pool.query("DELETE FROM items WHERE item_id=$1", [itemId]);
}

async function updateItemById(
  itemId,
  newModel,
  newCategoryId,
  newProducerId,
  newQuantity,
) {
  await pool.query(
    `UPDATE items SET model=$1, category_id=$2, producer_id=$3, quantity=$4 
    WHERE item_id=$5;`,
    [newModel, newCategoryId, newProducerId, newQuantity, itemId],
  );
}

export default {
  getItemById,
  getAllItems,
  getAllItemsByCategoryId,
  getAllItemsByProducerId,

  addItem,

  deleteItemById,

  updateItemById,
};
