import { Router } from "express";
import producersController from "../controllers/producersController.js";

const producersRouter = Router();

producersRouter.get("/", producersController.getAllProducers);
producersRouter.post("/", producersController.postProducer);

producersRouter.get("/new", producersController.getProducerNew);

producersRouter.use("/:param", producersController.redirectNonIntegers);

producersRouter.get("/:producerId", producersController.getProducer);
producersRouter.delete("/:producerId", producersController.deleteProducer);
producersRouter.patch("/:producerId", producersController.patchProducer);

producersRouter.get("/:producerId/edit", producersController.getProducerEdit);

export default producersRouter;
