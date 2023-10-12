import { ITopic } from "../models/topic";

export interface ITopicDAO {
     getAll(): Promise<ITopic[]>;
     getById(id: number): Promise<ITopic | undefined>;
     delete(id: number): Promise<void>;
     create(topic: ITopic): Promise<number>;
     update(id: number, newTopic: ITopic): Promise<ITopic | undefined>;
}
