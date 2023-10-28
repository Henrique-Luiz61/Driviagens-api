import httpStatus from "http-status";
import travelsService from "../services/travels.service.js";

async function postFlight(req, res) {
  const { origin, destination, date } = req.body;

  const flight = await travelsService.createFlight(origin, destination, date);

  res.status(httpStatus.CREATED).send(flight.rows[0]);
}

async function postTravel(req, res) {
  const { passengerId, flightId } = req.body;

  const travel = await travelsService.createTravel(passengerId, flightId);

  res.status(httpStatus.CREATED).send(travel.rows[0]);
}

async function getFlights(req, res) {
  const { origin, destination } = req.query;

  const flights = await travelsService.getFlights(origin, destination);

  res.send(flights.rows);
}

const travelsController = {
  postFlight,
  postTravel,
  getFlights,
};

export default travelsController;
