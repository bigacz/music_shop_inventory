import { Router } from "express";
import itemsController from "../controllers/itemsController.js";

const itemsRouter = Router();

itemsRouter.get("/", itemsController.getItems);
itemsRouter.post("/", itemsController.postItems);

itemsRouter.get("/new", itemsController.getItemsNew);

itemsRouter.use("/:param", itemsController.redirectNonIntegers);

itemsRouter.get("/:itemId", itemsController.getItem);
itemsRouter.patch("/:itemId", itemsController.patchItem);
itemsRouter.delete("/:itemId", itemsController.deleteItem);

itemsRouter.get("/:itemId/edit", itemsController.getItemEdit);

export default itemsRouter;
