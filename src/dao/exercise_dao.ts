import { IExercise } from "../models/exercise";

export interface IExerciseDAO {
     getAll(): Promise<IExercise[]>;
     getById(id: number): Promise<IExercise | undefined>;
     delete(id: number): Promise<void>;
     create(topic: IExercise): Promise<number>;
     update(id: number, newExercise: IExercise): Promise<IExercise | undefined>;
}
