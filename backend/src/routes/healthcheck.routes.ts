import express from "express";
import { createHealthcheckController } from "../di/dependency_injection";

// GET /healthcheck -> get health status

const controller = createHealthcheckController();
const router = express.Router();

router.get("/", controller.getHealth);

export default router;
