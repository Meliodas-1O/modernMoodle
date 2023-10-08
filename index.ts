import express, {Express, Request, Response} from 'express'

const app: Express = express()

const port: number= 4500;

app.get('/', (req: Request, res: Response) => {
    res.send("Okay lezgo !")
})

app.listen(port, () => {
    console.log('Listenning on port ', port)
})