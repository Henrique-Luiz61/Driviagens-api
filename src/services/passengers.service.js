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

const passengersService = {
  createPassenger,
};

export default passengersService;
