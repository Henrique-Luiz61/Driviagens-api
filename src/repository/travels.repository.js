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

async function findFlightsDB() {
  return db.query(
    `SELECT flights.id, c1.name AS origin, c2.name AS destination, 
            TO_CHAR(flights.date, 'YYYY-MM-DD') AS date
      FROM flights
      JOIN cities c1 ON flights.origin = c1.id
      JOIN cities c2 ON flights.destination = c2.id 
      ORDER BY flights.date;`
  );
}

async function findFlightsOriginDB(origin) {
  return db.query(
    `SELECT flights.id, c1.name AS origin, c2.name AS destination,
            TO_CHAR(flights.date, 'YYYY-MM-DD') AS date
      FROM flights
        JOIN cities c1 ON flights.origin = c1.id
        JOIN cities c2 ON flights.destination = c2.id
        WHERE c1.name = ($1)
        ORDER BY flights.date;`,
    [origin]
  );
}

async function findFlightsDestinationDB(destination) {
  return db.query(
    `SELECT flights.id, c1.name AS origin, c2.name AS destination,
            TO_CHAR(flights.date, 'YYYY-MM-DD') AS date
      FROM flights
        JOIN cities c1 ON flights.origin = c1.id
        JOIN cities c2 ON flights.destination = c2.id
        WHERE c2.name = ($1)
        ORDER BY flights.date;`,
    [destination]
  );
}

async function findOriginDestinationDB(origin, destination) {
  return db.query(
    `SELECT flights.id, c1.name AS origin, c2.name AS destination,
            TO_CHAR(flights.date, 'YYYY-MM-DD') AS date
      FROM flights
        JOIN cities c1 ON flights.origin = c1.id
        JOIN cities c2 ON flights.destination = c2.id
        WHERE c1.name = ($1) AND c2.name = ($2)
        ORDER BY flights.date;`,
    [origin, destination]
  );
}

const travelsRepository = {
  findCitiesByIdsDB,
  findPassengerFlightIdsDB,
  createTravelDB,
  createFlightDB,
  findFlightsDB,
  findFlightsOriginDB,
  findFlightsDestinationDB,
  findOriginDestinationDB,
};

export default travelsRepository;
