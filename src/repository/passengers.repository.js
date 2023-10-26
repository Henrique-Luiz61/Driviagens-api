import { db } from "../database/db.connection.js";

async function createPassengerDB(firstName, lastName) {
  return db.query(
    `INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2) RETURNING *;`,
    [firstName, lastName]
  );
}

async function findPassengerDB(firstName, lastName) {
  return db.query(
    `SELECT * FROM passengers WHERE "firstName" = $1 AND "lastName" = $2;`,
    [firstName, lastName]
  );
}

const passengersRepository = {
  createPassengerDB,
  findPassengerDB,
};

export default passengersRepository;
