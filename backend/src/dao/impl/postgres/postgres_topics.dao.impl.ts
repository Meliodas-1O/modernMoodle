import { Knex } from "knex";
import db from "../../../database/database";
import { ITopic } from "../../../models/topic";
import { ITopicDAO } from "../../topic.dao.interface";

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
               .where("id", id)
               .first()) as ITopic;
          return topic;
     }

     async delete(id: number): Promise<number | undefined> {
          try {
               const topicId: number = await this.db("topics")
                    .delete()
                    .where("id", id)
                    .returning("id");
               return topicId;
          } catch (error) {
               console.error(error);
               return undefined;
          }
     }

     async create(topic: ITopic): Promise<number | undefined> {
          try {
               const id: number[] = await this.db("topics")
                    .insert(topic)
                    .returning("id");
               return id[0];
          } catch (error) {
               console.error(error);
               return undefined;
          }
     }

     async update(id: number, newTopic: ITopic): Promise<ITopic | undefined> {
          try {
               const topic = (await this.db("topics")
                    .update(newTopic)
                    .where("id", id)
                    .returning("*")) as ITopic[];
               return topic[0];
          } catch (error) {
               console.error(error);
               return undefined;
          }
     }
}
