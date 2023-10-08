import express, { Express } from 'express';
import { addRoutes as addTopicsRoutes } from './routes/topics';
import { addRoutes as addChaptersRoutes } from './routes/chapters';
import { EXPRESS_PORT } from './config/config';
import db from './database/database';
import { down, up } from './database/migrations/20231008185239_init';
import { seed } from './database/seed/seed';


// Configure express app
export const app: Express = express()
const port: number = EXPRESS_PORT;
async function setupDB() {
    await down(db);
    await up(db);
}
// Add routes
addTopicsRoutes()
addChaptersRoutes()

// Run the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

