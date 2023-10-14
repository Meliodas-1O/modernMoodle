import request from "supertest";
import { app } from "../../../src";
import { setup, teardown } from "../utils/setup";
import { IExercise } from "../../../src/models/exercise";
import { ExerciseErrorMessages } from "../../../src/utils/helpers";

describe("Exercice integration tests suite", () => {
     jest.setTimeout(60 * 1000);

     beforeAll(async () => {
          await setup();
     });

     afterAll(async () => {
          await teardown();
     });
     let id: string = "-999999999";
     describe("Exercices routes", () => {
          test("1 - Get all exercices", async () => {
               // Given
               // When
               const response = await request(app).get("/exercises");

               // Then
               expect(response.statusCode).toBe(200);
               expect(response.body.error).toBeDefined();
               expect(response.body.error.message).toBeDefined();
               expect(response.body.error.message).toBe(
                    ExerciseErrorMessages.NO_EXERCICES
               );
          });

          test("2 - Create a new exercice", async () => {
               // Given
               const newExercise = {
                    statement: "exerciceStatement",
                    solution: "exerciseSolution",
                    difficulty_level: 1,
               };

               // When
               const response = await request(app)
                    .post("/exercises")
                    .send(newExercise)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(200);
               expect(response.body.id).toBeDefined();
               id = response.body.id;
          });

          test("3- Get created exercice", async () => {
               // Given
               // When
               const response = await request(app).get("/exercises/" + id);

               // Then
               expect(response.statusCode).toBe(200);

               const exercice: IExercise = response.body;
               expect(exercice.statement).toBe("exerciceStatement");
               expect(exercice.solution).toBe("exerciseSolution");
               expect(exercice.difficulty_level).toBe(1);
          });

          test("4- Update exercice", async () => {
               // Given
               const updatedExercise = {
                    statement: "updatedExerciceStatement",
                    solution: "updatedExerciseSolution",
                    difficulty_level: 6,
               };
               // When

               const response = await request(app)
                    .patch("/exercises/" + id)
                    .send(updatedExercise)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(200);

               const exercice: IExercise = response.body;
               console.log(exercice);
               expect(exercice.statement).toBe(updatedExercise.statement);
               expect(exercice.solution).toBe(updatedExercise.solution);
               expect(exercice.difficulty_level).toBe(
                    updatedExercise.difficulty_level
               );
          });

          test("5- Delete exercise", async () => {
               // Given
               // When
               const response = await request(app).delete("/exercises/" + id);

               // Then

               //Status code should be 204
               expect(response.statusCode).toBe(200);
          });

          test("6 - Get all exercices", async () => {
               // Given
               // When
               const response = await request(app).get("/exercises");

               // Then
               expect(response.statusCode).toBe(200);
               expect(response.body.error).toBeDefined();
               expect(response.body.error.message).toBeDefined();
               expect(response.body.error.message).toBe(
                    ExerciseErrorMessages.NO_EXERCICES
               );
          });
     });
});