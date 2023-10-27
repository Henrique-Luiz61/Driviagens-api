import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { flightSchema } from "../schemas/travels.schema.js";
import travelsController from "../controllers/travels.controller.js";

const travelsRouter = Router();

travelsRouter.post(
  "/flights",
  validateSchema(flightSchema),
  travelsController.postFlight
);
travelsRouter.get("/flights");
travelsRouter.post("/travels");

export default travelsRouter;
