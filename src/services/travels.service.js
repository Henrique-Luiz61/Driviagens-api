import travelsRepository from "../repository/travels.repository.js";
import { notFoundError } from "../errors/notFound.error.js";
import { unprocessableError } from "../errors/unprocessable.error.js";
import dayjs from "dayjs";

async function createFlight(origin, destination, date) {
  if (origin === destination)
    throw {
      type: "conflict",
      message: "Origin and destination must be different!",
    };

  const existingCities = await travelsRepository.findCitiesByIdsDB(
    origin,
    destination
  );
  if (existingCities.rowCount !== 2) throw notFoundError("Cities");
  const formatDate = date.split("-").reverse().join("-");

  const diffDays = dayjs(formatDate).diff(dayjs().format("YYYY-MM-DD"), "day");
  if (diffDays <= 0)
    throw {
      type: "unprocessableEntity",
      message: "Date must be a future date!",
    };

  const result = travelsRepository.createFlightDB(origin, destination, date);

  return result;
}

const travelsService = {
  createFlight,
};

export default travelsService;
