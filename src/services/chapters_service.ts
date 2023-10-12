import { IChapterDAO } from "../dao/chapter_dao";
import { IChapter } from "../models/chapter";

export class ChapterService {
     dao: IChapterDAO;

     constructor(dao: IChapterDAO) {
          this.dao = dao;
     }

     async getAll(): Promise<IChapter[]> {
          return await this.dao.getAll();
     }

     async getById(id: number): Promise<IChapter | undefined> {
          const chapter = await this.dao.getById(id);
          return chapter;
     }

     async createChapter(chapter: IChapter): Promise<number> {
          return await this.dao.create(chapter);
     }

     async deleteChapter(id: number) {
          await this.dao.delete(id);
     }

     async updateChapter(
          id: number,
          newChapter: IChapter
     ): Promise<IChapter | undefined> {
          const chapter = await this.dao.update(id, newChapter);
          return chapter;
     }
}
