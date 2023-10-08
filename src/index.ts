import express, { Express } from 'express';
import { addRoutes as addTopicsRoutes } from './routes/topics';
import { addRoutes as addChaptersRoutes } from './routes/chapters';
import config from './config/config';

// Configure express app
export const app: Express = express()
const port: number = config.EXPRESS_CONFIG.port

// Add routes
addTopicsRoutes()
addChaptersRoutes()

// Run the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})