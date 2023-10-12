import { Request, Response } from "express";
import { ChapterService } from "../services/chapters_service";
import { PostgresChapterDAO } from "../dao/postgres_impl/postgres_chapters_dao";
import { IChapter } from "../models/chapter";
import { areKeysNotValid, errorMessage } from "../utils/helpers";

export class ChaptersController {
     service: ChapterService;
     validKeys: string[] = ["topic_id", "title", "description"];
     erMsg: string[] = [
          "The request body is empty. Please put input values.",
          "Error while updating the chapter. Please check your input values or try again later.",
          "One of the field is not appropriate. The valid keys are : [topic_id, title, description].",
          "Error while creating the chapter. Please check your input values or try agin later",
          "There is no chapter with the given id. Please check your input values or try again later.",
          "There is no chapter yet !",
          "Error while retrieving chapters. Please try again",
     ];
     constructor() {
          this.service = new ChapterService(new PostgresChapterDAO());
     }

     // GET /chapters
     async getAllChapters(_req: Request, res: Response) {
          const chapters = await this.service.getAll();
          if (!chapters) {
               return res.status(404).send(errorMessage(404, this.erMsg[6]));
          }
          if (!chapters.length) {
               return res.status(200).send(errorMessage(200, this.erMsg[5]));
          }
          return res.status(200).send(chapters);
     }

     // GET /chapters/:id
     async getChapterById(req: Request, res: Response) {
          // TODO: check if id is not undefined | null
          const id = parseInt(req.params.id);
          const chapter = await this.service.getById(id);
          if (!chapter) {
               return res.status(404).send(errorMessage(404, this.erMsg[4]));
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
               return res.status(400).send(errorMessage(400, this.erMsg[0]));
          }
          const chapter: IChapter = req.body as IChapter;
          const chapter_id = await this.service.createChapter(chapter);
          if (!chapter_id) {
               return res.send(400).send(errorMessage(400, this.erMsg[3]));
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
               return res.status(400).send(errorMessage(400, this.erMsg[0]));
          }

          if (areKeysNotValid(newChapter, this.validKeys)) {
               return res.status(403).send(errorMessage(403, this.erMsg[2]));
          }
          const returnedChapter = await this.service.updateChapter(
               id,
               newChapter
          );
          if (!returnedChapter) {
               return res.status(404).send(errorMessage(404, this.erMsg[1]));
          }
          return res.status(200).send(returnedChapter);
     }
}
