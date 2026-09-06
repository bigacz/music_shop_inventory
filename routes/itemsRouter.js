import { Router } from "express";
import itemsController from "../controllers/itemsController.js";

const itemsRouter = Router();

itemsRouter.get("/", itemsController.getItems);
itemsRouter.post("/", itemsController.postItems);

itemsRouter.get("/new", itemsController.getItemsNew);

export default itemsRouter;
