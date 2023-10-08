import { getAll } from '../controllers/chapters_controller';
import { app } from '../index';
import { Request, Response } from 'express';

export function addRoutes() {

    app.get("/chapters", (_req: Request, res: Response) => {
        console.log("(route)")
        res.status(200).send(getAll())
    })
}