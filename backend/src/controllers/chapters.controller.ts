import { Request, Response } from "express";
import { IChapter } from "../models/chapter";
import {
     ChapterErrorMessages,
     areKeysNotValid,
     errorMessage,
} from "../utils/helpers";
import { IChaptersService } from "../services/chapters.service";

export class ChaptersController {
     service: IChaptersService;
     validKeys: string[] = ["topic_id", "title", "description"];

     constructor(service: IChaptersService) {
          this.service = service;
     }

     // GET /chapters
     // Arguments:
     //   - topicId (optional): filter by `topic_id`
     getAllChapters = async (req: Request, res: Response) => {
          const topicId = isNaN(Number(req.query.topicId))
               ? undefined
               : Number(req.query.topicId);
          const chapters = await this.service.getAll(topicId);
          if (!chapters) {
               res.status(404).send(
                    errorMessage(404, ChapterErrorMessages.RETRIEVAL_ERROR)
               );
               return;
          }
          res.status(200).send(chapters);
     };

     // GET /chapters/:id
     getChapterById = async (req: Request, res: Response) => {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const chapter = await this.service.getById(id);
          if (!chapter) {
               res.status(404).send(
                    errorMessage(404, ChapterErrorMessages.NO_CHAPTER_BY_ID)
               );
               return;
          }
          res.status(200).send(chapter);
     };

     // POST /chapters, chapter to create is in the body
     createChapter = async (req: Request, res: Response) => {
          const chapter: IChapter = req.body as IChapter;
          const chapter_id = await this.service.createChapter(chapter);
          if (!chapter_id) {
               res.status(400).send(
                    errorMessage(400, ChapterErrorMessages.CREATE_ERROR)
               );
               return;
          }
          res.status(200).send(chapter_id);
     };

     // DELETE /chapters/:id
     deleteChapter = async (req: Request, res: Response) => {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          await this.service.deleteChapter(id);
          res.status(200).send();
     };

     // PATCH /chapters/:id, new chapter is in the body
     updateChapter = async (req: Request, res: Response) => {
          // TODO: check if id is not undefined | null

          const id = parseInt(req.params.id);
          const newChapter = req.body;
          const returnedChapter = await this.service.updateChapter(
               id,
               newChapter
          );
          if (!returnedChapter) {
               res.status(404).send(
                    errorMessage(404, ChapterErrorMessages.UPDATE_ERROR)
               );
               return;
          }
          res.status(200).send(returnedChapter);
     };
}
