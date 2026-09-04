import db from "../db/queries.js";

const getItems = async (req, res) => {
  const items = await db.getAllItems();

  res.render("allItems", { allItems: items });
};

const postItems = (req, res) => {
  // TODO
};

const getItemsId = (req, res) => {
  res.render("item", { item: {} });
};

const deleteItemsId = (req, res) => {
  // TODO
};

const getItemsNew = (req, res) => {
  res.render("addItem");
};

export default {
  getItems,
  postItems,

  getItemsId,
  deleteItemsId,

  getItemsNew,
};
