import { Request, Response } from "express";
import { IChapter } from "../models/chapter";
import { IChaptersService } from "../services/chapters.service";
import { ITopicsService } from "../services/topics.service";
import { ChapterErrorMessages, errorMessage } from "../utils/helpers";

export class ChaptersController {
     chaptersService: IChaptersService;
     topicsService: ITopicsService;

     constructor(
          chaptersService: IChaptersService,
          topicsService: ITopicsService
     ) {
          this.chaptersService = chaptersService;
          this.topicsService = topicsService;
     }

     // GET /chapters
     // Arguments:
     //   - topicId (optional): filter by `topic_id`
     getAllChapters = async (req: Request, res: Response) => {
          const topicId = isNaN(Number(req.query.topicId))
               ? undefined
               : Number(req.query.topicId);
          const chapters = await this.chaptersService.getAll(topicId);
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
          const id = parseInt(req.params.id);
          const chapter = await this.chaptersService.getById(id);
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
          // TODO: check topic + chapter creation in a transaction

          const chapter: IChapter = req.body as IChapter;

          // Check if the topic associated with `topic_id` exists
          const topic = await this.topicsService.getById(chapter.topic_id);
          if (!topic) {
               res.status(404).send(
                    errorMessage(404, ChapterErrorMessages.TOPIC_DOES_NOT_EXIST)
               );
               return;
          }

          // Create the chapter
          const chapter_id = await this.chaptersService.createChapter(chapter);

          if (!chapter_id) {
               res.status(500).send(
                    errorMessage(500, ChapterErrorMessages.CREATE_ERROR)
               );
               return;
          }
          res.status(200).send(chapter_id);
     };

     // DELETE /chapters/:id
     deleteChapter = async (req: Request, res: Response) => {
          const id = parseInt(req.params.id);
          await this.chaptersService.deleteChapter(id);
          res.status(200).send();
     };

     // PATCH /chapters/:id, new chapter is in the body
     updateChapter = async (req: Request, res: Response) => {
          const id = parseInt(req.params.id);
          const newChapter = req.body;
          const returnedChapter = await this.chaptersService.updateChapter(
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
