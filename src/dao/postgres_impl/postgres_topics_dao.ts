import { Knex } from "knex";
import db from "../../database/database";
import { ITopic } from "../../models/topic";
import { ITopicDAO } from "../topic_dao";

export class PostgresTopicsDAO implements ITopicDAO {
     db: Knex;

     constructor() {
          this.db = db;
     }

     async getAll(): Promise<ITopic[]> {
          return (await this.db("topics").select("*")) as ITopic[];
     }

     async getById(id: number): Promise<ITopic | undefined> {
          const topic = (await this.db("topics")
               .select("*")
               .where("topic_id", id)
               .first()) as ITopic;
          return topic;
     }

     async delete(id: number): Promise<void> {
          await this.db("topics").delete().where("topic_id", id);
     }

     async create(topic: ITopic): Promise<number> {
          const topic_id: number[] = await this.db("topics")
               .insert(topic)
               .returning("topic_id");
          return topic_id[0];
     }

     async update(id: number, newTopic: ITopic): Promise<ITopic | undefined> {
          const topic = (await this.db("topics")
               .update(newTopic)
               .where("topic_id", id)
               .returning("*")) as ITopic[];
          return topic[0];
     }
}
