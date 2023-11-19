import request from "supertest";
import { app } from "../../../src";
import { IExercise } from "../../../src/models/exercise";

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

export async function createExercise(
     statement: string,
     solution: string,
     chapter_id: number,
     difficulty_level: number
): Promise<number> {
     const exercise: IExercise = {
          chapter_id,
          difficulty_level,
          solution,
          statement,
     };
     const response = await request(app)
          .post("/exercises")
          .set("Content-Type", "application/json")
          .send(exercise);
     if (!response.status.toString().startsWith("2"))
          throw new Error("Could not create a new exercise");
     return response.body.id as number;
}
