// Update with your config settings.
const PG_HOST = process.env.PG_HOST || "localhost"
const PG_PORT = parseInt(process.env.PG_PORT || "5432")
const PG_USER = process.env.PG_USER || "root"
const PG_PASSWORD = process.env.PG_PASSWORD || "password"
const PG_DB = process.env.PG_DB || "modernmoodledb"

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
