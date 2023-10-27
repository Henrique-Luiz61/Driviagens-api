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

const travelsRepository = {
  findCitiesByIdsDB,
  createFlightDB,
};

export default travelsRepository;
