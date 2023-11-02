import request from "supertest";
import { app } from "../../../src";
import { setup, teardown } from "../utils/setup";
import { IChapter } from "../../../src/models/chapter";
import { ChapterErrorMessages } from "../../../src/utils/helpers";

describe("Chapter failing integration tests suite", () => {
     jest.setTimeout(60 * 1000);
     let topicId: number;
     let firstChapterId: number;

     beforeAll(async () => {
          await setup();

          // Create a topic
          let createdTopicId = await createTopic();
          if(!createdTopicId) {
               throw new Error("Could not create a new topic");
          }
          topicId = createdTopicId!;

          // Create a chapter
          let createdChapterId = await createChapter();
          if(!createdChapterId) {
               throw new Error("Could not create a new chapter");
          }
          firstChapterId = createdChapterId!;
     });

     afterAll(async () => {
          await teardown();
     });

     async function createTopic(): Promise<number | undefined> {
          // To create chapter, we need to create at least a topic
          const topic = {
               title: "topicTitle",
               description: "topicDescription",
          };
          const response = await request(app)
               .post("/topics")
               .send(topic)
               .set("Content-Type", "application/json");
          if(!response.status.toString().startsWith("2")) return undefined;
          return response.body.id;
     }

     async function createChapter(): Promise<number | undefined> {
          const chapter = {
               topic_id: topicId,
               title: "chapterTitle",
               description: "chapterTitle",
          };
          const response = await request(app)
               .post("/chapters")
               .send(chapter)
               .set("Content-Type", "application/json");
          if(!response.status.toString().startsWith("2")) return undefined;
          return response.body.id;
     }

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
               expect(response.statusCode).toBe(400);
          });

          test("3- update chapter with empty request body ", async () => {
               // Given
               const updatedChapter = {};

               // When
               const response = await request(app)
                    .patch("/chapters/" + firstChapterId)
                    .send(updatedChapter)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(400);
               expect(response.body).toBeDefined();
          });

          test("4- update chapter with unvalid request body ", async () => {
               // Given
               const updatedChapter = {
                    statment: "updatedChapterTitre",
               };

               // When
               const response = await request(app)
                    .patch("/chapters/" + firstChapterId)
                    .send(updatedChapter)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(400);
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
          });
     });
});
