import { IExerciseDAO } from "../../dao/exercise.dao.interface";
import { IExercise } from "../../models/exercise";
import { IExercisesService } from "../exercises.service";

export class ExercisesService implements IExercisesService {
     dao: IExerciseDAO;

     constructor(dao: IExerciseDAO) {
          this.dao = dao;
     }

     async getAll(): Promise<IExercise[]> {
          return await this.dao.getAll();
     }

     async getById(id: number): Promise<IExercise | undefined> {
          const exercise = await this.dao.getById(id);
          return exercise;
     }

     async createExercise(exercise: IExercise): Promise<number | undefined> {
          return await this.dao.create(exercise);
     }

     async deleteExercise(id: number) {
          return await this.dao.delete(id);
     }

     async updateExercise(
          id: number,
          newExercise: IExercise
     ): Promise<IExercise | undefined> {
          const exercise = await this.dao.update(id, newExercise);
          return exercise;
     }
}
