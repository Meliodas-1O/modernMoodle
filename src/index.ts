import express, { Express } from 'express';
import { addRoutes as addTopicsRoutes } from './routes/topics';
import { config } from './config/config';

// Basic express app configuration
export const app: Express = express()
const port: number = config.EXPRESS_CONFIG.port;

// Add middleware(s)
app.use(express.json())

// Add all routes
addTopicsRoutes()

// Run the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

