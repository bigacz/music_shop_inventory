import { Router } from "express";
import producersController from "../controllers/producersController.js";

const producersRouter = Router();

producersRouter.get("/", producersController.getAllProducers);
producersRouter.get("/:id", producersController.getProducer);

// producersRouter.post("/", producersController.postProducers);

// producersRouter.get("/new", producersController.getProducersNew);

export default producersRouter;
