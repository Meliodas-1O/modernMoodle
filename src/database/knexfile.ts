import { PG_DB, PG_USER, PG_PASSWORD } from "../config/config";

// Update with your config settings.
const config = {
  development: {
    client: "postgresql",
    connection: {
      database: PG_DB,
      user: PG_USER,
      password: PG_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

};

module.exports = config;
