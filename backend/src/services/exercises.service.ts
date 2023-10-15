import { IExercise } from "../models/exercise";

export interface IExercisesService {
     getAll(): Promise<IExercise[]>;
     getById(id: number): Promise<IExercise | undefined>;
     createExercise(exercise: IExercise): Promise<number>;
     deleteExercise(id: number): Promise<void>;
     updateExercise(
          id: number,
          newExercise: IExercise
     ): Promise<IExercise | undefined>;
}
