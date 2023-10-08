import { Request, Response } from "express";
import { TopicService } from "../services/topics_service";
import { PostgresCoreDAO } from "../dao/postgres_core_dao";

export class TopicsController {
    service: TopicService;

    constructor() {
        this.service = new TopicService(new PostgresCoreDAO());
    }

    // GET /topics
    async getAllTopics(_req: Request, res: Response) {
        const topics = await this.service.getAll();
        if(!topics || topics.length === 0) {
            res.status(404).send();
        } else {
            res.status(200).send(topics);
        }
    }

    // GET /topics/:id
    async getTopicById(req: Request, res: Response) {
        // TODO: check if id is not undefined | null
        const id = parseInt(req.params.id);
        const topic = await this.service.getById(id);
        if (topic === undefined) {
            res.status(404).send();
        } else {
            res.status(200).send(topic);
        }
    }

    // POST /topics, topic to create is in the body
    async createTopic(req: Request, res: Response) {
        // TODO: check if topic is not undefined | null
        const topic = req.body;
        const topic_id = await this.service.createTopic(topic);
        res.status(200).send(topic_id);
    }
}