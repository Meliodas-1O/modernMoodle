import { Request, Response } from "express";
import { PostgresExerciseDAO } from "../dao/impl/postgres/postgres_exercises_dao";
import { ExerciseService } from "../services/exercise_servce";

export class ExercisesController {
     service: ExerciseService;

     constructor() {
          this.service = new ExerciseService(new PostgresExerciseDAO());
     }

     // GET /exercises
     async getAllExercises(_req: Request, res: Response) {
          const exercises = await this.service.getAll();
          if (!exercises || exercises.length === 0) {
               res.status(404).send();
          } else {
               res.status(200).send(exercises);
          }
     }

     // GET /exercises/:id
     async getExerciseById(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const exercise = await this.service.getById(id);
          if (exercise === undefined) {
               res.status(404).send();
          } else {
               res.status(200).send(exercise);
          }
     }

     // POST /exercises, exercise to create is in the body
     async createExercise(req: Request, res: Response) {
          // TODO: check if exercise is not undefined | null
          const exercise = req.body;
          const exercise_id = await this.service.createExercise(exercise);
          res.status(200).send(exercise_id);
     }

     // DELETE /exercises/:id
     async deleteExercise(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          await this.service.deleteExercise(id);
          res.status(200).send();
     }

     // PATH /exercises/:id, new exercise is in the body
     async updateExercise(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const newExercise = req.body;
          const returnedExercise = await this.service.updateExercise(
               id,
               newExercise
          );
          if (returnedExercise === undefined) {
               res.status(404).send();
          } else {
               res.status(200).send(returnedExercise);
          }
     }
}
