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

async function findPassengerTravelsDB() {
  return db.query(`
  SELECT passengers."firstName" || ' ' || passengers."lastName" AS passenger,
        COALESCE(COUNT (travels."passengerId"),0) AS travels
  FROM passengers
    LEFT JOIN travels ON passengers.id = travels."passengerId"
    GROUP BY passenger
    ORDER BY travels DESC;`);
}

async function findPassengerTravelsNameDB(name) {
  const formatName = "%" + name + "%";

  return db.query(
    `SELECT passengers."firstName" || ' ' || passengers."lastName" AS passenger,
  COALESCE(COUNT (travels."passengerId"),0) AS travels
  FROM passengers
  LEFT JOIN travels ON passengers.id = travels."passengerId"
  WHERE passengers."firstName" ILIKE ($1)
  OR passengers."lastName" ILIKE ($1)
  GROUP BY passengers."firstName", passengers."lastName"
  ORDER BY travels DESC;`,
    [formatName]
  );
}

const passengersRepository = {
  createPassengerDB,
  findPassengerDB,
  findPassengerTravelsDB,
  findPassengerTravelsNameDB,
};

export default passengersRepository;
