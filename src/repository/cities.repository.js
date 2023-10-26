import { db } from "../database/db.connection.js";

async function createCityDB(name) {
  return db.query(`INSERT INTO cities (name) VALUES ($1) RETURNING *;`, [name]);
}

async function findCityDB(name) {
  return db.query(`SELECT * FROM cities WHERE name = $1;`, [name]);
}

const citiesRepository = {
  createCityDB,
  findCityDB,
};

export default citiesRepository;
