import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port: number = 4500

app.get('/', (_req: Request, res: Response) => {
    res.send("Hello, world")
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})