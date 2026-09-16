import categories from "./tables/categories.js";
import items from "./tables/items.js";
import producers from "./tables/producers.js";

export default {
  ...producers,
  ...categories,
  ...items,
};
