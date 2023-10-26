import httpStatus from "http-status";
import citiesService from "../services/cities.service.js";

async function postCity(req, res) {
  const { name } = req.body;

  const city = await citiesService.createCity(name);

  res.status(httpStatus.CREATED).send(city.rows[0]);
}

const citiesController = {
  postCity,
};

export default citiesController;
