import express from "express";
import { createValidator } from "express-joi-validation";

import { createTopicsController } from "../di/dependency_injection";
import { validatorMiddleware } from "../middlewares/request_validator.middleware";

// GET      /topics -> all topics
// GET      /topics/:id -> topic with id
// POST     /topics -> create topic
// PATCH    /topics/:id -> update topic with id
// DELETE   /topics/:id -> delete topic with id

const controller = createTopicsController();
const router = express.Router();
const validator = createValidator();

router.get("/", controller.getAllTopics);
router.get(
     "/:id",
     validator.params(validatorMiddleware.topic.topicGetByIdSchema),
     controller.getTopicById
);
router.post(
     "/",
     validator.body(validatorMiddleware.topic.topicCreationSchema),
     controller.createTopic
);
router.patch(
     "/:id",
     validator.params(validatorMiddleware.topic.topicUpdateParamSchema),
     validator.body(validatorMiddleware.topic.topicUpdateBodySchema),
     controller.updateTopic
);
router.delete(
     "/:id",
     validator.params(validatorMiddleware.topic.topicDeleteSchema),
     controller.deleteTopic
);

export default router;
