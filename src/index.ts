import express, { Express } from 'express';
import { addRoutes as addTopicsRoutes } from './routes/topics';
import config from './config/config';
import { down, up } from './database/migrations/20231008130412_init';
import db from './database/database';
import { seed } from './database/seed/seed';


// DEV ONLY, recreate database
// TODO: handle db migrations better
async function setup_db() {
    await down(db);
    await up(db);
}

setup_db()
    .then(async () => {
        console.log("Database successfully initialized !");
        await seed(db);
        console.log("Seed done");
    })
    .catch(error => { console.error(`"Oops, something went wrong: ${error}`) })

// Basic configuration of express app
export const app: Express = express()
const port: number = config.EXPRESS_CONFIG.port

// Parse requests of Content-Type: application/json
app.use(express.json())

// Add routes
addTopicsRoutes()

// Run the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})