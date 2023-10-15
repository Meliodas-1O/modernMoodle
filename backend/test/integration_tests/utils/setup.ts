import { GenericContainer, StartedTestContainer } from "testcontainers";
import { config } from "../../../src/config/config";
import { down, up } from "../../../src/database/migrations/20231008185239_init";
import db_config from "../../../src/database/knexfile";
import knex from "knex";
import { closeServer } from "../../../src";

const db = knex(db_config.development);
let pg: StartedTestContainer | null = null;

async function startPostgresContainer() {
     const container = new GenericContainer("postgres:16")
          .withEnvironment({
               POSTGRES_PASSWORD: config.PG_CONFIG.password,
               POSTGRES_USER: config.PG_CONFIG.user,
               POSTGRES_DB: config.PG_CONFIG.database,
          })
          .withExposedPorts({
               container: config.PG_CONFIG.port,
               host: config.PG_CONFIG.port,
          });
     pg = await container.start();
}

async function stopPostgresContainer() {
     if (pg !== null) {
          await pg.stop();
     }
}

async function sleep(ms: number): Promise<void> {
     return new Promise((resolve) => {
          setTimeout(resolve, ms);
     });
}

async function createDatabaseSchema() {
     await up(db);
}

async function destroyDatabaseSchema() {
     await down(db);
}

export async function setup() {
     await startPostgresContainer();

     // Wait to be sure that Postgres is ready
     await sleep(3 * 1000);

     // Create the schema
     await createDatabaseSchema();
}

export async function teardown() {
     await destroyDatabaseSchema();
     closeServer();
     await stopPostgresContainer();
}
