import joiBase from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

export const flightSchema = joi.object({
  origin: joi.number().min(1).required(),
  destination: joi.number().min(1).required(),
  date: joi.date().format(["DD-MM-YYYY"]).raw().required(),
});

export const travelSchema = joi.object({
  passengerId: joi.number().min(1).required(),
  flightId: joi.number().min(1).required(),
});
