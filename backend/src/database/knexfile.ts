import { config as app_config } from "../config/config";

// Create knex config
const config = {
     development: {
          client: "pg",
          connection: {
               database: app_config.PG_CONFIG.database,
               user: app_config.PG_CONFIG.user,
               password: app_config.PG_CONFIG.password,
               port: app_config.PG_CONFIG.port,
               host: app_config.PG_CONFIG.host,
          },
          pool: {
               min: 2,
               max: 10,
          },
          migrations: {
               tableName: "knex_migrations",
          },
     },
};

export default config;
