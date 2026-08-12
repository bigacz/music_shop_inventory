const getItems = (req, res) => {
  res.render("allItems", { allItems: [] });
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
