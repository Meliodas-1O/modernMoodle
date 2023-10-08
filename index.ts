import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'

// Read .env file
dotenv.config()

// Configure express app
const app: Express = express()
const port: number = parseInt(process.env.EXPRESS_APP_PORT || '4500')

app.get('/', (_req: Request, res: Response) => {
    res.send("Hello, world")
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})