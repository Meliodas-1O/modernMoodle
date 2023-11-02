import request from "supertest";
import { app } from "../../../src";
import { ITopic } from "../../../src/models/topic";
import { TopicErrorMessages } from "../../../src/utils/helpers";
import { setup, teardown } from "../utils/setup";

describe("Topics failing integration tests suite", () => {
     jest.setTimeout(60 * 1000);
     let id: number;
     const validKeys: string[] = ["title", "description"];

     beforeAll(async () => {
          await setup();

          const firstTopic: ITopic = (
               await request(app)
                    .post("/topics")
                    .send({
                         title: "topicTitle",
                         description: "topicDescription",
                    })
                    .set("Content-Type", "application/json")
          ).body;

          id = firstTopic.id!;
     });

     afterAll(async () => {
          await teardown();
     });

     describe("Topics routes", () => {
          test("1 - Create a new topic with empty request body", async () => {
               // Given
               const newTopic = {};

               // When
               const response = await request(app)
                    .post("/topics")
                    .send(newTopic)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(400);
          });

          test("2 - Create a new topic with unvalid field", async () => {
               // Given
               const newTopic = {
                    titre: "topicTitre",
               };

               // When
               const response = await request(app)
                    .post("/topics")
                    .send(newTopic)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(400);
          });

          test("3- update topic with empty request body ", async () => {
               // Given
               const updatedTopic = {};

               // When
               const response = await request(app)
                    .patch("/topics/" + id)
                    .send(updatedTopic)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(400);
          });

          test("4- update topic with unvalid request body ", async () => {
               // Given
               const updatedTopic = {
                    titre: "updatedTopicTitre",
               };

               // When
               const response = await request(app)
                    .patch("/topics/" + id)
                    .send(updatedTopic)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(400);
          });

          test("5 - Get topic with wrong id", async () => {
               // Given
               const fake_id = Math.floor(Math.random() * 9 + 1000000000);
               // When
               const response = await request(app).get("/topics/" + fake_id);
               // Then
               expect(response.statusCode).toBe(404);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    status: 404,
                    message: TopicErrorMessages.NO_TOPIC_BY_ID,
               });
          });
     });
});
