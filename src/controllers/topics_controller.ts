import { Request, Response } from "express";
import { ITopicsService } from "../services/topics_service";
import { ITopic } from "../models/topic";
import {
     TopicErrorMessages,
     areKeysNotValid,
     errorMessage,
} from "../utils/helpers";

export class TopicsController {
     service: ITopicsService;
     validKeys: string[] = ["title", "description"];

     constructor(service: ITopicsService) {
          this.service = service;
     }

     // GET /topics
     async getAllTopics(_req: Request, res: Response) {
          const topics = await this.service.getAll();
          if (!topics) {
               res.status(500).send(
                    errorMessage(500, TopicErrorMessages.RETRIEVAL_ERROR)
               );
               return;
          }
          res.status(200).send(topics);
     }

     // GET /topics/:id
     async getTopicById(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const topic = await this.service.getById(id);
          if (!topic) {
               res.status(404).send(
                    errorMessage(404, TopicErrorMessages.NO_TOPIC_BY_ID)
               );
               return;
          }
          res.status(200).send(topic);
     }

     // POST /topics, topic to create is in the body
     async createTopic(req: Request, res: Response) {
          // TODO: check if topic is not undefined | null
          const topic: ITopic = req.body;
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               res.status(400).send(
                    errorMessage(400, TopicErrorMessages.EMPTY_REQUEST_BODY)
               );
               return;
          }
          if (areKeysNotValid(req.body, this.validKeys)) {
               res.status(403).send(
                    errorMessage(
                         403,
                         TopicErrorMessages.INVALID_FIELD + `${this.validKeys}`
                    )
               );
               return;
          }
          const topic_id = await this.service.createTopic(topic);
          if (!topic_id) {
               res.send(400).send(
                    errorMessage(400, TopicErrorMessages.CREATE_ERROR)
               );
               return;
          }
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
          const newTopic = req.body;
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               res.status(400).send(
                    errorMessage(400, TopicErrorMessages.EMPTY_REQUEST_BODY)
               );
               return;
          }

          if (areKeysNotValid(newTopic, this.validKeys)) {
               res.status(403).send(
                    errorMessage(
                         403,
                         TopicErrorMessages.INVALID_FIELD + `${this.validKeys}`
                    )
               );
               return;
          }
          const returnedTopic = await this.service.updateTopic(id, newTopic);
          if (!returnedTopic) {
               res.status(404).send(
                    errorMessage(404, TopicErrorMessages.UPDATE_ERROR)
               );
               return;
          }
          res.status(200).send(returnedTopic);
     }
}
