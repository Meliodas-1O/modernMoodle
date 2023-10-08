import dotenv from 'dotenv'
import express, { Express } from 'express'
import { addRoutes as addTopicsRoutes } from './routes/topics';
import { addRoutes as addChaptersRoutes } from './routes/chapters';

// Read .env file
dotenv.config()

// Configure express app
export const app: Express = express()
const port: number = parseInt(process.env.EXPRESS_APP_PORT || '4500')

// Add routes
addTopicsRoutes()
addChaptersRoutes()

// Run the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})