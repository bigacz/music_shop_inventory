import { Router } from "express";
import producersController from "../controllers/producersController.js";

const producersRouter = Router();

producersRouter.get("/", producersController.getAllProducers);

producersRouter.post("/", producersController.postProducer);

producersRouter.get("/new", producersController.getProducerNew);
producersRouter.delete("/:producerId", producersController.deleteProducer);
producersRouter.get("/:producerId", producersController.getProducer);
producersRouter.get("/:producerId/edit", producersController.getProducerEdit);
producersRouter.patch("/:producerId", producersController.patchProducer);

export default producersRouter;
