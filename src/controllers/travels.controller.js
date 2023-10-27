import httpStatus from "http-status";
import travelsService from "../services/travels.service.js";

async function postFlight(req, res) {
  const { origin, destination, date } = req.body;

  const flight = await travelsService.createFlight(origin, destination, date);

  res.status(httpStatus.CREATED).send(flight.rows[0]);
}

const travelsController = {
  postFlight,
};

export default travelsController;
