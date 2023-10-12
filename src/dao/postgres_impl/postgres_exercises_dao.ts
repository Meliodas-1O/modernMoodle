import { Knex } from "knex";
import db from "../../database/database";
import { IExercise } from "../../models/exercise";
import { IExerciseDAO } from "../exercise_dao";

export class PostgresExerciseDAO implements IExerciseDAO {
    db: Knex;

    constructor() {
        this.db = db;
    }

    async getAll(): Promise<IExercise[]> {
        return await this.db ("exercises").select ("*") as IExercise[];
    }

    async getById(id: number): Promise<IExercise | undefined> {
        const exercise = await this.db ("exercises").select ("*").where ("exercise_id", id).first () as IExercise;
        return exercise;
    }

    async delete(id: number): Promise<void> {
        await this.db ("exercises").delete ().where ("exercise_id", id);
    }

    async create(exercise: IExercise): Promise<number> {
        const exercise_id : number[]= await this.db ("exercises")
            .insert (exercise)
            .returning ("exercise_id");
        return exercise_id[0];
    }

    async update(id: number, newExercise: IExercise): Promise<IExercise | undefined> {
        const exercise = await this.db ("exercises")
            .update (newExercise)
            .where ("exercise_id", id)
            .returning ("*") as IExercise[];
        return exercise[0];
    }

}