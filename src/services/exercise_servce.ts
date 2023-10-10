import { IExerciseDAO } from "../dao/exercise_dao";
import { IExercise } from "../models/exercise";

export class ExerciseService {
    dao: IExerciseDAO;

    constructor(dao: IExerciseDAO) {
        this.dao = dao;
    }

    async getAll(): Promise<IExercise[]> {
        return await this.dao.getAll();
    }

    async getById(id: number): Promise<IExercise | undefined> {
        const chapter = await this.dao.getById(id);
        return chapter;
    }

    async createExercise(chapter: IExercise) : Promise<number> {
        return await this.dao.create(chapter);
    }

    async deleteExercise(id: number) {
        await this.dao.delete(id);
    }

    async updateExercise(id: number, newExercise: IExercise): Promise<IExercise | undefined> {
        const chapter = await this.dao.update(id, newExercise);
        return chapter;
    }
}