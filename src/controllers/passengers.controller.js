import httpStatus from "http-status";
import passengersService from "../services/passengers.service.js";

async function postPassenger(req, res) {
  const { firstName, lastName } = req.body;

  const passenger = await passengersService.createPassenger(
    firstName,
    lastName
  );

  res.status(httpStatus.CREATED).send(passenger.rows[0]);
}

async function getPassengerTravels(req, res) {
  const { name } = req.query;

  const travels = await passengersService.getPassengerTravels(name);
  res.send(travels.rows);
}

const passengersController = {
  postPassenger,
  getPassengerTravels,
};

export default passengersController;
