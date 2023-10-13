import request from "supertest";
import { app } from "../../../src";
import { ITopic } from "../../../src/models/topic";
import { setup, teardown } from "../utils/setup";
import { ChapterErrorMessages } from "../../../src/utils/helpers";

describe("Chapter integration tests suite", () => {
     jest.setTimeout(60 * 1000);

     beforeAll(async () => {
          await setup();
     });

     afterAll(async () => {
          await teardown();
     });
     let id: string = "-9999999";
     describe("Chapter creation routes", () => {
          test("1 - Get all chapters", async () => {
               // Given
               // When
               const response = await request(app).get("/chapters");

               // Then
               expect(response.statusCode).toBe(200);
               expect(response.body.error).toBeDefined();
               expect(response.body.error.message).toBeDefined();
               expect(response.body.error.message).toBe(
                    ChapterErrorMessages.NO_CHAPTERS
               );
          });

          test("2 - Create a new chapter", async () => {
               // Given
               const newDescription = {
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
               id = response.body.id;
          });

          test("3- Get the created chapter", async () => {
               // Given
               // When
               const response = await request(app).get("/chapters/" + id);

               // Then
               expect(response.statusCode).toBe(200);

               const chapter: ITopic = response.body;
               expect(chapter.title).toBe("chapterTitle");
               expect(chapter.description).toBe("chapterDescription");
               expect(chapter.id).toBeDefined();
               expect(chapter.id).toBe(id);
          });

          test("4- Update chapter", async () => {
               // Given
               const updateDescription = {
                    title: "updatedChapterTitle",
                    description: "updatedChapterDescription",
               };
               // When

               const response = await request(app)
                    .patch("/chapters/" + id)
                    .send(updateDescription)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(200);
               expect(response.body).toBeDefined();
               const chapter = response.body;
               expect(chapter.title).toBe(updateDescription.title);
               expect(chapter.description).toBe(updateDescription.description);
               expect(chapter.id).toBeDefined();
               expect(chapter.id).toBe(id);
          });

          test("5- Delete chapter", async () => {
               // Given
               // When
               const response = await request(app).delete("/chapters/" + id);

               // Then

               //Status code should be 204
               expect(response.statusCode).toBe(200);
          });

          test("6 - Get all chapters", async () => {
               // Given
               // When
               const response = await request(app).get("/chapters");

               // Then
               expect(response.statusCode).toBe(200);
               expect(response.body.error).toBeDefined();
               expect(response.body.error.message).toBeDefined();
               expect(response.body.error.message).toBe(
                    ChapterErrorMessages.NO_CHAPTERS
               );
          });
     });
});
