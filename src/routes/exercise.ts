import express from "express";
import { createExercisesController } from "../di/dependency_injection";

// GET      /exercises -> all exercises
// GET      /exercises/:id -> exercise with id
// POST     /exercises -> create exercise
// PATCH    /exercises/:id -> update exercise with id
// DELETE   /exercises/:id -> delete exercise with id

const controller = createExercisesController();
const router = express.Router();

router.get("/", controller.getAllExercises);
router.get("/:id", controller.getExerciseById);
router.post("/", controller.createExercise);
router.patch("/:id", controller.updateExercise);
router.delete("/:id", controller.deleteExercise);

export default router;
