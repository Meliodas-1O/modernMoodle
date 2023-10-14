import request from "supertest";
import { app } from "../../../src";
import { setup, teardown } from "../utils/setup";
import { IExercise } from "../../../src/models/exercise";
import { ExerciseErrorMessages } from "../../../src/utils/helpers";

describe("Exercise failing integration tests suite", () => {
     jest.setTimeout(60 * 1000);
     let id: number;
     const validKeys: string[] = [
          "chapter_id",
          "statement",
          "solution",
          "difficulty_level",
     ];
     beforeAll(async () => {
          await setup();

          const firstExercise: IExercise = (
               await request(app)
                    .post("/exercises")
                    .send({
                         statement: "exerciceStatement",
                         solution: "exerciceSolution",
                    })
                    .set("Content-Type", "application/json")
          ).body;
          id = firstExercise.id!;
     });

     afterAll(async () => {
          await teardown();
     });

     describe("Exercise routes", () => {
          test("1 - Create a new exercice with empty request body", async () => {
               // Given
               const newExercise = {};

               // When
               const response = await request(app)
                    .post("/exercises")
                    .send(newExercise)
                    .set("Content-Type", "application/json");

               // Then
               console.log(response.body);
               expect(response.statusCode).toBe(400);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    error: {
                         status: 400,
                         message: ExerciseErrorMessages.EMPTY_REQUEST_BODY,
                    },
               });
          });

          test("2 - Create a new exercice with unvalid field", async () => {
               // Given
               const newExercise = {
                    titre: "exerciceTitre",
               };

               // When
               const response = await request(app)
                    .post("/exercises")
                    .send(newExercise)
                    .set("Content-Type", "application/json");

               // Then
               console.log(response.body);

               expect(response.statusCode).toBe(403);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    error: {
                         status: 403,
                         message:
                              ExerciseErrorMessages.INVALID_FIELD +
                              `${validKeys}`,
                    },
               });
          });

          test("3- update exercice with empty request body ", async () => {
               // Given
               const updatedExercise = {};

               // When
               const response = await request(app)
                    .patch("/exercises/" + id)
                    .send(updatedExercise)
                    .set("Content-Type", "application/json");

               // Then
               console.log(response.body);

               expect(response.statusCode).toBe(400);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    error: {
                         status: 400,
                         message: ExerciseErrorMessages.EMPTY_REQUEST_BODY,
                    },
               });
          });

          test("4- update exercice with unvalid request body ", async () => {
               // Given
               const updatedExercise = {
                    titre: "updatedExerciseTitre",
               };

               // When
               const response = await request(app)
                    .patch("/exercises/" + id)
                    .send(updatedExercise)
                    .set("Content-Type", "application/json");

               // Then
               console.log(response.body);

               expect(response.statusCode).toBe(403);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    error: {
                         status: 403,
                         message:
                              ExerciseErrorMessages.INVALID_FIELD +
                              `${validKeys}`,
                    },
               });
          });

          test("5 - Get exercice with wrong id", async () => {
               // Given
               const fake_id = Math.floor(Math.random() * 9 + 1000000000);
               // When
               const response = await request(app).get("/exercises/" + fake_id);
               // Then
               console.log(response.body);

               expect(response.statusCode).toBe(404);
               expect(response.body).toBeDefined();
               expect(response.body).toEqual({
                    error: {
                         status: 404,
                         message: ExerciseErrorMessages.NO_EXERCISE_BY_ID,
                    },
               });
          });
     });
});
