import { Knex } from "knex";
import db from "../database/database";
import { ITopic } from "../models/topic";
import { TopicsDAO } from "./core_dao";

export class PostgresCoreDAO implements TopicsDAO {
    db: Knex;

    constructor() {
        this.db = db;
    }

    async getAll(): Promise<ITopic[]> {
        return await this.db("topics").select("*");
    }

    async getById(id: number): Promise<ITopic | undefined> {
        const topic = await this.db("topics").select("*").where("topic_id", id).first();
        return topic;
    }

    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async create(topic: ITopic): Promise<number> {
        const topic_id = await this.db("topics")
            .insert(topic)
            .returning("topic_id");
        return topic_id[0];
    }

}