import request from "supertest";
import { app } from "../../../src";
import { IExercise } from "../../../src/models/exercise";
import { setup, teardown } from "../utils/setup";
import { createChapter, createExercise, createTopic } from "../utils/utils";
import { IChapter } from "../../../src/models/chapter";

describe("Exercice integration tests suite", () => {
     jest.setTimeout(60 * 1000);
     let chapterId: number;
     let createdExerciseId: string = "-999999999";

     beforeAll(async () => {
          await setup();

          // Create a chapter as it is required to create exercise(s)
          // But first, create a topic
          const topicId = await createTopic("topicTitle", "topicDescription");
          chapterId = await createChapter(
               "chapterTitle",
               "chapterDescription",
               topicId
          );
     });

     afterAll(async () => {
          await teardown();
     });
     describe("Exercices routes", () => {
          test("1 - Get all exercices", async () => {
               // Given
               // When
               const response = await request(app).get("/exercises");

               // Then
               expect(response.statusCode).toBe(200);

               const exercises: IExercise[] = response.body;
               expect(exercises.length).toBe(0);
          });

          test("2 - Create a new exercice", async () => {
               // Given
               const newExercise = {
                    statement: "exerciceStatement",
                    solution: "exerciseSolution",
                    difficulty_level: 1,
                    chapter_id: chapterId,
               };

               // When
               const response = await request(app)
                    .post("/exercises")
                    .send(newExercise)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(200);
               expect(response.body.id).toBeDefined();
               createdExerciseId = response.body.id;
          });

          test("3- Get all exercices again", async () => {
               // Given
               // When
               const response = await request(app).get("/exercises");

               // Then
               expect(response.statusCode).toBe(200);
               const exercices: IExercise[] = response.body;
               expect(exercices.length).toBe(1);
          });

          test("4- Get created exercice", async () => {
               // Given
               // When
               const response = await request(app).get(
                    "/exercises/" + createdExerciseId
               );

               // Then
               expect(response.statusCode).toBe(200);

               const exercice: IExercise = response.body;
               expect(exercice.statement).toBe("exerciceStatement");
               expect(exercice.solution).toBe("exerciseSolution");
               expect(exercice.difficulty_level).toBe(1);
          });

          test("5- Update exercice", async () => {
               // Given
               const updatedExercise = {
                    statement: "updatedExerciceStatement",
                    solution: "updatedExerciseSolution",
                    chapter_id: chapterId,
                    difficulty_level: 6,
               };
               // When

               const response = await request(app)
                    .patch("/exercises/" + createdExerciseId)
                    .send(updatedExercise)
                    .set("Content-Type", "application/json");

               // Then
               expect(response.statusCode).toBe(200);

               const exercice: IExercise = response.body;
               expect(exercice.statement).toBe(updatedExercise.statement);
               expect(exercice.solution).toBe(updatedExercise.solution);
               expect(exercice.difficulty_level).toBe(
                    updatedExercise.difficulty_level
               );
          });

          test("6 - Delete exercise", async () => {
               // Given
               // When
               const response = await request(app).delete(
                    "/exercises/" + createdExerciseId
               );

               // Then

               //Status code should be 204
               expect(response.statusCode).toBe(200);
          });

          test("7 - Get all exercices", async () => {
               // Given
               // When
               const response = await request(app).get("/exercises");

               // Then
               expect(response.statusCode).toBe(200);

               const exercises: IExercise[] = response.body;
               expect(exercises.length).toBe(0);
          });

          test("8 - Create chapters and exercises and get all exercises filter by chapter id", async () => {
               // Given
               const topicId = await createTopic(
                    "topicTitle",
                    "topicDescription"
               );
               const chaptersId: number[] = [];
               for (let i = 0; i < 4; i++) {
                    // Create chapter
                    const chapter: IChapter = {
                         description: `chapterDesc${i}`,
                         title: `chapterTitle${i}`,
                         topic_id: topicId,
                    };
                    const chapterId = await createChapter(
                         chapter.title,
                         chapter.description,
                         chapter.topic_id
                    );
                    chaptersId.push(chapterId);
               }
               for (let i = 0; i < 8; i++) {
                    // chapter id is the first one for the first 3 exercises
                    // for the other, it is anything else except the first one
                    let chapterId: number;
                    if (i < 3) chapterId = chaptersId[0];
                    else
                         chapterId =
                              chaptersId[1 + (i % (chaptersId.length - 1))];
                    const exercise: IExercise = {
                         chapter_id: chapterId,
                         difficulty_level: 12,
                         solution: `solution${i + 1}`,
                         statement: `statement${i + 1}`,
                    };
                    await createExercise(
                         exercise.statement,
                         exercise.solution,
                         exercise.chapter_id,
                         exercise.difficulty_level
                    );
               }

               // When
               const response = await request(app).get(
                    `/exercises?chapterId=${chaptersId[0]}`
               );

               // Then
               expect(response.statusCode).toBe(200);
               const exercises: IExercise[] = response.body;
               expect(exercises.length).toBe(3);
               for (let i = 0; i < 3; i++) {
                    expect(exercises[i].chapter_id).toBe(chaptersId[0]);
               }

               const containsStatement1 = exercises.some(
                    (exercise) => exercise.statement === "statement1"
               );
               const containsStatement3 = exercises.some(
                    (exercise) => exercise.statement === "statement2"
               );
               const containsStatement2 = exercises.some(
                    (exercise) => exercise.statement === "statement3"
               );
               expect(containsStatement1).toBe(true);
               expect(containsStatement2).toBe(true);
               expect(containsStatement3).toBe(true);
          });
     });
});
