import { Request, Response } from "express";
import { createExercisesController } from "../di/dependency_injection";
import { app } from "../index";

// GET      /exercises -> all exercises
// GET      /exercises/:id -> exercise with id
// POST     /exercises -> create exercise
// PATCH    /exercises/:id -> update exercise with id
// DELETE   /exercises/:id -> delete exercise with id

const controller = createExercisesController();

export function addRoutes() {
     app.get("/exercises", async (req: Request, res: Response) => {
          return await controller.getAllExercises(req, res);
     });

     app.get("/exercises/:id", async (req: Request, res: Response) => {
          return await controller.getExerciseById(req, res);
     });

     app.post("/exercises", async (req: Request, res: Response) => {
          return await controller.createExercise(req, res);
     });

     app.delete("/exercises/:id", async (req: Request, res: Response) => {
          await controller.deleteExercise(req, res);
     });

     app.patch("/exercises/:id", async (req: Request, res: Response) => {
          return await controller.updateExercise(req, res);
     });
}
