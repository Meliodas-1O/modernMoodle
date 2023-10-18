import { IExercise } from "../models/exercise";

export interface IExerciseDAO {
     getAll(): Promise<IExercise[]>;
     getById(id: number): Promise<IExercise | undefined>;
     delete(id: number): Promise<number | undefined>;
     create(topic: IExercise): Promise<number | undefined>;
     update(id: number, newExercise: IExercise): Promise<IExercise | undefined>;
}
