import request from "supertest";
import { app } from "../../../src";
import { setup, teardown } from "../utils/setup";
import { IChapter } from "../../../src/models/chapter";
import {
     ChapterErrorMessages,
     TopicErrorMessages,
} from "../../../src/utils/helpers";

describe("Chapter failing integration tests suite", () => {
     jest.setTimeout(60 * 1000);
     let id: number;
     const validKeys: string[] = ["topic_id", "title", "description"];
     beforeAll(async () => {
          await setup();

          const firstChapter: IChapter = (
               await request(app)
                    .post("/chapters")
                    .send({
                         title: "chapterTitle",
                         description: "chapterDescription",
                    })
                    .set("Content-Type", "application/json")
          ).body;
          id = firstChapter.id!;
     });

     afterAll(async () => {
          await teardown();
     });

     describe("Chapter routes", () => {
          test("1 - Create a new chapter with empty request body", async () => {
               // Given
               const newChapter = {};

               // When
               const response = await request(app)
                    .post("/chapters")
                    .send(newChapter)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(400);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    status: 400,
                    message: ChapterErrorMessages.EMPTY_REQUEST_BODY,
               });
          });

          test("2 - Create a new chapter with unvalid field", async () => {
               // Given
               const newChapter = {
                    titre: "chapterTitre",
               };

               // When
               const response = await request(app)
                    .post("/chapters")
                    .send(newChapter)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(403);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    status: 403,
                    message:
                         ChapterErrorMessages.INVALID_FIELD + `${validKeys}`,
               });
          });

          test("3- update chapter with empty request body ", async () => {
               // Given
               const updatedChapter = {};

               // When
               const response = await request(app)
                    .patch("/chapters/" + id)
                    .send(updatedChapter)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(400);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    status: 400,
                    message: ChapterErrorMessages.EMPTY_REQUEST_BODY,
               });
          });

          test("4- update chapter with unvalid request body ", async () => {
               // Given
               const updatedChapter = {
                    statment: "updatedChapterTitre",
               };

               // When
               const response = await request(app)
                    .patch("/chapters/" + id)
                    .send(updatedChapter)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(403);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    status: 403,
                    message:
                         ChapterErrorMessages.INVALID_FIELD + `${validKeys}`,
               });
          });

          test("5 - Get chapter with wrong id", async () => {
               // Given
               const fake_id = Math.floor(Math.random() * 9 + 1000000000);
               // When
               const response = await request(app).get("/chapters/" + fake_id);
               // Then
               expect(response.statusCode).toBe(404);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    status: 404,
                    message: ChapterErrorMessages.NO_CHAPTER_BY_ID,
               });
          });

          test("6 - Create a new chapter with unvalid topic_id", async () => {
               // Given
               const fakeTopicId = Math.floor(Math.random() * 9 + 1000000000);

               const newChapter = {
                    title: "chapterTitre",
                    topic_id: fakeTopicId,
               };

               // When
               const response = await request(app)
                    .post("/chapters")
                    .send(newChapter)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(400);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    status: 400,
                    message: TopicErrorMessages.NO_TOPIC_BY_ID,
               });
          });
     });
});
