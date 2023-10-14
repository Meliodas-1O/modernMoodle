import { IChapter } from "../models/chapter";

export interface IChapterDAO {
     getAll(): Promise<IChapter[]>;
     getById(id: number): Promise<IChapter | undefined>;
     delete(id: number): Promise<void>;
     create(topic: IChapter): Promise<number | undefined>;
     update(id: number, newTopic: IChapter): Promise<IChapter | undefined>;
}
