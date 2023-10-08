import express, { Express } from 'express'
import { addRoutes as addTopicsRoutes } from './routes/topics';
import { addRoutes as addChaptersRoutes } from './routes/chapters';
import { EXPRESS_PORT } from './config/config';

// Configure express app
export const app: Express = express()
const port: number = EXPRESS_PORT

// Add routes
addTopicsRoutes()
addChaptersRoutes()

// Run the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})