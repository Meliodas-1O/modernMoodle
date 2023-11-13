import { Knex } from "knex";
import db from "../../../database/database";
import { IChapterDAO } from "../../chapter.dao.interface";
import { IChapter } from "../../../models/chapter";

export class PostgresChapterDAO implements IChapterDAO {
     db: Knex;

     constructor() {
          this.db = db;
     }

     async getAll(): Promise<IChapter[]> {
          return (await this.db("chapters").select("*")) as IChapter[];
     }

     async getAllFilterTopicId(topicId: number): Promise<IChapter[]> {
          return (await this.db("chapters")
               .select("*")
               .where("topic_id", topicId)) as IChapter[];
     }

     async getById(id: number): Promise<IChapter | undefined> {
          const chapter: IChapter = await this.db("chapters")
               .select("*")
               .where("id", id)
               .first();
          return chapter;
     }

     async delete(id: number): Promise<number | undefined> {
          try {
               const chapterId: number = await this.db("chapters")
                    .delete()
                    .where("id", id)
                    .returning("id");
               return chapterId;
          } catch (error) {
               console.error(error);
               return undefined;
          }
     }

     async create(chapter: IChapter): Promise<number | undefined> {
          try {
               const id: number[] = await this.db("chapters")
                    .insert(chapter)
                    .returning("id");
               return id[0];
          } catch (error) {
               console.error(error);
               return undefined;
          }
     }

     async update(
          id: number,
          newChapter: IChapter
     ): Promise<IChapter | undefined> {
          try {
               const chapter = (await this.db("chapters")
                    .update(newChapter)
                    .where("id", id)
                    .returning("*")) as IChapter[];
               return chapter[0];
          } catch (error) {
               console.error(error);
               return undefined;
          }
     }
}
