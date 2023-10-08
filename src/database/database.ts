import knex from "knex"
import config from "../config/config"

// Create database access
const db = knex({
    client: "pg",
    connection: {
        host: config.PG_CONFIG.host,
        port: config.PG_CONFIG.port,
        user: config.PG_CONFIG.user,
        password: config.PG_CONFIG.password,
        database: config.PG_CONFIG.database,
    }
})

export default db;