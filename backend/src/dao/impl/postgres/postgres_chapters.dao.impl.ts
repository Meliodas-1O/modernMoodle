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

     async getById(id: number): Promise<IChapter | undefined> {
          const chapter: IChapter = await this.db("chapters")
               .select("*")
               .where("id", id)
               .first();
          return chapter;
     }

     async delete(id: number): Promise<void> {
          await this.db("chapters").delete().where("id", id);
     }

     async create(chapter: IChapter): Promise<number | undefined> {
          const id: number[] = await this.db("chapters")
               .insert(chapter)
               .returning("id");
          return id[0] || undefined;
     }

     async update(
          id: number,
          newChapter: IChapter
     ): Promise<IChapter | undefined> {
          const chapter = (await this.db("chapters")
               .update(newChapter)
               .where("id", id)
               .returning("*")) as IChapter[];
          return chapter[0];
     }
}
