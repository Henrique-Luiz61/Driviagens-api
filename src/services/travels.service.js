import travelsRepository from "../repository/travels.repository.js";
import { notFoundError } from "../errors/notFound.error.js";
import { unprocessableError } from "../errors/unprocessable.error.js";
import { conflictError } from "../errors/conflict.error.js";
import dayjs from "dayjs";

async function createFlight(origin, destination, date) {
  if (origin === destination) throw conflictError("ids");

  const existingCities = await travelsRepository.findCitiesByIdsDB(
    origin,
    destination
  );
  if (existingCities.rowCount !== 2) throw notFoundError("Cities");

  const formatDate = date.split("-").reverse().join("-");

  const diffDays = dayjs(formatDate).diff(dayjs().format("YYYY-MM-DD"), "day");
  if (diffDays <= 0) throw unprocessableError("date");

  const result = travelsRepository.createFlightDB(origin, destination, date);

  return result;
}

async function createTravel(passengerId, flightId) {
  const existingIds = await travelsRepository.findPassengerFlightIdsDB(
    passengerId,
    flightId
  );

  if (existingIds.rowCount === 0) throw notFoundError("Passenger or flight");

  const result = await travelsRepository.createTravelDB(passengerId, flightId);

  return result;
}

async function getFlights(origin, destination) {
  let result = {};

  if (origin) {
    result = await travelsRepository.findFlightsOriginDB(origin);
  } else if (destination) {
    result = await travelsRepository.findFlightsDestinationDB(destination);
  } else if (origin && destination) {
    result = await travelsRepository.findOriginDestinationDB(
      origin,
      destination
    );
  } else {
    result = await travelsRepository.findFlightsDB();
  }

  return result;
}

const travelsService = {
  createFlight,
  createTravel,
  getFlights,
};

export default travelsService;
