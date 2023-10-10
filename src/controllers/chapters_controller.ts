import { Request, Response } from "express";
import { ChapterService } from "../services/chapters_service";
import { PostgresChapterDAO } from "../dao/postgres_impl/postgres_chapters_dao";

export class ChaptersController {
    service: ChapterService;

    constructor() {
        this.service = new ChapterService (new PostgresChapterDAO ());
    }

    // GET /chapters
    async getAllChapters(_req: Request, res: Response) {
        const chapters = await this.service.getAll ();
        if (!chapters || chapters.length === 0) {
            res.status (404).send ();
        } else {
            res.status (200).send (chapters);
        }
    }

    // GET /chapters/:id
    async getChapterById(req: Request, res: Response) {
        // TODO: check if id is not undefined | null
        const id = parseInt (req.params.id);
        const chapter = await this.service.getById (id);
        if (chapter === undefined) {
            res.status (404).send ();
        } else {
            res.status (200).send (chapter);
        }
    }

    // POST /chapters, chapter to create is in the body
    async createChapter(req: Request, res: Response) {
        // TODO: check if chapter is not undefined | null
        const chapter = req.body;
        const chapter_id = await this.service.createChapter (chapter);
        res.status (200).send (chapter_id);
    }

    // DELETE /chapters/:id
    async deleteChapter(req: Request, res: Response) {
        // TODO: check if id is not undefined | null
        const id = parseInt (req.params.id);
        await this.service.deleteChapter (id);
        res.status (200).send ();
    }

    // PATH /chapters/:id, new chapter is in the body
    async updateChapter(req: Request, res: Response) {
        // TODO: check if id is not undefined | null
        const id = parseInt (req.params.id);
        const newChapter = req.body;
        const returnedChapter = await this.service.updateChapter (id, newChapter);
        if (returnedChapter === undefined) {
            res.status (404).send ();
        } else {
            res.status (200).send (returnedChapter);
        }
    }
}