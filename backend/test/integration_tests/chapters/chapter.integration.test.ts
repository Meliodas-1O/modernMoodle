import request from "supertest";
import { app } from "../../../src";
import { setup, teardown } from "../utils/setup";
import { IChapter } from "../../../src/models/chapter";

describe("Chapter integration tests suite", () => {
     jest.setTimeout(60 * 1000);
     let topicId: number;
     let createdChapterId: number;

     beforeAll(async () => {
          await setup();
          const id = await createTopic();
          if (!id) {
               throw new Error("Could not create a topic");
          }
          topicId = id!;
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
          if (!response.status.toString().startsWith("2")) return undefined;
          return response.body.id as number;
     }

     describe("Chapter creation routes", () => {
          test("1 - Get all chapters", async () => {
               // Given
               // When
               const response = await request(app).get("/chapters");

               // Then
               expect(response.statusCode).toBe(200);

               const chapters: IChapter[] = response.body;
               expect(chapters.length).toBe(0);
          });

          test("2 - Create a new chapter", async () => {
               // Given
               const newDescription = {
                    topic_id: topicId,
                    title: "chapterTitle",
                    description: "chapterDescription",
               };

               // When
               const response = await request(app)
                    .post("/chapters")
                    .send(newDescription)
                    .set("Content-Type", "application/json");
               // Then
               expect(response.statusCode).toBe(200);
               expect(response.body.id).toBeDefined();
               createdChapterId = response.body.id;
          });

          test("3- Get all chapters again", async () => {
               // Given
               // When
               const response = await request(app).get("/chapters");

               // Then
               expect(response.statusCode).toBe(200);
               const chapters: IChapter[] = response.body;
               expect(chapters.length).toBe(1);
          });

          test("4- Get the created chapter", async () => {
               // Given
               // When
               const response = await request(app).get("/chapters/" + createdChapterId);

               // Then
               expect(response.statusCode).toBe(200);

               const chapter: IChapter = response.body;
               expect(chapter.title).toBe("chapterTitle");
               expect(chapter.description).toBe("chapterDescription");
               expect(chapter.id).toBeDefined();
               expect(chapter.id).toBe(createdChapterId);
          });

          test("5- Update chapter", async () => {
               // Given

               const updateDescription = {
                    title: "updatedChapterTitle",
                    description: "updatedChapterDescription",
               };
               // When

               const response = await request(app)
                    .patch("/chapters/" + createdChapterId)
                    .send(updateDescription)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(200);
               expect(response.body).toBeDefined();
               const chapter: IChapter = response.body;
               expect(chapter.title).toBe(updateDescription.title);
               expect(chapter.description).toBe(updateDescription.description);
               expect(chapter.id).toBeDefined();
               expect(chapter.id).toBe(createdChapterId);
          });

          test("6- Delete chapter", async () => {
               // Given
               // When
               const response = await request(app).delete("/chapters/" + createdChapterId);

               // Then

               //Status code should be 204
               expect(response.statusCode).toBe(200);
          });

          test("7 - Get all chapters", async () => {
               // Given
               // When
               const response = await request(app).get("/chapters");

               // Then
               expect(response.statusCode).toBe(200);

               const chapters: IChapter[] = response.body;
               expect(chapters.length).toBe(0);
          });
     });
});
