import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/new", categoriesController.getCategoryNew);
categoriesRouter.get("/:categoryId", categoriesController.getCategory);

categoriesRouter.delete("/:categoryId", categoriesController.deleteCategory);

categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.post("/", categoriesController.postCategories);

categoriesRouter.get("/:categoryId/edit", categoriesController.getCategoryEdit);

categoriesRouter.patch("/:categoryId", categoriesController.patchCategory);

export default categoriesRouter;
