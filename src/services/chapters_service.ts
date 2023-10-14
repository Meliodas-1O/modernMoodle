import { IChapter } from "../models/chapter";

export interface IChaptersService {
     getAll(): Promise<IChapter[]>;
     getById(id: number): Promise<IChapter | undefined>;
     createChapter(chapter: IChapter): Promise<number | undefined>;
     deleteChapter(id: number): Promise<void>;
     updateChapter(
          id: number,
          newChapter: IChapter
     ): Promise<IChapter | undefined>;
}
