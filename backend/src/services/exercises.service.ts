import { IExercise } from "../models/exercise";

export interface IExercisesService {
     getAll(): Promise<IExercise[]>;
     getById(id: number): Promise<IExercise | undefined>;
     createExercise(exercise: IExercise): Promise<number | undefined>;
     deleteExercise(id: number): Promise<number | undefined>;
     updateExercise(
          id: number,
          newExercise: IExercise
     ): Promise<IExercise | undefined>;
}
