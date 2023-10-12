import { Request, Response } from "express";
import { TopicService } from "../services/topics_service";
import { PostgresTopicsDAO } from "../dao/postgres_impl/postgres_topics_dao";
import { ITopic } from "../models/topic";
import { areKeysNotValid, errorMessage } from "../utils/helpers";

export class TopicsController {
     service: TopicService;
     validKeys: string[] = ["title", "description"];
     erMsg: string[] = [
          "The request body is empty. Please put input values.",
          "Error while creating the topics. Please check your input values or try agin later",
          "One of the field is not appropriate. The valid keys are :" +
               `${this.validKeys} .`,
          "Error while retrieving topics. Please try again",
          "There is no topic with the given id. Please check your input values or try again later.",
          "Error while updating the topic. Please check your input values or try again later.",
     ];
     constructor() {
          this.service = new TopicService(new PostgresTopicsDAO());
     }

     // GET /topics
     async getAllTopics(_req: Request, res: Response) {
          const topics = await this.service.getAll();
          if (!topics) {
               return res.status(404).send(errorMessage(404, this.erMsg[3]));
          }
          if (!topics.length) {
               return res
                    .status(200)
                    .send(errorMessage(200, "There is no topic yet !"));
          }
          return res.status(200).send(topics);
     }

     // GET /topics/:id
     async getTopicById(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const topic = await this.service.getById(id);
          if (!topic) {
               return res.status(404).send(errorMessage(404, this.erMsg[4]));
          }
          return res.status(200).send(topic);
     }

     // POST /topics, topic to create is in the body
     async createTopic(req: Request, res: Response) {
          // TODO: check if topic is not undefined | null
          const topic: ITopic = req.body;
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               return res.status(400).send(errorMessage(400, this.erMsg[0]));
          }
          if (areKeysNotValid(req.body, this.validKeys)) {
               return res.status(403).send(errorMessage(403, this.erMsg[2]));
          }
          const topic_id = await this.service.createTopic(topic);
          if (!topic_id) {
               return res.send(400).send(errorMessage(400, this.erMsg[1]));
          }
          return res.status(200).send(topic_id);
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
               return res.status(400).send(errorMessage(400, this.erMsg[0]));
          }

          if (areKeysNotValid(newTopic, this.validKeys)) {
               return res.status(403).send(errorMessage(403, this.erMsg[2]));
          }
          const returnedTopic = await this.service.updateTopic(id, newTopic);
          if (!returnedTopic) {
               return res.status(404).send(errorMessage(404, this.erMsg[5]));
          }
          return res.status(200).send(returnedTopic);
     }
}
