import { ExercisesController } from '../controllers/exercise_controller';
import { app } from '../index';
import { Request, Response } from 'express';

// GET      /exercises -> all exercises
// GET      /exercises/:id -> exercise with id
// POST     /exercises -> create exercise
// PATCH    /exercises/:id -> update exercise with id
// DELETE   /exercises/:id -> delete exercise with id

const controller = new ExercisesController ();

export function addRoutes() {

    app.get ("/exercises", async (req: Request, res: Response) => {
        await controller.getAllExercises (req, res);
    })

    app.get ("/exercises/:id", async (req: Request, res: Response) => {
        await controller.getExerciseById (req, res);
    })

    app.post ("/exercises", async (req: Request, res: Response) => {
        await controller.createExercise (req, res);
    })

    app.delete ("/exercises/:id", async (req: Request, res: Response) => {
        await controller.deleteExercise (req, res);
    })

    app.patch ("/exercises/:id", async (req: Request, res: Response) => {
        await controller.updateExercise (req, res);
    })

}