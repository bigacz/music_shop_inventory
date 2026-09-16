import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.delete("/:categoryId", categoriesController.deleteCategory);
categoriesRouter.get("/:id", categoriesController.getCategory);
categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get("/new", categoriesController.getCategoryNew);

categoriesRouter.post("/", categoriesController.postCategories);

export default categoriesRouter;
