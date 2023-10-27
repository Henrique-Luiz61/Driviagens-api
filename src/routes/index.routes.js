import { Router } from "express";
import citiesRouter from "./cities.routes.js";
import passengersRouter from "./passengers.routes.js";
import travelsRouter from "./travels.routes.js";

const indexRouter = Router();

indexRouter.use(citiesRouter, passengersRouter, travelsRouter);

export default indexRouter;
