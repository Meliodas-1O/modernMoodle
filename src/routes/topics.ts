import topics_controller from '../controllers/topics_controller';
import { app } from '../index';
import { Request, Response } from 'express';

// GET      /topics -> all topics
// GET      /topics/:id -> topic with id
// POST     /topics -> create topic
// PATCH    /topics/:id -> update topic with id
// DELETE   /topics/:id -> delete topic with id

export function addRoutes() {

    app.get("/topics", async (_req: Request, res: Response) => {
        const topics = await topics_controller.getAllTopics();
        res.status(200).send(topics);
    })

    app.get("/topics/:id", async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const topic = await topics_controller.getTopicById(id);
        
        if (!topic) {
            res.status(404).send("Not found");
        } else {
            res.status(200).send(topic);
        }
    })

    app.post("/topics", async (req: Request, res: Response) => {
        const topic = req.body;
        const topic_id = await topics_controller.createTopic(topic);
        res.status(200).send(topic_id);
    })

}