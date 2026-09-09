import { Router } from "express";
import producersController from "../controllers/producersController.js";

const producersRouter = Router();

producersRouter.get("/", producersController.getAllProducers);

// producersRouter.post("/", producersController.postProducers);

producersRouter.get("/new", producersController.getProducerNew);
producersRouter.get("/:id", producersController.getProducer);

export default producersRouter;
