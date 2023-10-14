import { app } from "../index";
import { Request, Response } from "express";
import { createTopicsController } from "../di/dependency_injection";

// GET      /topics -> all topics
// GET      /topics/:id -> topic with id
// POST     /topics -> create topic
// PATCH    /topics/:id -> update topic with id
// DELETE   /topics/:id -> delete topic with id

const controller = createTopicsController();

export function addRoutes() {
     app.get("/topics", async (req: Request, res: Response) => {
          return await controller.getAllTopics(req, res);
     });

     app.get("/topics/:id", async (req: Request, res: Response) => {
          return await controller.getTopicById(req, res);
     });

     app.post("/topics", async (req: Request, res: Response) => {
          return await controller.createTopic(req, res);
     });

     app.delete("/topics/:id", async (req: Request, res: Response) => {
          await controller.deleteTopic(req, res);
     });

     app.patch("/topics/:id", async (req: Request, res: Response) => {
          return await controller.updateTopic(req, res);
     });
}
const controller = new TopicsController();
console.log(controller);

const router = express.Router();

router.get("/", controller.getAllTopics);
router.get("/:id", controller.getTopicById);
router.post("/", controller.createTopic);
router.put("/:id", controller.updateTopic);
router.delete("/:id", controller.deleteTopic);

export default router;
