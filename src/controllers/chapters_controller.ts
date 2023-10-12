import { Request, Response } from "express";
import { ChapterService } from "../services/chapters_service";
import { PostgresChapterDAO } from "../dao/postgres_impl/postgres_chapters_dao";
import { IChapter } from "../models/chapter";
import { areKeysNotValid, errorMessage } from "../utils/helpers";

export class ChaptersController {
     service: ChapterService;

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
                         errorMessage(
                              404,
                              "Error while retrieving chapters. Please try again"
                         )
                    );
          }
          if (!chapters.length) {
               return res
                    .status(200)
                    .send(errorMessage(200, "There is no chapter yet !"));
          }
          return res.status(200).send(chapters);
     }

     // GET /chapters/:id
     async getChapterById(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const erMsg =
               "There is no chapter with the given id. Please check your input values or try again later.";
          const chapter = await this.service.getById(id);
          if (!chapter) {
               return res.status(404).send(errorMessage(404, erMsg));
          }
          return res.status(200).send(chapter);
     }

     // POST /chapters, chapter to create is in the body
     async createChapter(req: Request, res: Response) {
          const erMsg: string[] = [
               "The request body is empty. Please put input values.",
               "Error while creating the chapter. Please check your input values or try agin later",
          ];
          // TODO: check if chapter is not undefined | null
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               return res.status(400).send(errorMessage(400, erMsg[0]));
          }
          const chapter: IChapter = req.body as IChapter;
          const chapter_id = await this.service.createChapter(chapter);
          if (!chapter_id) {
               return res.send(400).send(errorMessage(400, erMsg[1]));
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
          const erMsg: string[] = [
               "The request body is empty. Please put input values.",
               "Error while updating the chapter. Please check your input values or try again later.",
               "One of the field is not apporpriate. The valid keys are : [topic_id, title, description].",
          ];
          const id = parseInt(req.params.id);
          const newChapter = req.body;
          if (
               req.body.constructor === Object &&
               Object.keys(req.body).length === 0
          ) {
               return res.status(400).send(errorMessage(400, erMsg[0]));
          }

          if (
               areKeysNotValid(newChapter, ["topic_id", "title", "description"])
          ) {
               return res.status(403).send(errorMessage(403, erMsg[2]));
          }
          const returnedChapter = await this.service.updateChapter(
               id,
               newChapter
          );
          if (!returnedChapter) {
               return res.status(404).send(errorMessage(404, erMsg[1]));
          }
          return res.status(200).send(returnedChapter);
     }
}
