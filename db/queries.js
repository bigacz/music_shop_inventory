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

export default {
  getAllItems,
  getAllProducers,
};
