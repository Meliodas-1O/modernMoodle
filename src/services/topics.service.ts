import { ITopic } from "../models/topic";

export interface ITopicsService {
     getAll(): Promise<ITopic[]>;
     getById(id: number): Promise<ITopic | undefined>;
     deleteTopic(id: number): Promise<void>;
     createTopic(topic: ITopic): Promise<number>;
     updateTopic(id: number, newTopic: ITopic): Promise<ITopic | undefined>;
}
