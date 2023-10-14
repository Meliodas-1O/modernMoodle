import dotenv from "dotenv";

// Read .env file
const _result = dotenv.config();
//console.log(_result);

// Express configuration
const EXPRESS_PORT = parseInt(process.env.EXPRESS_APP_PORT || "4500");

// Postgres configuration
const PG_HOST = process.env.PG_HOST || "localhost";
const PG_PORT = parseInt(process.env.PG_PORT || "5432");
const PG_USER = process.env.PG_USER || "root";
const PG_PASSWORD = process.env.PG_PASSWORD || "password";
const PG_DB = process.env.PG_DB || "modernmoodledb";

// Create config object
export const config = {
     PG_CONFIG: {
          host: PG_HOST,
          port: PG_PORT,
          user: PG_USER,
          password: PG_PASSWORD,
          database: PG_DB,
     },
     EXPRESS_CONFIG: {
          port: EXPRESS_PORT,
     },
};
