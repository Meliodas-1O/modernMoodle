import { app } from '../index';
import { Request, Response } from 'express';

export function addRoutes() {

    app.get("/topics", (_req: Request, res: Response) => {
        res.status(200).send("topics");
    })
}