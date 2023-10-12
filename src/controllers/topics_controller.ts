import { Request, Response } from "express";
import { PostgresTopicsDAO } from "../dao/impl/postgres/postgres_topics_dao";
import { TopicsService } from "../services/topics_service";
import { ITopic } from "../models/topic";

export class TopicsController {
    service: TopicsService;

    constructor() {
        this.service = new TopicsService (new PostgresTopicsDAO ());
    }

     // GET /topics
     async getAllTopics(_req: Request, res: Response) {
          const topics = await this.service.getAll();
          if (!topics || topics.length === 0) {
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
          const topic: ITopic = req.body;
          const topic_id = await this.service.createTopic(topic);
          res.status(200).send(topic_id);
     }

     // DELETE /topics/:id
     async deleteTopic(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          await this.service.deleteTopic(id);
          res.status(200).send();
     }

     // PATH /topics/:id, new topic is in the body
     async updateTopic(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const newTopic: ITopic = req.body;
          const returnedTopic = await this.service.updateTopic(id, newTopic);
          if (returnedTopic === undefined) {
               res.status(404).send();
          } else {
               res.status(200).send(returnedTopic);
          }
     }
}
