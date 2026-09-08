import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get("/:id", categoriesController.getCategory);

// categoriesRouter.post("/", categoriesController.postCategories);

// categoriesRouter.get("/new", categoriesController.getCategoriesNew);

export default categoriesRouter;
