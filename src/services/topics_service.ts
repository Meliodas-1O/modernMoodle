import topics_dao from "../database/topics_dao";
import { ITopic } from "../models/topic";

async function getAllTopics() : Promise<ITopic[]> {
    return await topics_dao.getAllTopics();
}

async function getTopicById(id: number) : Promise<ITopic> {
    return await topics_dao.getTopicById(id);
}

async function createTopic(topic: ITopic) : Promise<number> {
    return await topics_dao.createTopic(topic);
}

export default {
    getAllTopics,
    getTopicById,
    createTopic,
}