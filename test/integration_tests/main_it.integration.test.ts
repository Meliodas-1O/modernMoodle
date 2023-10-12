import { setup, teardown } from "./utils/setup";
import request from "supertest";
import { app } from "../../src/index";
import { ITopic } from "../../src/models/topic";

describe("Main integration tests suite", () => {
     jest.setTimeout(60 * 1000);

     beforeAll(async () => {
          await setup();
     });

     afterAll(async () => {
          await teardown();
     });

     describe("Topics routes", () => {
          it("1 - Get all topics", async () => {
               // Given
               // When
               const response = await request(app).get("/topics");

               // Then
               expect(response.statusCode).toBe(404);
          });

          it("2 - Create a new topic", async () => {
               // Given
               const newTopic = {
                    title: "topic",
                    description: "description",
               };

               // When
               const response = await request(app)
                    .post("/topics")
                    .send(newTopic)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(200);
          });

          it("3- Get all topics again", async () => {
               // Given
               // When
               const response = await request(app).get("/topics");

               // Then
               expect(response.statusCode).toBe(200);

               const topics: ITopic[] = response.body;
               console.log(topics);
               expect(topics.length).toBe(1);

               const topic = topics[0];
               expect(topic.title).toBe("topic");
               expect(topic.description).toBe("description");

               // TODO(test, fix): the field is called 'topic_id' in the db
               expect(topic.id).not.toBeUndefined();
               expect(topic.id).toBe(1);
          });
     });
});
