import express from "express";
import { createExercisesController } from "../di/dependency_injection";
import { createValidator } from "express-joi-validation";
import { validatorMiddleware } from "../middlewares/request_validator.middleware";

// GET      /exercises -> all exercises
// GET      /exercises/:id -> exercise with id
// POST     /exercises -> create exercise
// PATCH    /exercises/:id -> update exercise with id
// DELETE   /exercises/:id -> delete exercise with id

const controller = createExercisesController();
const validator = createValidator();
const router = express.Router();

router.get(
     "/",
     validator.query(validatorMiddleware.exercise.exerciseGetAllSchema),
     controller.getAllExercises
);

router.get(
     "/:id",
     validator.params(validatorMiddleware.exercise.exerciseGetByIdSchema),
     controller.getExerciseById
);

router.post(
     "/",
     validator.body(validatorMiddleware.exercise.exerciseCreateSchema),
     controller.createExercise
);

router.patch(
     "/:id",
     validator.params(validatorMiddleware.exercise.exerciseUpdateParamsSchema),
     validator.body(validatorMiddleware.exercise.exerciseUpdateBodySchema),
     controller.updateExercise
);

router.delete(
     "/:id",
     validator.params(validatorMiddleware.exercise.exerciseDeleteSchema),
     controller.deleteExercise
);

export default router;
