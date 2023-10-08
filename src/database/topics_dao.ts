import { ITopic } from "../models/topic";
import db from "./database";

async function getAllTopics(): Promise<ITopic[]> {
    const topics = await db("topics").select("*");
    return topics;
}

async function getTopicById(id: number) : Promise<ITopic> {
    const topic = await db("topics")
        .select("*")
        .where("topic_id", id)
        .first();
    return topic;
}

async function createTopic(topic: ITopic) : Promise<number> {
    const topic_id = await db("topics")
        .insert(topic)
        .returning("topic_id");
    return topic_id[0];
}


export default {
    getAllTopics,
    getTopicById,
    createTopic,
};