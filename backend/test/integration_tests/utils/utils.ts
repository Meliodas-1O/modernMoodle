import request from "supertest";
import { app } from "../../../src";

// This file contains some functions that might be used multiple times
// in various places across our integration tests.
//
// Note: most of these functions will throw an error if something unexpected occurs.
// This is intended purposes as the test environment is supposed controlled.

export async function createChapter(
     title: string,
     description: string,
     topicId: number
): Promise<number> {
     const chapter = {
          topic_id: topicId,
          title,
          description,
     };
     const response = await request(app)
          .post("/chapters")
          .set("Content-Type", "application/json")
          .send(chapter);
     if (!response.status.toString().startsWith("2"))
          throw new Error("Could not create a chapter");
     return response.body.id as number;
}

export async function createTopic(
     title: string,
     description: string
): Promise<number> {
     const topic = {
          title,
          description,
     };
     const response = await request(app)
          .post("/topics")
          .set("Content-Type", "application/json")
          .send(topic);
     if (!response.status.toString().startsWith("2"))
          throw new Error("Could not create a new topic");
     return response.body.id as number;
}
