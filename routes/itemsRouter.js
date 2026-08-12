import { Router } from "express";
import itemsController from "../controllers/itemsController.js";

const itemsRouter = Router();

itemsRouter.get("/", itemsController.getItems);

export default itemsRouter;
