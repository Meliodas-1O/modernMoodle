import { Knex } from "knex";
import db from "../../database/database";
import { IChapterDAO } from "../chapter_dao";
import { IChapter } from "../../models/chapter";

export class PostgresChapterDAO implements IChapterDAO {
    db: Knex;

    constructor() {
        this.db = db;
    }

    async getAll(): Promise<IChapter[]> {
        return await this.db ("chapters").select ("*");
    }

    async getById(id: number): Promise<IChapter | undefined> {
        const topic = await this.db ("chapters").select ("*").where ("chapter_id", id).first ();
        return topic;
    }

    async delete(id: number): Promise<void> {
        await this.db ("chapters").delete ().where ("chapter_id", id);
    }

    async create(topic: IChapter): Promise<number> {
        const topic_id = await this.db ("chapters")
            .insert (topic)
            .returning ("chapter_id");
        return topic_id[0];
    }

    async update(id: number, newTopic: IChapter): Promise<IChapter | undefined> {
        const topic = await this.db ("chapters")
            .update (newTopic)
            .where ("chapter_id", id)
            .returning ("*");
        return topic[0];
    }

}