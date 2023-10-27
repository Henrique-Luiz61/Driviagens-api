import { db } from "../database/db.connection.js";

async function findCitiesByIdsDB(origin, destination) {
  return db.query(`SELECT * FROM cities WHERE id = $1 OR id = $2;`, [
    origin,
    destination,
  ]);
}

async function createFlightDB(origin, destination, date) {
  return db.query(
    `INSERT INTO flights (origin, destination, date) 
      VALUES ($1, $2, $3) RETURNING id, origin, destination, 
        TO_CHAR(date, 'DD-MM-YYYY') AS date;`,
    [origin, destination, date]
  );
}

async function findPassengerFlightIdsDB(passengerId, flightId) {
  return db.query(
    `SELECT passengers.id AS "passengerId", flights.id AS "flightId" 
        FROM passengers
     JOIN flights ON passengers.id = $1 AND flights.id = $2;`,
    [passengerId, flightId]
  );
}

async function createTravelDB(passengerId, flightId) {
  return db.query(
    `INSERT INTO travels ("passengerId", "flightId")
      VALUES ($1, $2) RETURNING *;`,
    [passengerId, flightId]
  );
}

const travelsRepository = {
  findCitiesByIdsDB,
  createFlightDB,
  findPassengerFlightIdsDB,
  createTravelDB,
};

export default travelsRepository;
