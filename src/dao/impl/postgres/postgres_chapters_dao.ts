import { Knex } from "knex";
import db from "../../../database/database";
import { IChapterDAO } from "../../chapter_dao";
import { IChapter } from "../../../models/chapter";

export class PostgresChapterDAO implements IChapterDAO {
    db: Knex;

    constructor() {
        this.db = db;
    }

    async getAll(): Promise<IChapter[]> {
        return await this.db("chapters").select("*");
    }

    async getById(id: number): Promise<IChapter | undefined> {
        const chapter = await this.db("chapters").select("*").where("chapter_id", id).first();
        return chapter;
    }

    async delete(id: number): Promise<void> {
        await this.db("chapters").delete().where("chapter_id", id);
    }

    async create(chapter: IChapter): Promise<number> {
        const chapter_id = await this.db("chapters")
            .insert(chapter)
            .returning("chapter_id");
        return chapter_id[0];
    }

    async update(id: number, newChapter: IChapter): Promise<IChapter | undefined> {
        const chapter = await this.db("chapters")
            .update(newChapter)
            .where("chapter_id", id)
            .returning("*");
        return chapter[0];
    }

}