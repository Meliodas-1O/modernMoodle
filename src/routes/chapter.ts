import { createChaptersController } from "../di/dependency_injection";
import { app } from "../index";
import { Request, Response } from "express";

// GET      /chapters -> all chapters
// GET      /chapters/:id -> chapter with id
// POST     /chapters -> create chapter
// PATCH    /chapters/:id -> update chapter with id
// DELETE   /chapters/:id -> delete chapter with id

const controller = createChaptersController();

export function addRoutes() {
     app.get("/chapters", async (req: Request, res: Response) => {
          return await controller.getAllChapters(req, res);
     });

     app.get("/chapters/:id", async (req: Request, res: Response) => {
          return await controller.getChapterById(req, res);
     });

     app.post("/chapters", async (req: Request, res: Response) => {
          return await controller.createChapter(req, res);
     });

     app.delete("/chapters/:id", async (req: Request, res: Response) => {
          await controller.deleteChapter(req, res);
     });

     app.patch("/chapters/:id", async (req: Request, res: Response) => {
          return await controller.updateChapter(req, res);
     });
}
