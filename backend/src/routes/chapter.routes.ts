import { createChaptersController } from "../di/dependency_injection";
import express from "express";

// GET      /chapters -> all chapters
// GET      /chapters/:id -> chapter with id
// POST     /chapters -> create chapter
// PATCH    /chapters/:id -> update chapter with id
// DELETE   /chapters/:id -> delete chapter with id

const controller = createChaptersController();

const router = express.Router();

router.get("/", controller.getAllChapters);
router.get("/:id", controller.getChapterById);
router.post("/", controller.createChapter);
router.patch("/:id", controller.updateChapter);
router.delete("/:id", controller.deleteChapter);

export default router;
