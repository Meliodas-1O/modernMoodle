import { Request, Response } from "express";

export class HealthcheckController {
     // GET /healthcheck
     getHealth = async (_req: Request, res: Response) => {
          res.status(200).send({ message: "All good mate" });
     };
}
