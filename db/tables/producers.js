import pool from "../pool.js";

async function getProducerById(producerId) {
  const query = await pool.query(
    "SELECT * FROM producers WHERE producer_id=$1;",
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

async function getAllProducers() {
  const query = await pool.query(`SELECT * FROM producers;`);

  return query.rows;
}

async function addProducer(producer, location, email) {
  const query = await pool.query(
    "INSERT INTO producers(producer_name, location, email) VALUES($1, $2, $3)",
    [producer, location, email],
  );
}

async function deleteProducerById(producerId) {
  await pool.query("DELETE FROM items WHERE producer_id=$1", [producerId]);
  await pool.query("DELETE FROM producers WHERE producer_id=$1", [producerId]);
}

async function updateProducerById(
  producerId,
  newProducer,
  newEmail,
  newLocation,
) {
  await pool.query(
    `UPDATE producers SET producer_name=$1, email=$2, location=$3
    WHERE producer_id=$4;`,
    [newProducer, newEmail, newLocation, producerId],
  );
}

export default {
  getProducerById,
  getProducerByName,
  getAllProducers,

  addProducer,

  deleteProducerById,

  updateProducerById,
};
