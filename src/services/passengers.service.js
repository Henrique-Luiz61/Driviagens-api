import passengersRepository from "../repository/passengers.repository.js";
import { conflictError } from "../errors/conflict.error.js";

async function createPassenger(firstName, lastName) {
  const existingPassenger = await passengersRepository.findPassengerDB(
    firstName,
    lastName
  );

  if (existingPassenger.rowCount > 0) throw conflictError("Passenger");

  const result = await passengersRepository.createPassengerDB(
    firstName,
    lastName
  );

  return result;
}

async function getPassengerTravels(name) {
  let result = {};

  if (name) {
    result = await passengersRepository.findPassengerTravelsNameDB(name);
  } else {
    result = await passengersRepository.findPassengerTravelsDB(name);
  }

  return result;
}

const passengersService = {
  createPassenger,
  getPassengerTravels,
};

export default passengersService;
