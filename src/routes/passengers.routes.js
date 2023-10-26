import { Router } from "express";

const passengersRouter = Router();

passengersRouter.post("/passengers");
passengersRouter.get("/passengers/travels");

export default passengersRouter;
