import { Request, Response } from "express";
import { PostgresExerciseDAO } from "../dao/postgres_impl/postgres_exercises_dao";
import { ExerciseService } from "../services/exercise_servce";
import {
     ExerciseErrorMessages,
     areKeysNotValid,
     errorMessage,
} from "../utils/helpers";

export class ExercisesController {
     service: ExerciseService;
     validKeys: string[] = [
          "chapter_id",
          "statement",
          "solution",
          "difficulty_level",
     ];

     constructor() {
          this.service = new ExerciseService(new PostgresExerciseDAO());
     }

     // GET /exercises
     async getAllExercises(_req: Request, res: Response) {
          const exercises = await this.service.getAll();
          if (!exercises) {
               return res
                    .status(404)
                    .send(
                         errorMessage(
                              404,
                              ExerciseErrorMessages.RETRIEVAL_ERROR
                         )
                    );
          }
          if (!exercises.length) {
               return res
                    .status(200)
                    .send(
                         errorMessage(200, ExerciseErrorMessages.NO_EXERCICES)
                    );
          }
          return res.status(200).send(exercises);
     }

     // GET /exercises/:id
     async getExerciseById(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const exercise = await this.service.getById(id);
          if (!exercise) {
               return res
                    .status(404)
                    .send(
                         errorMessage(
                              404,
                              ExerciseErrorMessages.NO_EXERCISE_BY_ID
                         )
                    );
          }
          return res.status(200).send(exercise);
     }

     // POST /exercises, exercise to create is in the body
     async createExercise(req: Request, res: Response) {
          // TODO: check if exercise is not undefined | null

          const exercise = req.body;
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               return res
                    .status(400)
                    .send(
                         errorMessage(
                              400,
                              ExerciseErrorMessages.EMPTY_REQUEST_BODY
                         )
                    );
          }
          if (areKeysNotValid(req.body, this.validKeys)) {
               return res
                    .status(403)
                    .send(
                         errorMessage(
                              403,
                              ExerciseErrorMessages.INVALID_FIELD +
                                   `${this.validKeys}`
                         )
                    );
          }
          const exercise_id = await this.service.createExercise(exercise);
          if (!exercise_id) {
               return res
                    .send(400)
                    .send(
                         errorMessage(400, ExerciseErrorMessages.CREATE_ERROR)
                    );
          }
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
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               return res
                    .status(400)
                    .send(
                         errorMessage(
                              400,
                              ExerciseErrorMessages.EMPTY_REQUEST_BODY
                         )
                    );
          }

          if (areKeysNotValid(newExercise, this.validKeys)) {
               return res
                    .status(403)
                    .send(
                         errorMessage(
                              403,
                              ExerciseErrorMessages.INVALID_FIELD +
                                   `${this.validKeys}`
                         )
                    );
          }
          const returnedExercise = await this.service.updateExercise(
               id,
               newExercise
          );
          if (!returnedExercise) {
               return res
                    .status(404)
                    .send(
                         errorMessage(404, ExerciseErrorMessages.UPDATE_ERROR)
                    );
          }
          return res.status(200).send(returnedExercise);
     }
}
