import { ITopic } from "../models/topic";
import topics_service from "../services/topics_service";

async function getAllTopics(): Promise<ITopic[]> {
    return await topics_service.getAllTopics();
}

async function getTopicById(id: number): Promise<ITopic> {
    return await topics_service.getTopicById(id);
}

async function createTopic(topic: ITopic) : Promise<number> {
    return topics_service.createTopic(topic);
}

export default {
    getAllTopics,
    getTopicById,
    createTopic,
};