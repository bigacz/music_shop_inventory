import { Router } from "express";
import itemsController from "../controllers/itemsController.js";

const itemsRouter = Router();

itemsRouter.get("/", itemsController.getItems);
itemsRouter.post("/", itemsController.postItems);

itemsRouter.get("/new", itemsController.getItemsNew);
itemsRouter.delete("/:itemId", itemsController.deleteItem);
itemsRouter.get("/:itemId", itemsController.getItem);

export default itemsRouter;
