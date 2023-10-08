import express, { Express } from 'express';
import { addRoutes as addTopicsRoutes } from './routes/topics';
import config from './config/config';
import { down, up } from './database/migrations/20231008130412_init';
import db from './database/database';
import { seed } from './database/seed/seed';

// Create express app
export const app: Express = express()

// DEV ONLY, recreate database
// TODO: handle db migrations better
async function setupDB() {
    await down(db);
    await up(db);
}

function setupAndRunApp() {
    // Basic configuration of express app
    const port: number = config.EXPRESS_CONFIG.port

    // Middleware(s)
    // Parse requests of Content-Type: application/json
    app.use(express.json())

    // Add routes
    addTopicsRoutes()

    // Run the server
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}

setupDB()
    .then(async () => {
        console.log("Database successfully initialized !");

        // Seed the database with some data
        await seed(db);
        console.log("Seed done");

        // Start the app (express)
        setupAndRunApp();

    })
    .catch(error => { console.error(`Oops, something went wrong: ${error}`) })