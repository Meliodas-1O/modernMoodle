import { ITopicDAO } from "../dao/topic_dao";
import { ITopic } from "../models/topic";

export class TopicService {
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

    async createTopic(topic: ITopic) : Promise<number> {
        return await this.dao.create(topic);
    }

    async deleteTopic(id: number) {
        await this.dao.delete(id);
    }

    async updateTopic(id: number, newTopic: ITopic): Promise<ITopic | undefined> {
        const topic = await this.dao.update(id, newTopic);
        return topic;
    }
}