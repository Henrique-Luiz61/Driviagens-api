import citiesRepository from "../repository/cities.repository.js";
import { conflictError } from "../errors/conflict.error.js";

async function createCity(name) {
  const existingCity = await citiesRepository.findCityDB(name);

  if (existingCity.rowCount > 0) throw conflictError("City");

  const result = await citiesRepository.createCityDB(name);

  return result;
}

const citiesService = {
  createCity,
};

export default citiesService;
