import { Request, Response } from "express";
import { IExercisesService } from "../services/exercises.service";
import { ExerciseErrorMessages, errorMessage } from "../utils/helpers";

export class ExercisesController {
     service: IExercisesService;

     constructor(service: IExercisesService) {
          this.service = service;
     }

     // GET /exercises
     getAllExercises = async (_req: Request, res: Response) => {
          const exercises = await this.service.getAll();
          if (!exercises) {
               res.status(404).send(
                    errorMessage(404, ExerciseErrorMessages.RETRIEVAL_ERROR)
               );
               return;
          }
          res.status(200).send(exercises);
     };

     // GET /exercises/:id
     getExerciseById = async (req: Request, res: Response) => {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const exercise = await this.service.getById(id);
          if (!exercise) {
               res.status(404).send(
                    errorMessage(404, ExerciseErrorMessages.NO_EXERCISE_BY_ID)
               );
               return;
          }
          res.status(200).send(exercise);
     };

     // POST /exercises, exercise to create is in the body
     createExercise = async (req: Request, res: Response) => {
          // TODO: check if exercise is not undefined | null

          const exercise = req.body;

          const exercise_id = await this.service.createExercise(exercise);
          if (!exercise_id) {
               res.status(400).send(
                    errorMessage(400, ExerciseErrorMessages.CREATE_ERROR)
               );
               return;
          }
          res.status(200).send(exercise_id);
     };

     // DELETE /exercises/:id
     deleteExercise = async (req: Request, res: Response) => {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          await this.service.deleteExercise(id);
          res.status(200).send();
     };

     // PATH /exercises/:id, new exercise is in the body
     updateExercise = async (req: Request, res: Response) => {
          // TODO: check if id is not undefined | null

          const id = parseInt(req.params.id);
          const newExercise = req.body;

          const returnedExercise = await this.service.updateExercise(
               id,
               newExercise
          );
          if (!returnedExercise) {
               res.status(404).send(
                    errorMessage(404, ExerciseErrorMessages.UPDATE_ERROR)
               );
               return;
          }
          res.status(200).send(returnedExercise);
     };
}
