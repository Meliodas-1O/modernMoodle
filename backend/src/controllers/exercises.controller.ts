import { Request, Response } from "express";
import { IExercise } from "../models/exercise";
import { IChaptersService } from "../services/chapters.service";
import { IExercisesService } from "../services/exercises.service";
import { ExerciseErrorMessages, errorMessage } from "../utils/helpers";

export class ExercisesController {
     exercisesService: IExercisesService;
     chaptersService: IChaptersService;

     constructor(
          exercisesService: IExercisesService,
          chaptersService: IChaptersService
     ) {
          this.exercisesService = exercisesService;
          this.chaptersService = chaptersService;
     }

     // GET /exercises
     getAllExercises = async (req: Request, res: Response) => {
          const chapterId = isNaN(Number(req.query.chapterId))
               ? undefined
               : Number(req.query.chapterId);
          const exercises = await this.exercisesService.getAll(chapterId);
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
          const id = parseInt(req.params.id);
          const exercise = await this.exercisesService.getById(id);
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
          // TODO: check exercise + chapter creation in a transaction
          const exercise: IExercise = req.body;

          const chapter = await this.chaptersService.getById(
               exercise.chapter_id
          );
          if (!chapter) {
               res.status(404).send(
                    errorMessage(
                         404,
                         ExerciseErrorMessages.CHAPTER_DOES_NOT_EXIST
                    )
               );
               return;
          }

          const exercise_id =
               await this.exercisesService.createExercise(exercise);
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
          const id = parseInt(req.params.id);
          await this.exercisesService.deleteExercise(id);
          res.status(200).send();
     };

     // PATH /exercises/:id, new exercise is in the body
     updateExercise = async (req: Request, res: Response) => {
          // TODO: check if the new `chapter_id` exists (if updated)
          const id = parseInt(req.params.id);
          const newExercise = req.body;

          const returnedExercise = await this.exercisesService.updateExercise(
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
