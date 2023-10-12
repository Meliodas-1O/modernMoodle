import { Request, Response } from "express";
import { PostgresExerciseDAO } from "../dao/postgres_impl/postgres_exercises_dao";
import { ExerciseService } from "../services/exercise_servce";
import { areKeysNotValid, errorMessage } from "../utils/helpers";

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
                              "Error while retrieving exercices. Please try again"
                         )
                    );
          }
          if (!exercises.length) {
               return res
                    .status(200)
                    .send(errorMessage(200, "There is no exercice yet !"));
          }
          return res.status(200).send(exercises);
     }

     // GET /exercises/:id
     async getExerciseById(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const erMsg =
               "There is no exercise with the given id. Please check your input values or try again later.";
          const exercise = await this.service.getById(id);
          if (!exercise) {
               return res.status(404).send(errorMessage(404, erMsg));
          }
          return res.status(200).send(exercise);
     }

     // POST /exercises, exercise to create is in the body
     async createExercise(req: Request, res: Response) {
          // TODO: check if exercise is not undefined | null
          const erMsg: string[] = [
               "The request body is empty. Please put input values.",
               "Error while creating the exercise. Please check your input values or try agin later",
               "One of the field is not appropriate. The valid keys are :" +
                    `${this.validKeys} .`,
          ];
          const exercise = req.body;
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               return res.status(400).send(errorMessage(400, erMsg[0]));
          }
          if (areKeysNotValid(req.body, this.validKeys)) {
               return res.status(403).send(errorMessage(403, erMsg[2]));
          }
          const exercise_id = await this.service.createExercise(exercise);
          if (!exercise_id) {
               return res.send(400).send(errorMessage(400, erMsg[1]));
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

          const erMsg: string[] = [
               "The request body is empty. Please put input values.",
               "Error while updating the exercice. Please check your input values or try again later.",
               "One of the field is not appropriate. The valid keys are :" +
                    `${this.validKeys}.`,
          ];
          const id = parseInt(req.params.id);
          const newExercise = req.body;
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               return res.status(400).send(errorMessage(400, erMsg[0]));
          }

          if (areKeysNotValid(newExercise, this.validKeys)) {
               return res.status(403).send(errorMessage(403, erMsg[2]));
          }
          const returnedExercise = await this.service.updateExercise(
               id,
               newExercise
          );
          if (!returnedExercise) {
               return res.status(404).send();
          }
          return res.status(200).send(returnedExercise);
     }
}
