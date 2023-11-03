import request from "supertest";
import { app } from "../../../src";
import { IChapter } from "../../../src/models/chapter";
import { createChapter, createTopic } from "../utils/utils";
import { setup, teardown } from "../utils/setup";

describe("Chapter integration tests suite", () => {
     jest.setTimeout(60 * 1000);
     let topicId: number;
     let createdChapterId: number;

     beforeAll(async () => {
          await setup();

          // Create a topic since it is required to create chapter(s)
          const id = await createTopic("topicTitle", "topicDescription");
          topicId = id;
     });

     afterAll(async () => {
          await teardown();
     });

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

          test("3 - Get all chapters again", async () => {
               // Given
               // When
               const response = await request(app).get("/chapters");

               // Then
               expect(response.statusCode).toBe(200);
               const chapters: IChapter[] = response.body;
               expect(chapters.length).toBe(1);
          });

          test("4 - Get the created chapter", async () => {
               // Given
               // When
               const response = await request(app).get(
                    "/chapters/" + createdChapterId
               );

               // Then
               expect(response.statusCode).toBe(200);

               const chapter: IChapter = response.body;
               expect(chapter.title).toBe("chapterTitle");
               expect(chapter.description).toBe("chapterDescription");
               expect(chapter.id).toBeDefined();
               expect(chapter.id).toBe(createdChapterId);
          });

          test("5 - Update chapter", async () => {
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

          test("6 - Delete first created chapter", async () => {
               // Given
               // When
               const response = await request(app).delete(
                    "/chapters/" + createdChapterId
               );

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

          test("8 - Create topics and chapters and get all chapters for a specified topicId", async () => {
               // Given
               const topicsId: number[] = [];
               for (let i = 0; i < 4; i++) {
                    const topic = {
                         title: `topic${i}`,
                         description: `description${i}`,
                    };
                    const topicId = await createTopic(
                         topic.title,
                         topic.description
                    );
                    topicsId.push(topicId);
               }
               for (let i = 0; i < 8; i++) {
                    // topic id is the first one for the first 3 chapters
                    // for the other, it is anything else except the first one
                    let topicId: number;
                    if (i < 3) topicId = topicsId[0];
                    else topicId = topicsId[1 + (i % (topicsId.length - 1))];
                    const chapter = {
                         topic_id: topicId,
                         title: `chapter${i + 1}`,
                         description: `description${i + 1}`,
                    };
                    await createChapter(
                         chapter.title,
                         chapter.description,
                         chapter.topic_id
                    );
               }

               // When
               const response = await request(app).get(
                    `/chapters?topicId=${topicsId[0]}`
               );

               // Then
               expect(response.statusCode).toBe(200);
               const chapters: IChapter[] = response.body;
               expect(chapters.length).toBe(3);

               // ugly but it works !
               expect(chapters[0].topic_id).toBe(topicsId[0]);
               expect(chapters[1].topic_id).toBe(topicsId[0]);
               expect(chapters[2].topic_id).toBe(topicsId[0]);
               const containsChapter1 = chapters.some(
                    (chapter) => chapter.title === "chapter1"
               );
               const containsChapter2 = chapters.some(
                    (chapter) => chapter.title === "chapter2"
               );
               const containsChapter3 = chapters.some(
                    (chapter) => chapter.title === "chapter3"
               );
               expect(containsChapter1).toBe(true);
               expect(containsChapter2).toBe(true);
               expect(containsChapter3).toBe(true);
          });
     });
});
