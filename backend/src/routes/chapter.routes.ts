import express from "express";
import { createValidator } from "express-joi-validation";
import { createChaptersController } from "../di/dependency_injection";
import { validatorMiddleware } from "../middlewares/request_validator.middleware";

// GET      /chapters -> all chapters
// GET      /chapters/:id -> chapter with id
// POST     /chapters -> create chapter
// PATCH    /chapters/:id -> update chapter with id
// DELETE   /chapters/:id -> delete chapter with id
// GET      /chapters?:topic_id=? -> get all chapters for the given topic_id

const controller = createChaptersController();
const validator = createValidator();

const router = express.Router();

router.get(
     "/",
     validator.query(validatorMiddleware.chapter.chaptersGetAllSchema),
     controller.getAllChapters
);

router.get(
     "/:id",
     validator.params(validatorMiddleware.chapter.chaptersGetById),
     controller.getChapterById
);

router.post(
     "/",
     validator.body(validatorMiddleware.chapter.chaptersCreate),
     controller.createChapter
);

router.patch(
     "/:id",
     validator.params(validatorMiddleware.chapter.chaptersUpdateParams),
     validator.body(validatorMiddleware.chapter.chaptersUpdateBody),
     controller.updateChapter
);

router.delete(
     "/:id",
     validator.params(validatorMiddleware.chapter.chaptersDelete),
     controller.deleteChapter
);

export default router;
