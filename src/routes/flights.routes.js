import { Router } from "express";

const flightsRouter = Router();

flightsRouter.post("/flights");
flightsRouter.get("/flights");

export default flightsRouter;
