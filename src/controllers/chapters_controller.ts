import { Request, Response } from "express";
import { ChapterService } from "../services/chapters_service";
import { PostgresChapterDAO } from "../dao/impl/postgres/postgres_chapters_dao";
import { IChapter } from "../models/chapter";
import {
     ChapterErrorMessages,
     areKeysNotValid,
     errorMessage,
} from "../utils/helpers";

export class ChaptersController {
     service: ChapterService;
     validKeys: string[] = ["topic_id", "title", "description"];

     constructor() {
          this.service = new ChapterService(new PostgresChapterDAO());
     }

     // GET /chapters
     async getAllChapters(_req: Request, res: Response) {
          const chapters = await this.service.getAll();
          if (!chapters) {
               return res
                    .status(404)
                    .send(
                         errorMessage(404, ChapterErrorMessages.RETRIEVAL_ERROR)
                    );
          }
          if (!chapters.length) {
               return res
                    .status(200)
                    .send(errorMessage(200, ChapterErrorMessages.NO_CHAPTERS));
          }
          return res.status(200).send(chapters);
     }

     // GET /chapters/:id
     async getChapterById(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const chapter = await this.service.getById(id);
          if (!chapter) {
               return res
                    .status(404)
                    .send(
                         errorMessage(
                              404,
                              ChapterErrorMessages.NO_CHAPTER_BY_ID
                         )
                    );
          }
          return res.status(200).send(chapter);
     }

     // POST /chapters, chapter to create is in the body
     async createChapter(req: Request, res: Response) {
          // TODO: check if chapter is not undefined | null
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               return res
                    .status(400)
                    .send(
                         errorMessage(
                              400,
                              ChapterErrorMessages.EMPTY_REQUEST_BODY
                         )
                    );
          }
          const chapter: IChapter = req.body as IChapter;
          const chapter_id = await this.service.createChapter(chapter);
          if (!chapter_id) {
               return res
                    .send(400)
                    .send(errorMessage(400, ChapterErrorMessages.CREATE_ERROR));
          }
          return res.status(200).send(chapter_id);
     }

     // DELETE /chapters/:id
     async deleteChapter(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          await this.service.deleteChapter(id);
          res.status(200).send();
     }

     // PATH /chapters/:id, new chapter is in the body
     async updateChapter(req: Request, res: Response) {
          // TODO: check if id is not undefined | null

          const id = parseInt(req.params.id);
          const newChapter = req.body;
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               return res
                    .status(400)
                    .send(
                         errorMessage(
                              400,
                              ChapterErrorMessages.EMPTY_REQUEST_BODY
                         )
                    );
          }

          if (areKeysNotValid(newChapter, this.validKeys)) {
               return res
                    .status(403)
                    .send(
                         errorMessage(403, ChapterErrorMessages.INVALID_FIELD)
                    );
          }
          const returnedChapter = await this.service.updateChapter(
               id,
               newChapter
          );
          if (!returnedChapter) {
               return res
                    .status(404)
                    .send(errorMessage(404, ChapterErrorMessages.UPDATE_ERROR));
          }
          return res.status(200).send(returnedChapter);
     }
}
