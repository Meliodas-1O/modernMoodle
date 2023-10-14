import request from "supertest";
import { setup, teardown } from "../utils/setup";
import { app } from "../../../src";
import { ITopic } from "../../../src/models/topic";

describe("Topics integration tests suite", () => {
     jest.setTimeout(60 * 1000);

     beforeAll(async () => {
          await setup();
     });

     afterAll(async () => {
          await teardown();
     });

     test("1 - Get all topics", async () => {
          // Given
          // When
          const response = await request(app).get("/topics");

          // Then
          expect(response.statusCode).toBe(200);

          const topics: ITopic[] = response.body;
          expect(topics.length).toBe(0);
     });

     test("2 - Create a new topic", async () => {
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

     test("3 - Get all topics again", async () => {
          // Given
          // When
          const response = await request(app).get("/topics");

          // Then
          expect(response.statusCode).toBe(200);

          const topics: ITopic[] = response.body;
          expect(topics.length).toBe(1);

          const topic = topics[0];
          expect(topic.title).toBe("topic");
          expect(topic.description).toBe("description");
          expect(topic.id).not.toBeUndefined();

          // TODO: I don't know the server returns "1" and not 1
          expect(topic.id).toBe("1");
     });

     test("4 - Get topic with id 1", async () => {
          // Given
          const topicId = 1;

          // When
          const response = await request(app).get(`/topics/${topicId}`);

          // Then
          const topic: ITopic = response.body;
          expect(topic).toBeDefined();
          expect(topic.title).toBe("topic");
          expect(topic.description).toBe("description");

          // TODO: I don't know the server returns "1" and not 1
          expect(topic.id).toBe("1");
     });

     test("5 - Create more topics", async () => {
          // Given
          const newTopics = [
               { title: "t2", description: "d2" },
               { title: "t3", description: "d3" },
               { title: "t4", description: "d4" },
               { title: "t5", description: "d5" },
          ];

          // When
          for (const newTopic of newTopics) {
               await request(app)
                    .post("/topics")
                    .send(newTopic)
                    .set("Content-Type", "application/json");
          }
          const response = await request(app).get("/topics");

          // Then
          const topics: ITopic[] = response.body;
          expect(topics.length).toBe(newTopics.length + 1); // as we created another topic previously
     });

     test("6 - Update topic with id 3", async () => {
          // Given
          const topicId = 3;
          const updatedTopic = {
               title: "this is new title",
               description: "COBOL",
          };

          // When
          const response = await request(app)
               .patch(`/topics/${topicId}`)
               .send(updatedTopic)
               .set("Content-Type", "application/json");

          // Then
          const returnedTopic: ITopic = response.body;
          expect(returnedTopic).toBeDefined();
          expect(returnedTopic.id).toBe(`${topicId}`);
          expect(returnedTopic.title).toBe("this is new title");
          expect(returnedTopic.description).toBe("COBOL");
     });

     test("7 - delete topic with id 3", async () => {
          // Given
          const topicId = 3;
          const oldTopics: ITopic[] = (await request(app).get("/topics")).body;

          // When
          const response = await request(app).delete(`/topics/${topicId}`);

          // Then
          expect(response.statusCode).toBe(200);

          const currentTopics: ITopic[] = (await request(app).get("/topics"))
               .body;
          expect(currentTopics.length).toBe(oldTopics.length - 1);
     });

     test("8 - delete all topics", async () => {
          // Given
          const topics: ITopic[] = (await request(app).get("/topics")).body;

          // When
          for (const topic of topics) {
               await request(app).delete(`/topics/${topic.id}`);
          }

          // Then
          const currentTopics: ITopic[] = (await request(app).get("/topics"))
               .body;
          expect(currentTopics).toBeDefined();
          expect(currentTopics.length).toBe(0);
     });
});
