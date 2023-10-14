import { TopicsController } from "../controllers/topics_controller";
import express from "express";

// GET      /topics -> all topics
// GET      /topics/:id -> topic with id
// POST     /topics -> create topic
// PATCH    /topics/:id -> update topic with id
// DELETE   /topics/:id -> delete topic with id

const controller = new TopicsController();
console.log(controller);

const router = express.Router();

router.get("/", controller.getAllTopics);
router.get("/:id", controller.getTopicById);
router.post("/", controller.createTopic);
router.put("/:id", controller.updateTopic);
router.delete("/:id", controller.deleteTopic);

export default router;
