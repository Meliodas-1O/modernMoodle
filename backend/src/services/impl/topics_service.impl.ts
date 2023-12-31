import { ITopicDAO } from "../../dao/topic.dao.interface";
import { ITopic } from "../../models/topic";
import { ITopicsService } from "../topics.service";

export class TopicsService implements ITopicsService {
     dao: ITopicDAO;

     constructor(dao: ITopicDAO) {
          this.dao = dao;
     }

     async getAll(): Promise<ITopic[]> {
          return await this.dao.getAll();
     }

     async getById(id: number): Promise<ITopic | undefined> {
          const topic = await this.dao.getById(id);
          return topic;
     }

     async createTopic(topic: ITopic): Promise<number | undefined> {
          return await this.dao.create(topic);
     }

     async deleteTopic(id: number): Promise<number | undefined> {
          return await this.dao.delete(id);
     }

     async updateTopic(
          id: number,
          newTopic: ITopic
     ): Promise<ITopic | undefined> {
          const topic = await this.dao.update(id, newTopic);
          return topic;
     }
}
