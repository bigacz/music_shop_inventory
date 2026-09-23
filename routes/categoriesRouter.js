import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.post("/", categoriesController.postCategories);

categoriesRouter.get("/new", categoriesController.getCategoryNew);

categoriesRouter.use("/:param", categoriesController.redirectNonIntegers);

categoriesRouter.get("/:categoryId", categoriesController.getCategory);
categoriesRouter.delete("/:categoryId", categoriesController.deleteCategory);
categoriesRouter.patch("/:categoryId", categoriesController.patchCategory);

categoriesRouter.get("/:categoryId/edit", categoriesController.getCategoryEdit);

export default categoriesRouter;
