import request from "supertest";
import { app } from "../../../src";
import { setup, teardown } from "../utils/setup";
import { IChapter } from "../../../src/models/chapter";

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

               const chapters: IChapter[] = response.body;
               expect(chapters.length).toBe(0);
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
               const response = await request(app).get("/chapters/" + id);

               // Then
               expect(response.statusCode).toBe(200);

               const chapter: IChapter = response.body;
               expect(chapter.title).toBe("chapterTitle");
               expect(chapter.description).toBe("chapterDescription");
               expect(chapter.id).toBeDefined();
               expect(chapter.id).toBe(id);
          });

          test("5- Update chapter", async () => {
               // Given
               console.log(id);

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
               console.log(response.body);

               expect(response.statusCode).toBe(200);
               expect(response.body).toBeDefined();
               const chapter: IChapter = response.body;
               expect(chapter.title).toBe(updateDescription.title);
               expect(chapter.description).toBe(updateDescription.description);
               expect(chapter.id).toBeDefined();
               expect(chapter.id).toBe(id);
          });

          test("6- Delete chapter", async () => {
               // Given
               // When
               const response = await request(app).delete("/chapters/" + id);

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
